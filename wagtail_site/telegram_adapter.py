"""
Telegram Adapter for TOCHKA Massage Studio AI Administrator.
Supports:
- Long-polling daemon mode (for local testing & VPS background service)
- Webhook processing mode (for Django webhook view)
- Rich interactive reply keyboards & quick actions
- Auto contact capture (phone & name saved directly to SQLite)
- Real-time typing indicators during AI generation & DB queries
- Multi-user isolation and persistent chat history
"""

import os
import sys
import time
import json
import logging
import urllib.request
import urllib.parse
import urllib.error
from typing import Dict, Any, Optional, List, Union

from ai_service import get_ai_assistant, AIAssistantService
from openrouter_client import _find_and_load_env

logger = logging.getLogger(__name__)


import html
import re


def markdown_to_telegram_html(text: str) -> str:
    """
    Converts standard Markdown formatting (bold, italic, code, links) to safe Telegram HTML.
    Prevents raw **asterisks** and _underscores_ from showing up in Telegram.
    """
    if not text:
        return ""

    # Escape HTML special characters first
    text = html.escape(text)

    # 1. Bold: **text** or __text__ -> <b>text</b>
    text = re.sub(r"\*\*(.+?)\*\*", r"<b>\1</b>", text)
    text = re.sub(r"__(.+?)__", r"<b>\1</b>", text)

    # 2. Italic: *text* or _text_ -> <i>text</i> (when not within words)
    text = re.sub(r"(?<!\w)\*([^\*\n]+?)\*(?!\w)", r"<i>\1</i>", text)
    text = re.sub(r"(?<!\w)_([^_\n]+?)_(?!\w)", r"<i>\1</i>", text)

    # 3. Inline Code: `text` -> <code>text</code>
    text = re.sub(r"`([^`\n]+?)`", r"<code>\1</code>", text)

    # 4. Links: [text](url) -> <a href="url">text</a>
    text = re.sub(r"\[([^\]]+)\]\((https?://[^\)]+)\)", r'<a href="\2">\1</a>', text)

    return text


class TelegramClient:
    """Lightweight, zero-dependency Telegram Bot API client."""

    API_BASE = "https://api.telegram.org/bot"

    def __init__(self, bot_token: Optional[str] = None):
        _find_and_load_env()
        self.bot_token = bot_token or os.getenv("TELEGRAM_BOT_TOKEN")
        if not self.bot_token:
            logger.warning("TELEGRAM_BOT_TOKEN is not set in .env")

    @property
    def is_configured(self) -> bool:
        return bool(self.bot_token and len(self.bot_token) > 15)

    def _api_call(self, method: str, data: Optional[Dict[str, Any]] = None, timeout: int = 35) -> Dict[str, Any]:
        """Makes an HTTP POST request to the Telegram Bot API."""
        if not self.is_configured:
            raise ValueError("TELEGRAM_BOT_TOKEN is missing. Set it in .env")

        url = f"{self.API_BASE}{self.bot_token}/{method}"
        headers = {"Content-Type": "application/json"}
        payload = json.dumps(data).encode("utf-8") if data else None

        req = urllib.request.Request(url, data=payload, headers=headers, method="POST")
        try:
            with urllib.request.urlopen(req, timeout=timeout) as resp:
                raw = resp.read().decode("utf-8")
                return json.loads(raw)
        except urllib.error.HTTPError as err:
            err_body = err.read().decode("utf-8", errors="ignore")
            logger.error(f"Telegram HTTP {err.code} error on {method}: {err_body}")
            try:
                return json.loads(err_body)
            except Exception:
                return {"ok": False, "error_code": err.code, "description": err_body}
        except Exception as e:
            if method == "getUpdates" and "timed out" in str(e).lower():
                logger.debug(f"Telegram long-poll timeout (no new updates): {e}")
                return {"ok": True, "result": []}
            logger.error(f"Telegram API network exception on {method}: {e}")
            return {"ok": False, "description": str(e)}

    def get_me(self) -> Dict[str, Any]:
        return self._api_call("getMe")

    def send_message(
        self,
        chat_id: Union[int, str],
        text: str,
        parse_mode: Optional[str] = "HTML",
        reply_markup: Optional[Dict[str, Any]] = None,
    ) -> Dict[str, Any]:
        formatted_text = text
        if parse_mode == "HTML":
            formatted_text = markdown_to_telegram_html(text)

        payload: Dict[str, Any] = {
            "chat_id": chat_id,
            "text": formatted_text,
        }
        if parse_mode:
            payload["parse_mode"] = parse_mode
        if reply_markup:
            payload["reply_markup"] = reply_markup

        res = self._api_call("sendMessage", payload, timeout=15)
        # Fallback to plain text if Telegram rejected HTML formatting
        if not res.get("ok") and parse_mode:
            logger.warning(f"Telegram HTML parse error: {res.get('description')}. Falling back to plain text.")
            plain_text = re.sub(r"<[^>]+>", "", formatted_text)
            plain_text = re.sub(r"&lt;", "<", plain_text)
            plain_text = re.sub(r"&gt;", ">", plain_text)
            plain_text = re.sub(r"&amp;", "&", plain_text)
            fallback_payload = {
                "chat_id": chat_id,
                "text": plain_text,
            }
            if reply_markup:
                fallback_payload["reply_markup"] = reply_markup
            return self._api_call("sendMessage", fallback_payload, timeout=15)

        return res

    def send_chat_action(self, chat_id: Union[int, str], action: str = "typing") -> Dict[str, Any]:
        return self._api_call("sendChatAction", {"chat_id": chat_id, "action": action}, timeout=10)

    def get_updates(self, offset: Optional[int] = None, limit: int = 100, timeout: int = 25) -> Dict[str, Any]:
        payload: Dict[str, Any] = {"limit": limit, "timeout": timeout}
        if offset is not None:
            payload["offset"] = offset
        return self._api_call("getUpdates", payload, timeout=timeout + 10)

    def set_webhook(self, url: str, secret_token: Optional[str] = None) -> Dict[str, Any]:
        payload: Dict[str, Any] = {"url": url}
        if secret_token:
            payload["secret_token"] = secret_token
        return self._api_call("setWebhook", payload)

    def delete_webhook(self, drop_pending_updates: bool = False) -> Dict[str, Any]:
        return self._api_call("deleteWebhook", {"drop_pending_updates": drop_pending_updates})

    def answer_callback_query(self, callback_query_id: str, text: Optional[str] = None, show_alert: bool = False) -> Dict[str, Any]:
        payload: Dict[str, Any] = {"callback_query_id": callback_query_id}
        if text:
            payload["text"] = text
        if show_alert:
            payload["show_alert"] = show_alert
        return self._api_call("answerCallbackQuery", payload)

    def edit_message_text(
        self,
        chat_id: Union[int, str],
        message_id: int,
        text: str,
        parse_mode: Optional[str] = "HTML",
        reply_markup: Optional[Dict[str, Any]] = None,
    ) -> Dict[str, Any]:
        formatted_text = text
        if parse_mode == "HTML":
            formatted_text = markdown_to_telegram_html(text)
        payload: Dict[str, Any] = {
            "chat_id": chat_id,
            "message_id": message_id,
            "text": formatted_text,
        }
        if parse_mode:
            payload["parse_mode"] = parse_mode
        if reply_markup:
            payload["reply_markup"] = reply_markup
        return self._api_call("editMessageText", payload)


# Keyboards and UI helpers
def get_main_keyboard() -> Dict[str, Any]:
    """Generates default luxury reply keyboard for clients."""
    return {
        "keyboard": [
            [
                {"text": "💆 Услуги и цены"},
                {"text": "🕒 Свободные окошки"},
            ],
            [
                {"text": "📅 Записаться на массаж"},
                {"text": "📍 Адрес и контакты"},
            ],
            [
                {"text": "📞 Поделиться контактом", "request_contact": True},
                {"text": "🔄 Очистить диалог"},
            ],
        ],
        "resize_keyboard": True,
        "is_persistent": True,
    }


def get_admin_keyboard() -> Dict[str, Any]:
    """Generates administrative management keyboard for master/admin."""
    return {
        "keyboard": [
            [
                {"text": "📋 Все заявки"},
                {"text": "⏳ Ожидают подтверждения"},
            ],
            [
                {"text": "📅 Расписание на сегодня"},
                {"text": "📅 Расписание на завтра"},
            ],
            [
                {"text": "🚫 Закрыть слот"},
                {"text": "🔄 Очистить диалог"},
            ],
        ],
        "resize_keyboard": True,
        "is_persistent": True,
    }


def get_booking_action_buttons(booking_id: int, client_phone: str = "", current_status: str = "pending") -> Dict[str, Any]:
    """Inline action buttons for managing a specific booking in 1 click."""
    clean_phone = "".join(filter(str.isdigit, client_phone))
    rows = []

    action_row = []
    if current_status != "confirmed":
        action_row.append({"text": f"✅ Подтвердить #{booking_id}", "callback_data": f"adm_confirm:{booking_id}"})
    if current_status != "completed":
        action_row.append({"text": f"✨ Завершить #{booking_id}", "callback_data": f"adm_complete:{booking_id}"})
    if action_row:
        rows.append(action_row)

    second_row = []
    if current_status != "cancelled":
        second_row.append({"text": f"❌ Отменить #{booking_id}", "callback_data": f"adm_cancel:{booking_id}"})
    if clean_phone:
        second_row.append({"text": "💬 WhatsApp", "url": f"https://wa.me/{clean_phone}"})
    if second_row:
        rows.append(second_row)

    return {"inline_keyboard": rows}


def format_booking_card(b: Dict[str, Any]) -> str:
    """Formats a single booking record into a luxury Telegram HTML card."""
    status_icons = {
        "pending": "⏳ <b>Ожидает подтверждения</b>",
        "confirmed": "✅ <b>Подтверждена</b>",
        "completed": "✨ <b>Завершена</b>",
        "cancelled": "❌ <b>Отменена</b>",
    }
    st_text = status_icons.get(b.get("status"), b.get("status", "pending"))
    b_id = b.get("id")
    c_name = b.get("client_name", "Гость")
    c_phone = b.get("client_phone", "—")
    s_name = b.get("service_name", "Массаж")
    b_date = b.get("date", "—")
    b_time = b.get("time", "—")
    notes = b.get("notes", "")

    card = (
        f"📋 <b>Заявка #{b_id}</b> — {st_text}\n\n"
        f"👤 <b>Клиент:</b> {c_name}\n"
        f"📞 <b>Телефон:</b> <code>{c_phone}</code>\n"
        f"💆 <b>Услуга:</b> {s_name}\n"
        f"🗓 <b>Дата и время:</b> {b_date} в <b>{b_time}</b>\n"
    )
    if notes:
        card += f"📝 <b>Заметка:</b> <i>{notes}</i>\n"
    return card


def get_inline_links() -> Dict[str, Any]:
    """Inline links to salon resources."""
    return {
        "inline_keyboard": [
            [
                {"text": "🌐 Официальный сайт", "url": "https://tochkabatumi.ge"},
                {"text": "💬 WhatsApp мастера", "url": "https://wa.me/995591226145"},
            ],
            [
                {"text": "📷 Instagram (@toch._ka)", "url": "https://www.instagram.com/toch._ka/"},
                {"text": "🗺️ Мы на карте Батуми", "url": "https://maps.google.com/?q=46+Luka+Asatiani+St,+Batumi"},
            ],
        ]
    }


class TelegramAdapter:
    """
    Adapter integrating Telegram messaging with the AI Studio Assistant and Admin Panel.
    """

    def __init__(self, bot_token: Optional[str] = None, assistant: Optional[AIAssistantService] = None):
        self.tg = TelegramClient(bot_token=bot_token)
        self.ai = assistant or get_ai_assistant()

    def process_update(self, update: Dict[str, Any]) -> bool:
        """Processes a single Telegram Update JSON object."""
        # 1. Handle Inline Button Callbacks (e.g. Confirm / Cancel Booking)
        callback_query = update.get("callback_query")
        if callback_query:
            return self._handle_callback_query(callback_query)

        message = update.get("message") or update.get("edited_message")
        if not message:
            return False

        chat = message.get("chat", {})
        chat_id = chat.get("id")
        if not chat_id:
            return False

        from_user = message.get("from", {})
        first_name = from_user.get("first_name", "")
        last_name = from_user.get("last_name", "")
        username = from_user.get("username", "")
        full_name = f"{first_name} {last_name}".strip() or username or "Гость"
        
        session_id = f"tg_{chat_id}"

        from ai_service import is_admin_user
        is_admin = is_admin_user(username)
        current_keyboard = get_admin_keyboard() if is_admin else get_main_keyboard()

        # 2. Handle Contact Sharing
        contact = message.get("contact")
        if contact:
            phone = contact.get("phone_number", "").strip()
            c_name = f"{contact.get('first_name', '')} {contact.get('last_name', '')}".strip() or full_name
            self.ai.memory.update_client_profile(
                session_id=session_id,
                name=c_name,
                phone=phone,
                metadata={"telegram_user_id": from_user.get("id"), "username": username}
            )
            logger.info(f"Telegram contact received: {c_name} ({phone}) for session {session_id}")
            self.tg.send_message(
                chat_id=chat_id,
                text=f"Спасибо, {c_name}! 🌿 Ваш номер {phone} сохранен. Чем я могу помочь вам: подобрать время или рассказать о ритуалах?",
                reply_markup=current_keyboard
            )
            return True

        # 3. Handle Text Messages
        text = (message.get("text") or "").strip()
        if not text:
            if message.get("voice"):
                self.tg.send_message(
                    chat_id=chat_id,
                    text="Спасибо за голосовое сообщение! 🌿 Сейчас я лучше всего понимаю текстовые сообщения. Напишите, пожалуйста, ваш вопрос текстом, и я с радостью отвечу.",
                    reply_markup=current_keyboard
                )
            return False

        # 4. Handle Commands & Quick Buttons
        if text.startswith(("/start", "/admin")):
            if is_admin:
                welcome_admin = (
                    f"Здравствуйте, {first_name or 'Анна'}! 👑✨\n\n"
                    f"Вы авторизованы как <b>Администратор / Мастер студии TOCHKA</b> (@{username}).\n\n"
                    f"<b>Вам доступны команды управления:</b>\n"
                    f"• 📋 <b>Все заявки</b> — просмотр истории записей\n"
                    f"• ⏳ <b>Ожидают подтверждения</b> — новые заявки, требующие аппрува\n"
                    f"• 📅 <b>Расписание на сегодня / завтра</b> — почасовой график визитов\n"
                    f"• 🚫 <b>Закрыть слот</b> — блокировка времени для отдыха или дел\n\n"
                    f"Вы можете нажимать кнопки меню или писать любые указания обычным языком (например: <i>«Подтверди заявку #14»</i>, <i>«Покажи записи на пятницу»</i>, <i>«Закрой слот 16:00 на завтра»</i>)."
                )
                self.tg.send_message(chat_id=chat_id, text=welcome_admin, reply_markup=get_admin_keyboard())
                return True
            else:
                from ai_service import load_dynamic_ai_config
                cfg = load_dynamic_ai_config()
                custom_welcome = cfg.get("telegram_welcome_message", "").strip()

                if custom_welcome:
                    welcome_text = custom_welcome
                    if "{first_name}" in welcome_text:
                        welcome_text = welcome_text.replace("{first_name}", first_name or "дорогой гость")
                else:
                    welcome_text = (
                        f"Здравствуйте, {first_name or 'дорогой гость'}! ✨\n\n"
                        f"Я — заботливый виртуальный администратор премиальной студии массажа <b>TOCHKA</b> в Батуми 🌿\n\n"
                        f"Все сеансы массажа в нашей студии проводит исключительно ее основатель — <b>Анна Колосова</b> по авторской технике непрерывного контакта.\n\n"
                        f"Я помогу вам:\n"
                        f"• Выбрать подходящий ритуал массажа (в меню 4 авторских вида)\n"
                        f"• Узнать цены и применить скидку 10% на первый визит (код <code>FIRST10</code>)\n"
                        f"• Проверить свободные часы на сегодня или любой другой день\n"
                        f"• Записаться онлайн прямо в этом диалоге\n\n"
                        f"Чем я могу порадовать вас сегодня?"
                    )
                self.tg.send_message(chat_id=chat_id, text=welcome_text, reply_markup=get_main_keyboard())
                return True

        elif text in ("/reset", "/clear", "🔄 Очистить диалог"):
            self.ai.reset_session(session_id)
            self.tg.send_message(
                chat_id=chat_id,
                text="🧹 История нашей беседы очищена. Готова к новым задачам!",
                reply_markup=current_keyboard
            )
            return True

        elif text in ("/help", "Справка"):
            if is_admin:
                help_text = (
                    "👑 <b>Панель управления администратора TOCHKA:</b>\n\n"
                    "• <b>Быстрые кнопки:</b> используйте меню внизу для просмотра заявок и расписания.\n"
                    "• <b>Управление в 1 клик:</b> под каждой заявкой есть интерактивные кнопки ✅ Подтвердить / ✨ Завершить / ❌ Отменить.\n"
                    "• <b>ИИ-команды:</b> просто напишите боту: <i>«Подтверди запись 12»</i> или <i>«Есть кто на 18:00 сегодня?»</i>\n"
                    "• <b>Wagtail Admin:</b> редактирование всех настроек доступно на http://127.0.0.1:8000/admin/"
                )
                self.tg.send_message(chat_id=chat_id, text=help_text, reply_markup=get_admin_keyboard())
            else:
                help_text = (
                    "🌿 <b>Справка по боту студии TOCHKA:</b>\n\n"
                    "• Напишите любой вопрос обычными словами (например: <i>«Есть окошки на завтра после 16:00?»</i> или <i>«Сколько стоит спортивный массаж?»</i>)\n"
                    "• Для быстрой навигации используйте кнопки внизу экрана.\n"
                    "• Команда /reset или кнопка «🔄 Очистить диалог» сбрасывает контекст беседы.\n\n"
                    "📍 Батуми, ул. Лука Асатиани, 46\n"
                    "📞 +995 591 226 145"
                )
                self.tg.send_message(chat_id=chat_id, text=help_text, reply_markup=get_inline_links())
            return True

        # 5. Admin Fast-Action Buttons
        if is_admin:
            from ai_tools import handle_admin_list_bookings, handle_admin_get_schedule

            if text in ("📋 Все заявки", "/bookings"):
                res = handle_admin_list_bookings(status="all", limit=10)
                bookings = res.get("bookings", [])
                if not bookings:
                    self.tg.send_message(chat_id=chat_id, text="📋 В базе данных пока нет созданных заявок.", reply_markup=get_admin_keyboard())
                    return True

                self.tg.send_message(chat_id=chat_id, text=f"📋 <b>Последние заявки на массаж ({len(bookings)} шт.):</b>", reply_markup=get_admin_keyboard())
                for b in bookings:
                    card = format_booking_card(b)
                    btn = get_booking_action_buttons(b["id"], b.get("client_phone", ""), b.get("status"))
                    self.tg.send_message(chat_id=chat_id, text=card, reply_markup=btn)
                return True

            elif text in ("⏳ Ожидают подтверждения", "/pending"):
                res = handle_admin_list_bookings(status="pending", limit=10)
                bookings = res.get("bookings", [])
                if not bookings:
                    self.tg.send_message(chat_id=chat_id, text="✨ Отлично! Все новые заявки уже обработаны. Нет ожидающих подтверждения.", reply_markup=get_admin_keyboard())
                    return True

                self.tg.send_message(chat_id=chat_id, text=f"⏳ <b>Заявки, ожидающие вашего подтверждения ({len(bookings)} шт.):</b>", reply_markup=get_admin_keyboard())
                for b in bookings:
                    card = format_booking_card(b)
                    btn = get_booking_action_buttons(b["id"], b.get("client_phone", ""), "pending")
                    self.tg.send_message(chat_id=chat_id, text=card, reply_markup=btn)
                return True

            elif text in ("📅 Расписание на сегодня", "/today"):
                sched = handle_admin_get_schedule("today")
                date_str = sched.get("date", "")
                slots = sched.get("schedule", [])
                lines = [f"📅 <b>Расписание на сегодня ({date_str}):</b>\n"]
                busy_count = 0
                for s in slots:
                    if s["is_booked"]:
                        busy_count += 1
                        lines.append(f"🔴 <b>{s['time']}</b> — #{s['booking_id']} <b>{s['client_name']}</b> ({s['service']}) [{s['status']}]")
                    else:
                        lines.append(f"🟢 {s['time']} — Свободно")
                lines.append(f"\n📊 Занято слотов: <b>{busy_count}</b>")
                self.tg.send_message(chat_id=chat_id, text="\n".join(lines), reply_markup=get_admin_keyboard())
                return True

            elif text in ("📅 Расписание на завтра", "/tomorrow"):
                sched = handle_admin_get_schedule("tomorrow")
                date_str = sched.get("date", "")
                slots = sched.get("schedule", [])
                lines = [f"📅 <b>Расписание на завтра ({date_str}):</b>\n"]
                busy_count = 0
                for s in slots:
                    if s["is_booked"]:
                        busy_count += 1
                        lines.append(f"🔴 <b>{s['time']}</b> — #{s['booking_id']} <b>{s['client_name']}</b> ({s['service']}) [{s['status']}]")
                    else:
                        lines.append(f"🟢 {s['time']} — Свободно")
                lines.append(f"\n📊 Занято слотов: <b>{busy_count}</b>")
                self.tg.send_message(chat_id=chat_id, text="\n".join(lines), reply_markup=get_admin_keyboard())
                return True

            elif text == "🚫 Закрыть слот":
                msg = (
                    "🔒 <b>Блокировка слота в расписании</b>\n\n"
                    "Чтобы закрыть время для записи, просто напишите мне, например:\n"
                    "• <i>«Закрой слот 15:00 на сегодня»</i>\n"
                    "• <i>«Заблокируй 18:00 на завтра, причина: перерыв»</i>\n"
                    "• <i>«Закрой 2026-08-30 с 12:00 до 14:00»</i>\n\n"
                    "И я автоматически заблокирую этот слот в базе данных."
                )
                self.tg.send_message(chat_id=chat_id, text=msg, reply_markup=get_admin_keyboard())
                return True

        elif text == "📍 Адрес и контакты":
            contacts_text = (
                "📍 <b>Студия массажа TOCHKA в Батуми</b>\n\n"
                "• <b>Адрес:</b> ул. Лука Асатиани, 46 (46 Luka Asatiani St, Batumi)\n"
                "• <b>Часы работы:</b> ежедневно с 09:00 до 23:00\n"
                "• <b>Телефон / WhatsApp:</b> +995 591 226 145\n"
                "• <b>Instagram:</b> @toch._ka\n\n"
                "Уютное пространство в самом центре города, чайные церемонии и авторские техники мастера Анны Колосовой ✨"
            )
            self.tg.send_message(chat_id=chat_id, text=contacts_text, reply_markup=get_inline_links())
            return True

        # Send typing action to Telegram while processing AI & DB queries
        self.tg.send_chat_action(chat_id=chat_id, action="typing")

        # Process through unified AI Service
        result = self.ai.process_incoming_message(
            session_id=session_id,
            user_text=text,
            channel="telegram",
            client_name=full_name,
            metadata={"telegram_chat_id": chat_id, "username": username, "is_admin": is_admin}
        )

        # If chat is in manual mode or AI is disabled for this channel -> Master will reply from Wagtail!
        if result.get("manual_mode") or not result.get("response_text"):
            logger.info("Telegram message from chat_id %s saved in DB for manual Master reply.", chat_id)
            return True

        response_text = result.get("response_text", "")
        self.tg.send_message(
            chat_id=chat_id,
            text=response_text,
            reply_markup=current_keyboard
        )
        return True

    def _handle_callback_query(self, callback_query: Dict[str, Any]) -> bool:
        """Handles inline button callbacks from admin action clicks."""
        cq_id = callback_query.get("id")
        data = callback_query.get("data", "")
        from_user = callback_query.get("from", {})
        username = from_user.get("username", "")
        message = callback_query.get("message", {})
        chat_id = message.get("chat", {}).get("id")
        message_id = message.get("message_id")

        from ai_service import is_admin_user
        if not is_admin_user(username):
            self.tg.answer_callback_query(cq_id, text="⛔ У вас нет прав администратора.", show_alert=True)
            return False

        from ai_tools import handle_admin_update_booking_status

        if data.startswith("adm_confirm:"):
            b_id = int(data.split(":")[1])
            res = handle_admin_update_booking_status(booking_id=b_id, new_status="confirmed")
            self.tg.answer_callback_query(cq_id, text=f"✅ Заявка #{b_id} подтверждена!", show_alert=False)
            if res.get("status") == "success":
                b = res["booking"]
                card = format_booking_card(b)
                btn = get_booking_action_buttons(b_id, b.get("client_phone", ""), "confirmed")
                if chat_id and message_id:
                    self.tg.edit_message_text(chat_id=chat_id, message_id=message_id, text=card, reply_markup=btn)
            return True

        elif data.startswith("adm_complete:"):
            b_id = int(data.split(":")[1])
            res = handle_admin_update_booking_status(booking_id=b_id, new_status="completed")
            self.tg.answer_callback_query(cq_id, text=f"✨ Заявка #{b_id} отмечена как завершенная!", show_alert=False)
            if res.get("status") == "success":
                b = res["booking"]
                card = format_booking_card(b)
                btn = get_booking_action_buttons(b_id, b.get("client_phone", ""), "completed")
                if chat_id and message_id:
                    self.tg.edit_message_text(chat_id=chat_id, message_id=message_id, text=card, reply_markup=btn)
            return True

        elif data.startswith("adm_cancel:"):
            b_id = int(data.split(":")[1])
            res = handle_admin_update_booking_status(booking_id=b_id, new_status="cancelled")
            self.tg.answer_callback_query(cq_id, text=f"❌ Заявка #{b_id} отменена.", show_alert=False)
            if res.get("status") == "success":
                b = res["booking"]
                card = format_booking_card(b)
                btn = get_booking_action_buttons(b_id, b.get("client_phone", ""), "cancelled")
                if chat_id and message_id:
                    self.tg.edit_message_text(chat_id=chat_id, message_id=message_id, text=card, reply_markup=btn)
            return True

        self.tg.answer_callback_query(cq_id)
        return True

    def run_polling(self, interval: float = 0.5):
        """Runs the long-polling loop indefinitely."""
        print("\n" + "=" * 65)
        print("   🌿 TOCHKA AI TELEGRAM BOT — LONG-POLLING DAEMON 🌿")
        print("=" * 65)

        if not self.tg.is_configured:
            print("❌ ОШИБКА: TELEGRAM_BOT_TOKEN не найден в файле .env!")
            print("Пожалуйста, добавьте токен бота в .env: TELEGRAM_BOT_TOKEN=\"...\"")
            return

        bot_info = self.tg.get_me()
        if not bot_info.get("ok"):
            print(f"❌ Ошибка подключения к Telegram API: {bot_info.get('description')}")
            return

        user = bot_info.get("result", {})
        print(f"✅ Бот успешно подключен: @{user.get('username')} ({user.get('first_name')})")
        print("🚀 Служба прослушивания сообщений активна. Нажмите Ctrl+C для выхода.\n")

        # Delete any conflicting webhooks before polling
        self.tg.delete_webhook()

        offset = None
        while True:
            try:
                updates_res = self.tg.get_updates(offset=offset, timeout=25)
                if not updates_res.get("ok"):
                    logger.error(f"Updates error: {updates_res}")
                    time.sleep(2)
                    continue

                updates = updates_res.get("result", [])
                for u in updates:
                    offset = u["update_id"] + 1
                    try:
                        self.process_update(u)
                    except Exception as exc:
                        logger.error(f"Error handling update {u.get('update_id')}: {exc}", exc_info=True)

                time.sleep(interval)
            except KeyboardInterrupt:
                print("\n🛑 Остановка Telegram демона по сигналу пользователя.")
                break
            except Exception as loop_err:
                logger.error(f"Polling loop exception: {loop_err}")
                time.sleep(3)


# Global adapter instance
_telegram_adapter: Optional[TelegramAdapter] = None


def get_telegram_adapter() -> TelegramAdapter:
    global _telegram_adapter
    if _telegram_adapter is None:
        _telegram_adapter = TelegramAdapter()
    return _telegram_adapter


if __name__ == "__main__":
    logging.basicConfig(level=logging.INFO, format="%(asctime)s [%(levelname)s] %(message)s")
    adapter = TelegramAdapter()
    adapter.run_polling()
