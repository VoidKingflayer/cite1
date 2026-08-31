"""
AI Database Tools for TOCHKA Massage Studio.
Provides SQLite/Django database tools for AI Administrator:
- Checking available / busy time slots
- Looking up client bookings
- Creating new appointments in DB
- Cancelling appointments
- Fetching live service & price catalog
"""

import os
import json
import sqlite3
import logging
from datetime import datetime, date, timedelta
from typing import Dict, Any, List, Optional

logger = logging.getLogger(__name__)

DB_PATH = os.path.join(os.path.dirname(os.path.abspath(__file__)), "db.sqlite3")


def _get_db() -> sqlite3.Connection:
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn


# =============================================================================
# 1. TOOL DEFINITIONS (OpenAI / OpenRouter JSON Schema)
# =============================================================================

STUDIO_TOOLS_SCHEMA = [
    {
        "type": "function",
        "function": {
            "name": "get_current_datetime",
            "description": "Возвращает точную текущую дату, время, день недели и часовой пояс студии в Батуми (UTC+4). Вызывай этот инструмент ВСЕГДА, когда речь идет о записи или когда клиент говорит 'сегодня', 'завтра', 'в пятницу', 'через 2 часа' и т.д., чтобы точно знать сегодняшнее число и не ошибиться с датой.",
            "parameters": {
                "type": "object",
                "properties": {
                    "timezone": {
                        "type": "string",
                        "description": "Часовой пояс (по умолчанию 'Asia/Tbilisi')."
                    }
                }
            }
        }
    },
    {
        "type": "function",
        "function": {
            "name": "check_available_slots",
            "description": "Проверяет доступные свободные часы для записи на массаж на конкретную дату (Батуми, салон TOCHKA).",
            "parameters": {
                "type": "object",
                "properties": {
                    "date": {
                        "type": "string",
                        "description": "Дата в формате YYYY-MM-DD (например '2026-08-27'). Вычислите точную дату, если клиент говорит 'завтра' или 'сегодня'."
                    }
                },
                "required": ["date"]
            }
        }
    },
    {
        "type": "function",
        "function": {
            "name": "get_client_bookings",
            "description": "Ищет существующие записи клиента в базе данных салона по номеру телефона или имени (для проверки времени, ритуала или статуса).",
            "parameters": {
                "type": "object",
                "properties": {
                    "client_phone": {
                        "type": "string",
                        "description": "Номер телефона клиента (например '+995591226145' или '591226145')."
                    },
                    "client_name": {
                        "type": "string",
                        "description": "Имя клиента (опционально)."
                    }
                },
                "required": ["client_phone"]
            }
        }
    },
    {
        "type": "function",
        "function": {
            "name": "create_booking_in_db",
            "description": "Создает реальную запись на массаж в базе данных салона TOCHKA.",
            "parameters": {
                "type": "object",
                "properties": {
                    "client_name": {"type": "string", "description": "Имя гостя"},
                    "client_phone": {"type": "string", "description": "Контактный телефон / WhatsApp"},
                    "ritual_name": {"type": "string", "description": "Название ритуала (Релакс, Спортивный, Классика, 4 руки, Лицо)"},
                    "date": {"type": "string", "description": "Дата визита (YYYY-MM-DD)"},
                    "time": {"type": "string", "description": "Время визита (например '14:00', '17:30')"},
                    "notes": {"type": "string", "description": "Пожелания (спина, шея, промокод FIRST10 и т.д.)"}
                },
                "required": ["client_name", "client_phone", "ritual_name", "date", "time"]
            }
        }
    },
    {
        "type": "function",
        "function": {
            "name": "cancel_booking_in_db",
            "description": "Отменяет бронирование клиента в базе данных по просьбе гостя.",
            "parameters": {
                "type": "object",
                "properties": {
                    "client_phone": {"type": "string", "description": "Номер телефона клиента"},
                    "booking_id": {"type": "integer", "description": "ID записи (если известен)"},
                    "date": {"type": "string", "description": "Дата записи (YYYY-MM-DD, опционально)"}
                },
                "required": ["client_phone"]
            }
        }
    },
    {
        "type": "function",
        "function": {
            "name": "get_rituals_catalog",
            "description": "Возвращает точный официальный прайс-лист и список всех ритуалов массажа из базы данных студии.",
            "parameters": {
                "type": "object",
                "properties": {
                    "category": {
                        "type": "string",
                        "description": "Категория ('body', 'focused', 'signature') или пусто для всех."
                    }
                }
            }
        }
    },
    {
        "type": "function",
        "function": {
            "name": "admin_list_bookings",
            "description": "👑 ДЛЯ АДМИНИСТРАТОРА/МАСТЕРА: Получить список заявок и броней из базы данных с фильтрацией по статусу ('pending', 'confirmed', 'completed', 'cancelled', 'all') или дате ('today', 'tomorrow', 'YYYY-MM-DD', 'all').",
            "parameters": {
                "type": "object",
                "properties": {
                    "status": {
                        "type": "string",
                        "description": "Фильтр статуса: 'pending' (ожидают), 'confirmed' (подтверждены), 'completed' (завершены), 'cancelled' (отменены), или 'all'."
                    },
                    "date_filter": {
                        "type": "string",
                        "description": "Фильтр даты: 'today' (сегодня), 'tomorrow' (завтра), конкретная дата 'YYYY-MM-DD', или 'all'."
                    },
                    "limit": {
                        "type": "integer",
                        "description": "Максимальное количество записей (по умолчанию 10)."
                    }
                }
            }
        }
    },
    {
        "type": "function",
        "function": {
            "name": "admin_update_booking_status",
            "description": "👑 ДЛЯ АДМИНИСТРАТОРА/МАСТЕРА: Изменить статус заявки/бронирования по ее ID (подтвердить, завершить, отменить).",
            "parameters": {
                "type": "object",
                "properties": {
                    "booking_id": {
                        "type": "integer",
                        "description": "Уникальный ID заявки (например 5, 12, 18)."
                    },
                    "new_status": {
                        "type": "string",
                        "enum": ["pending", "confirmed", "completed", "cancelled"],
                        "description": "Новый статус: 'confirmed' (подтвердить), 'completed' (завершена), 'cancelled' (отменить), 'pending' (на рассмотрении)."
                    },
                    "admin_notes": {
                        "type": "string",
                        "description": "Дополнительный комментарий администратора (опционально)."
                    }
                },
                "required": ["booking_id", "new_status"]
            }
        }
    },
    {
        "type": "function",
        "function": {
            "name": "admin_get_schedule",
            "description": "👑 ДЛЯ АДМИНИСТРАТОРА/МАСТЕРА: Получить подробное расписание на конкретный день (все слоты от 09:00 до 23:00 с указанием имени клиента и услуги для занятых часов).",
            "parameters": {
                "type": "object",
                "properties": {
                    "date": {
                        "type": "string",
                        "description": "Дата в формате YYYY-MM-DD или 'today' / 'tomorrow'."
                    }
                },
                "required": ["date"]
            }
        }
    },
    {
        "type": "function",
        "function": {
            "name": "admin_block_slot",
            "description": "👑 ДЛЯ АДМИНИСТРАТОРА/МАСТЕРА: Заблокировать/закрыть временной слот в расписании (перерыв, личные дела, выходной), чтобы клиенты не могли записаться на это время.",
            "parameters": {
                "type": "object",
                "properties": {
                    "date": {
                        "type": "string",
                        "description": "Дата слота (YYYY-MM-DD)."
                    },
                    "time": {
                        "type": "string",
                        "description": "Время слота (например '14:00', '16:00')."
                    },
                    "reason": {
                        "type": "string",
                        "description": "Причина закрытия слота (например 'Перерыв', 'Выходной', 'Обучение')."
                    }
                },
                "required": ["date", "time"]
            }
        }
    }
]


# =============================================================================
# 2. PYTHON DATABASE & UTILITY HANDLERS
# =============================================================================

def handle_get_current_datetime(timezone: str = "Asia/Tbilisi") -> Dict[str, Any]:
    """Returns current live date, time, weekday, and year in Batumi timezone."""
    now = datetime.now()
    weekdays_ru = ["Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота", "Воскресенье"]
    weekdays_ka = ["ორშაბათი", "სამშაბათი", "ოთხშაბათი", "ხუთშაბათი", "პარასკევი", "შაბათი", "კვირა"]
    weekdays_en = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]

    w_idx = now.weekday()
    date_str = now.strftime("%Y-%m-%d")
    time_str = now.strftime("%H:%M")

    tomorrow = (now + timedelta(days=1)).strftime("%Y-%m-%d")
    after_tomorrow = (now + timedelta(days=2)).strftime("%Y-%m-%d")

    return {
        "current_date": date_str,
        "current_time": time_str,
        "current_year": now.year,
        "weekday_ru": weekdays_ru[w_idx],
        "weekday_ka": weekdays_ka[w_idx],
        "weekday_en": weekdays_en[w_idx],
        "tomorrow_date": tomorrow,
        "after_tomorrow_date": after_tomorrow,
        "timezone": "Asia/Tbilisi (UTC+4, Батуми)",
        "human_readable": f"{date_str} ({weekdays_ru[w_idx]}), текущее время в Батуми: {time_str}"
    }


def handle_check_available_slots(date_str: str) -> Dict[str, Any]:
    """Checks free and booked slots in database for the given date."""
    target_date = None
    for fmt in ("%Y-%m-%d", "%d.%m.%Y", "%d/%m/%Y"):
        try:
            target_date = datetime.strptime(date_str.strip(), fmt).date()
            break
        except ValueError:
            pass

    if not target_date:
        target_date = date.today()

    target_date_str = str(target_date)

    all_slots = [
        "09:00", "10:00", "11:00", "12:00", "13:00",
        "14:00", "15:00", "16:00", "17:00", "18:00",
        "19:00", "20:00", "21:00", "22:00"
    ]

    try:
        with _get_db() as conn:
            cur = conn.cursor()
            
            # Check full day blocked
            cur.execute(
                "SELECT time_slot FROM bookings_blockedtimeslot WHERE date = ? AND (time_slot = 'ALL_DAY' OR time_slot = '' OR time_slot IS NULL)",
                (target_date_str,)
            )
            if cur.fetchone():
                return {
                    "date": target_date_str,
                    "is_open": False,
                    "available_slots": [],
                    "message": f"На дату {target_date_str} салон не принимает гостей (выходной или спецобслуживание)."
                }

            # Blocked hours
            cur.execute("SELECT time_slot FROM bookings_blockedtimeslot WHERE date = ?", (target_date_str,))
            blocked_slots = {r["time_slot"].strip()[:5] for r in cur.fetchall() if r["time_slot"]}

            # Active Booked hours
            cur.execute(
                "SELECT booking_time FROM bookings_booking WHERE booking_date = ? AND status != 'cancelled'",
                (target_date_str,)
            )
            booked_slots = {r["booking_time"].strip()[:5] for r in cur.fetchall() if r["booking_time"]}

            free_slots = [s for s in all_slots if s not in blocked_slots and s not in booked_slots]

            return {
                "date": target_date_str,
                "is_open": True,
                "available_slots_count": len(free_slots),
                "available_slots": free_slots,
                "booked_slots": list(booked_slots),
                "operating_hours": "09:00 - 23:00 (ежедневно)"
            }
    except Exception as e:
        logger.error("DB slots check error: %s", e)
        return {
            "date": target_date_str,
            "available_slots": ["10:00", "12:00", "14:30", "17:00", "19:00", "21:00"],
            "operating_hours": "09:00 - 23:00"
        }


def handle_get_client_bookings(client_phone: str, client_name: Optional[str] = None) -> Dict[str, Any]:
    """Looks up existing bookings in DB by phone or name."""
    clean_phone = "".join(filter(str.isdigit, client_phone))
    
    try:
        with _get_db() as conn:
            cur = conn.cursor()
            query = "SELECT * FROM bookings_booking WHERE status != 'cancelled'"
            params = []

            if clean_phone and len(clean_phone) >= 5:
                query += " AND client_phone LIKE ?"
                params.append(f"%{clean_phone[-7:]}%")
            elif client_name:
                query += " AND client_name LIKE ?"
                params.append(f"%{client_name.strip()}%")

            query += " ORDER BY booking_date DESC LIMIT 5"
            cur.execute(query, params)
            rows = cur.fetchall()

            status_map = {
                "pending": "Ожидает подтверждения",
                "confirmed": "Подтверждена",
                "completed": "Завершена",
                "cancelled": "Отменена"
            }

            bookings = []
            for r in rows:
                st = r["status"]
                bookings.append({
                    "booking_id": r["id"],
                    "client_name": r["client_name"],
                    "client_phone": r["client_phone"],
                    "ritual": r["service_name"] or "Массаж",
                    "date": str(r["booking_date"]),
                    "time": r["booking_time"],
                    "status": status_map.get(st, st),
                    "notes": r["notes"] or ""
                })

            return {
                "found_count": len(bookings),
                "bookings": bookings
            }
    except Exception as e:
        logger.error("Error looking up client bookings: %s", e)
        return {"found_count": 0, "bookings": [], "error": str(e)}


def handle_create_booking(
    client_name: str,
    client_phone: str,
    ritual_name: str,
    date: str,
    time: str,
    notes: str = ""
) -> Dict[str, Any]:
    """Creates a new record in bookings_booking table, ensuring valid client info."""
    clean_n = (client_name or "").strip()
    clean_p = (client_phone or "").strip()

    if not clean_p or not clean_n or clean_n.lower() in ("гость", "клиент", "none", ""):
        return {
            "status": "need_info",
            "message": "Для оформления записи в базе данных ОБЯЗАТЕЛЬНО требуются реальное имя гостя и контактный номер телефона. Не придумывай данные! Пожалуйста, вежливо уточни у клиента: 'С удовольствием запишу вас! Подскажите, пожалуйста, ваше имя и контактный номер телефона для подтверждения брони? 🌿' И только когда клиент назовет их, вызови create_booking_in_db повторно."
        }

    now_str = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    
    try:
        with _get_db() as conn:
            cur = conn.cursor()

            # Find matching service_id if exists
            cur.execute("SELECT id FROM home_ritual WHERE name LIKE ? OR name_ru LIKE ? LIMIT 1", (f"%{ritual_name}%", f"%{ritual_name}%"))
            r_row = cur.fetchone()
            service_id = r_row["id"] if r_row else None

            cur.execute("""
            INSERT INTO bookings_booking (
                client_name, client_phone, client_email, service_name,
                service_id, booking_date, booking_time, notes, status,
                created_at, updated_at
            ) VALUES (?, ?, '', ?, ?, ?, ?, ?, 'pending', ?, ?)
            """, (
                clean_n,
                clean_p,
                ritual_name.strip(),
                service_id,
                date.strip(),
                time.strip(),
                notes.strip(),
                now_str,
                now_str
            ))
            booking_id = cur.lastrowid
            conn.commit()

            # Trigger instant WhatsApp notification to master
            try:
                from bookings.notifications import send_booking_whatsapp_alert
                send_booking_whatsapp_alert({
                    "id": booking_id,
                    "client_name": clean_n,
                    "client_phone": clean_p,
                    "service_name": ritual_name.strip(),
                    "booking_date": date.strip(),
                    "booking_time": time.strip(),
                    "notes": notes.strip(),
                }, source="🤖 ИИ-администратор (Чат/Мессенджер)")
            except Exception as notify_err:
                logger.error("Failed to send WhatsApp notification from AI tool: %s", notify_err)

            return {
                "status": "success",
                "booking_id": booking_id,
                "client_name": clean_n,
                "client_phone": clean_p,
                "ritual": ritual_name.strip(),
                "date": date.strip(),
                "time": time.strip(),
                "message": f"Запись #{booking_id} на имя {clean_n} ({clean_p}) успешно создана в базе данных. Администратор свяжется для финального подтверждения."
            }
    except Exception as e:
        logger.error("Error creating booking in DB: %s", e)
        return {"status": "error", "message": f"Ошибка создания брони: {e}"}


def handle_cancel_booking(
    client_phone: str,
    booking_id: Optional[int] = None,
    date: Optional[str] = None
) -> Dict[str, Any]:
    """Cancels a booking by setting status='cancelled'."""
    clean_phone = "".join(filter(str.isdigit, client_phone))

    try:
        with _get_db() as conn:
            cur = conn.cursor()
            
            if booking_id:
                cur.execute("UPDATE bookings_booking SET status = 'cancelled', updated_at = CURRENT_TIMESTAMP WHERE id = ?", (booking_id,))
            elif clean_phone and date:
                cur.execute(
                    "UPDATE bookings_booking SET status = 'cancelled', updated_at = CURRENT_TIMESTAMP WHERE client_phone LIKE ? AND booking_date = ? AND status != 'cancelled'",
                    (f"%{clean_phone[-7:]}%", date.strip())
                )
            elif clean_phone:
                cur.execute(
                    "UPDATE bookings_booking SET status = 'cancelled', updated_at = CURRENT_TIMESTAMP WHERE id = (SELECT id FROM bookings_booking WHERE client_phone LIKE ? AND status != 'cancelled' ORDER BY booking_date DESC LIMIT 1)",
                    (f"%{clean_phone[-7:]}%",)
                )

            if cur.rowcount > 0:
                conn.commit()
                return {"status": "cancelled", "message": "Запись успешно отменена в базе данных салона."}
            else:
                return {"status": "not_found", "message": "Активная бронь с указанными данными не найдена."}
    except Exception as e:
        logger.error("Error cancelling booking in DB: %s", e)
        return {"status": "error", "message": str(e)}


def handle_get_rituals_catalog(category: Optional[str] = None) -> Dict[str, Any]:
    """Fetches exact live prices and rituals from home_ritual table."""
    try:
        with _get_db() as conn:
            cur = conn.cursor()
            query = "SELECT * FROM home_ritual"
            params = []
            if category:
                query += " WHERE category = ?"
                params.append(category)
            query += " ORDER BY [order] ASC"
            
            cur.execute(query, params)
            rows = cur.fetchall()

            items = []
            for r in rows:
                items.append({
                    "id": r["id"],
                    "name_ru": r["name_ru"] or r["name"],
                    "name_en": r["name"],
                    "name_ka": r["name_ka"] or "",
                    "description_ru": r["description_ru"] or r["description"],
                    "duration_1": r["duration_1"],
                    "price_1": r["price_1"],
                    "duration_2": r["duration_2"] or "",
                    "price_2": r["price_2"] or "",
                    "tag": r["tag_ru"] or r["tag"] or "",
                })

            return {"rituals_count": len(items), "rituals": items}
    except Exception as e:
        logger.error("Error loading rituals from DB: %s", e)
        return {
            "rituals_count": 4,
            "rituals": [
                {"name_ru": "Расслабляющий (Релакс) массаж", "price_1": "120 GEL ($45) / 60 мин", "price_2": "170 GEL ($65) / 90 мин"},
                {"name_ru": "Классический массаж тела", "price_1": "120 GEL ($45) / 60 мин", "price_2": "170 GEL ($65) / 90 мин"},
                {"name_ru": "Спортивный массаж", "price_1": "120 GEL ($45) / 60 мин", "price_2": "170 GEL ($65) / 90 мин"},
                {"name_ru": "Лимфодренажный массаж", "price_1": "120 GEL ($45) / 60 мин", "price_2": "170 GEL ($65) / 90 мин"},
            ]
        }


def handle_admin_list_bookings(
    status: Optional[str] = None,
    date_filter: Optional[str] = None,
    limit: int = 15
) -> Dict[str, Any]:
    """👑 Admin Tool: Fetches list of bookings with rich filtering."""
    try:
        with _get_db() as conn:
            cur = conn.cursor()
            query = "SELECT * FROM bookings_booking"
            clauses = []
            params = []

            # Status filtering
            if status and status.lower() not in ("all", "все"):
                st = status.lower().strip()
                if st in ("pending", "ожидает", "новые", "новая"):
                    clauses.append("status = 'pending'")
                elif st in ("confirmed", "подтверждена", "подтвержденные"):
                    clauses.append("status = 'confirmed'")
                elif st in ("completed", "завершена", "выполнено"):
                    clauses.append("status = 'completed'")
                elif st in ("cancelled", "отменена", "отмененные"):
                    clauses.append("status = 'cancelled'")
                else:
                    clauses.append("status = ?")
                    params.append(st)

            # Date filtering
            today_str = str(date.today())
            tomorrow_str = str(date.today() + timedelta(days=1))

            if date_filter:
                df = date_filter.lower().strip()
                if df in ("today", "сегодня"):
                    clauses.append("booking_date = ?")
                    params.append(today_str)
                elif df in ("tomorrow", "завтра"):
                    clauses.append("booking_date = ?")
                    params.append(tomorrow_str)
                elif df in ("upcoming", "предстоящие", "будущие"):
                    clauses.append("booking_date >= ?")
                    params.append(today_str)
                elif df not in ("all", "все"):
                    clauses.append("booking_date = ?")
                    params.append(df)

            if clauses:
                query += " WHERE " + " AND ".join(clauses)

            query += " ORDER BY booking_date DESC, booking_time ASC LIMIT ?"
            params.append(max(1, min(50, limit)))

            cur.execute(query, params)
            rows = cur.fetchall()

            status_emojis = {
                "pending": "⏳ Ожидает",
                "confirmed": "✅ Подтверждена",
                "completed": "✨ Завершена",
                "cancelled": "❌ Отменена",
            }

            bookings = []
            for r in rows:
                bookings.append({
                    "id": r["id"],
                    "client_name": r["client_name"],
                    "client_phone": r["client_phone"],
                    "service_name": r["service_name"] or "Массаж",
                    "date": str(r["booking_date"]),
                    "time": r["booking_time"],
                    "status": r["status"],
                    "status_label": status_emojis.get(r["status"], r["status"]),
                    "notes": r["notes"] or "",
                    "created_at": str(r["created_at"])[:16],
                })

            return {
                "status": "success",
                "total_found": len(bookings),
                "filter_applied": {"status": status or "all", "date_filter": date_filter or "all"},
                "bookings": bookings,
            }
    except Exception as e:
        logger.error("Error in admin_list_bookings: %s", e)
        return {"status": "error", "message": str(e), "bookings": []}


def handle_admin_update_booking_status(
    booking_id: int,
    new_status: str,
    admin_notes: Optional[str] = None
) -> Dict[str, Any]:
    """👑 Admin Tool: Updates booking status in DB."""
    valid_statuses = {
        "pending": "pending",
        "confirmed": "confirmed",
        "completed": "completed",
        "cancelled": "cancelled",
        "подтвердить": "confirmed",
        "подтверждена": "confirmed",
        "завершить": "completed",
        "завершена": "completed",
        "отменить": "cancelled",
        "отменена": "cancelled",
    }
    target_status = valid_statuses.get(new_status.lower().strip())
    if not target_status:
        return {
            "status": "error",
            "message": f"Неизвестный статус '{new_status}'. Допустимые: pending, confirmed, completed, cancelled."
        }

    try:
        with _get_db() as conn:
            cur = conn.cursor()
            if admin_notes:
                cur.execute(
                    "UPDATE bookings_booking SET status = ?, notes = coalesce(notes, '') || ' | ' || ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?",
                    (target_status, admin_notes.strip(), booking_id)
                )
            else:
                cur.execute(
                    "UPDATE bookings_booking SET status = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?",
                    (target_status, booking_id)
                )

            if cur.rowcount == 0:
                return {"status": "error", "message": f"Заявка #{booking_id} не найдена в базе данных."}

            conn.commit()

            cur.execute("SELECT * FROM bookings_booking WHERE id = ?", (booking_id,))
            updated = dict(cur.fetchone())

            status_names = {
                "pending": "⏳ Ожидает подтверждения",
                "confirmed": "✅ Подтверждена",
                "completed": "✨ Завершена",
                "cancelled": "❌ Отменена",
            }

            return {
                "status": "success",
                "message": f"Статус заявки #{booking_id} успешно изменен на '{status_names.get(target_status)}'.",
                "booking": {
                    "id": updated["id"],
                    "client_name": updated["client_name"],
                    "client_phone": updated["client_phone"],
                    "service_name": updated["service_name"],
                    "date": str(updated["booking_date"]),
                    "time": updated["booking_time"],
                    "new_status": target_status,
                }
            }
    except Exception as e:
        logger.error("Error in admin_update_booking_status: %s", e)
        return {"status": "error", "message": str(e)}


def handle_admin_get_schedule(date_val: str) -> Dict[str, Any]:
    """👑 Admin Tool: Returns hourly timetable for a given day."""
    if date_val.lower().strip() == "today":
        date_str = str(date.today())
    elif date_val.lower().strip() == "tomorrow":
        date_str = str(date.today() + timedelta(days=1))
    else:
        date_str = date_val.strip()

    try:
        with _get_db() as conn:
            cur = conn.cursor()
            cur.execute(
                "SELECT id, client_name, client_phone, service_name, booking_time, status, notes FROM bookings_booking WHERE booking_date = ? AND status != 'cancelled' ORDER BY booking_time ASC",
                (date_str,)
            )
            rows = cur.fetchall()

            booked_by_time = {r["booking_time"]: dict(r) for r in rows}
            slots_schedule = []

            for hour in range(9, 23):
                t1 = f"{hour:02d}:00"
                t2 = f"{hour:02d}:30"
                for t in (t1, t2):
                    if hour == 22 and t == "22:30":
                        continue
                    if t in booked_by_time:
                        b = booked_by_time[t]
                        slots_schedule.append({
                            "time": t,
                            "is_booked": True,
                            "booking_id": b["id"],
                            "client_name": b["client_name"],
                            "client_phone": b["client_phone"],
                            "service": b["service_name"] or "Массаж",
                            "status": b["status"],
                        })
                    else:
                        slots_schedule.append({
                            "time": t,
                            "is_booked": False,
                            "client_name": None,
                            "service": None,
                        })

            return {
                "date": date_str,
                "total_bookings_today": len(rows),
                "schedule": slots_schedule,
            }
    except Exception as e:
        logger.error("Error in admin_get_schedule: %s", e)
        return {"date": date_str, "error": str(e), "schedule": []}


def handle_admin_block_slot(date_str: str, time_slot: str, reason: str = "Закрыто администратором") -> Dict[str, Any]:
    """👑 Admin Tool: Blocks out a specific time slot."""
    return handle_create_booking(
        client_name="🔒 [БЛОКИРОВКА СЛОТА]",
        client_phone="+995000000000",
        ritual_name="Служебная блокировка",
        date=date_str.strip(),
        time=time_slot.strip(),
        notes=f"Слот заблокирован мастером/админом: {reason}"
    )


# Dispatcher dictionary mapping tool names to python functions
STUDIO_TOOL_HANDLERS = {
    "get_current_datetime": lambda args: handle_get_current_datetime(args.get("timezone", "Asia/Tbilisi")),
    "check_available_slots": lambda args: handle_check_available_slots(args.get("date", "")),
    "get_client_bookings": lambda args: handle_get_client_bookings(args.get("client_phone", ""), args.get("client_name")),
    "create_booking_in_db": lambda args: handle_create_booking(
        client_name=args.get("client_name", ""),
        client_phone=args.get("client_phone", ""),
        ritual_name=args.get("ritual_name", ""),
        date=args.get("date", ""),
        time=args.get("time", ""),
        notes=args.get("notes", "")
    ),
    "cancel_booking_in_db": lambda args: handle_cancel_booking(
        client_phone=args.get("client_phone", ""),
        booking_id=args.get("booking_id"),
        date=args.get("date")
    ),
    "get_rituals_catalog": lambda args: handle_get_rituals_catalog(args.get("category")),
    # Admin tools
    "admin_list_bookings": lambda args: handle_admin_list_bookings(
        status=args.get("status"),
        date_filter=args.get("date_filter"),
        limit=args.get("limit", 15)
    ),
    "admin_update_booking_status": lambda args: handle_admin_update_booking_status(
        booking_id=args.get("booking_id"),
        new_status=args.get("new_status", "confirmed"),
        admin_notes=args.get("admin_notes")
    ),
    "admin_get_schedule": lambda args: handle_admin_get_schedule(args.get("date", "today")),
    "admin_block_slot": lambda args: handle_admin_block_slot(
        date_str=args.get("date", ""),
        time_slot=args.get("time", ""),
        reason=args.get("reason", "Закрыто администратором")
    ),
}
