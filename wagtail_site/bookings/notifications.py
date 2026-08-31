"""
Unified WhatsApp & Multi-Channel Notification Service for TOCHKA Massage Studio.
Sends instant push notifications directly to the master's WhatsApp whenever:
1. A client books online via website form.
2. A client orders a gift certificate.
3. An AI assistant creates a booking in Telegram, WhatsApp, Instagram, or Web Chat.
4. An administrator creates or updates a booking.
"""

import os
import re
import urllib.parse
import urllib.request
import logging
from datetime import datetime, date
from typing import Optional, Dict, Any, Union

logger = logging.getLogger(__name__)

# Default master WhatsApp number and CallMeBot API key for TOCHKA Batumi
DEFAULT_MASTER_PHONE = "+995591226145"
DEFAULT_CALLMEBOT_APIKEY = "8224242"


def clean_phone(phone: str) -> str:
    """Removes all non-digit characters from phone number."""
    if not phone:
        return ""
    return re.sub(r"[^\d]", "", str(phone).strip())


def format_booking_notification(
    client_name: str,
    client_phone: str,
    service_name: str,
    booking_date: Union[date, datetime, str],
    booking_time: str,
    notes: str = "",
    booking_id: Optional[Union[int, str]] = None,
    source: str = "🌐 Сайт tochkabatumi.ge"
) -> str:
    """
    Formats a clean, beautiful WhatsApp message with rich markdown and 1-click reply link.
    """
    clean_c_phone = clean_phone(client_phone)
    
    # Format date
    date_display = str(booking_date)
    weekday_str = ""
    if isinstance(booking_date, (date, datetime)):
        weekdays = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"]
        weekday_str = f" ({weekdays[booking_date.weekday()]})"
        date_display = booking_date.strftime("%d.%m.%Y")
    elif isinstance(booking_date, str) and "-" in booking_date:
        try:
            d_obj = datetime.strptime(booking_date.strip(), "%Y-%m-%d").date()
            weekdays = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"]
            weekday_str = f" ({weekdays[d_obj.weekday()]})"
            date_display = d_obj.strftime("%d.%m.%Y")
        except ValueError:
            pass

    time_display = (booking_time or "12:00")[:5]
    ref_tag = f" #{booking_id}" if booking_id else ""

    lines = [
        f"🔔 *НОВАЯ ЗАПИСЬ В TOCHKA!*{ref_tag}",
        f"📍 *Источник:* {source}",
        "",
        f"👤 *Гость:* {client_name}",
        f"📞 *Телефон:* {client_phone}",
        f"💆 *Ритуал:* {service_name or 'Массаж'}",
        f"📅 *Дата:* {date_display}{weekday_str}",
        f"⏰ *Время:* {time_display}",
    ]

    if notes and str(notes).strip() and str(notes).strip() != "—":
        lines.append(f"📝 *Пожелания:* {notes.strip()}")

    lines.extend([
        "",
        "💬 *Написать гостю в WhatsApp в 1 клик:*",
        f"https://wa.me/{clean_c_phone}"
    ])

    return "\n".join(lines)


def format_certificate_notification(
    buyer_name: str,
    buyer_phone: str,
    cert_value: str,
    recipient_name: str = "",
    delivery_type: str = "Электронный (WhatsApp)",
    wishes: str = "",
    booking_id: Optional[Union[int, str]] = None,
    source: str = "🌐 Заказ сертификата на сайте"
) -> str:
    """Formats a WhatsApp notification for Gift Certificate orders."""
    clean_b_phone = clean_phone(buyer_phone)
    ref_tag = f" #{booking_id}" if booking_id else ""

    lines = [
        f"🎁 *НОВЫЙ ЗАКАЗ СЕРТИФИКАТА!*{ref_tag}",
        f"📍 *Источник:* {source}",
        "",
        f"💎 *Номинал:* {cert_value}",
        f"👤 *Покупатель:* {buyer_name}",
        f"📞 *Телефон:* {buyer_phone}",
        f"🎀 *Получатель:* {recipient_name or 'Для себя / Не указан'}",
        f"📦 *Формат:* {delivery_type}",
    ]

    if wishes and str(wishes).strip() and str(wishes).strip() != "—":
        lines.append(f"💌 *Поздравление:* {wishes.strip()}")

    lines.extend([
        "",
        "💬 *Связаться с покупателем в WhatsApp:*",
        f"https://wa.me/{clean_b_phone}"
    ])

    return "\n".join(lines)


def send_callmebot_whatsapp(phone: str, text: str, apikey: str) -> bool:
    """
    Sends message via CallMeBot WhatsApp Gateway.
    Free, instant, official WhatsApp bot push.
    """
    digits_phone = clean_phone(phone)
    clean_key = str(apikey).strip()

    if not digits_phone or not clean_key:
        return False

    encoded_text = urllib.parse.quote(text)
    url = f"https://api.callmebot.com/whatsapp.php?phone={digits_phone}&text={encoded_text}&apikey={clean_key}"

    try:
        req = urllib.request.Request(
            url,
            headers={"User-Agent": "TOCHKA-Sanctuary-Notification/1.0"}
        )
        with urllib.request.urlopen(req, timeout=8) as response:
            res_body = response.read().decode("utf-8", errors="ignore")
            lower_body = res_body.lower()
            if "paused" in lower_body:
                logger.warning(
                    "⚠️ CallMeBot Account is PAUSED for +%s. Please send 'resume' to +34 623 78 95 80 on WhatsApp.",
                    digits_phone
                )
                return False
            if "invalid" in lower_body or "not authorized" in lower_body:
                logger.warning("⚠️ CallMeBot Invalid API key for +%s: %s", digits_phone, res_body)
                return False

            logger.info("CallMeBot WhatsApp notification sent to +%s: %s", digits_phone, res_body[:100])
            return True
    except Exception as e:
        logger.error("CallMeBot WhatsApp send error for +%s: %s", digits_phone, e)
        return False


def send_telegram_admin_alert(text: str) -> bool:
    """
    Sends duplicate notification to Telegram Admin(s) if configured.
    """
    try:
        from home.models import AISettings
        from telegram_adapter import TelegramClient
        ai = AISettings.load()
        token = getattr(ai, "telegram_bot_token", None) or os.getenv("TELEGRAM_BOT_TOKEN")
        admin_chat_id = os.getenv("TELEGRAM_ADMIN_CHAT_ID")
        if token and admin_chat_id:
            client = TelegramClient(token)
            res = client.send_message(chat_id=admin_chat_id, text=text, parse_mode="HTML")
            return res.get("ok", False)
    except Exception as e:
        logger.debug("Telegram admin alert not sent: %s", e)
    return False


def send_gateway_whatsapp(phone: str, text: str) -> bool:
    """
    Sends message via TOCHKA Self-Hosted Baileys Gateway / Green API / Cloud API.
    """
    try:
        from whatsapp_adapter import WhatsAppClient
        client = WhatsAppClient()
        if client.is_configured:
            res = client.send_message(phone, text)
            if res.get("success"):
                logger.info("WhatsApp Gateway message sent to %s", phone)
                return True
    except Exception as e:
        logger.debug("Gateway WhatsApp send failed or not active: %s", e)
    return False


def get_notification_recipients() -> list[tuple[str, str]]:
    """
    Retrieves all configured master/admin recipient phone numbers and CallMeBot API keys.
    Checks:
    1. Wagtail HomePage model (whatsapp_notify_phone, whatsapp_notify_apikey)
    2. Wagtail AISettings model (master_phone)
    3. Environment variables (WHATSAPP_NOTIFY_PHONE, CALLMEBOT_API_KEY)
    4. Hardcoded fallback (+995591226145 / 8224242)
    """
    recipients = []

    # 1. Wagtail HomePage
    try:
        from home.models import HomePage
        hp = HomePage.objects.first()
        if hp:
            p = getattr(hp, "whatsapp_notify_phone", None) or getattr(hp, "loc_phone", None)
            k = getattr(hp, "whatsapp_notify_apikey", None)
            if p:
                recipients.append((p.strip(), (k or DEFAULT_CALLMEBOT_APIKEY).strip()))
    except Exception as e:
        logger.debug("Error reading HomePage WhatsApp settings: %s", e)

    # 2. Environment variables
    env_phone = os.getenv("WHATSAPP_NOTIFY_PHONE")
    env_key = os.getenv("CALLMEBOT_API_KEY")
    if env_phone:
        recipients.append((env_phone.strip(), (env_key or DEFAULT_CALLMEBOT_APIKEY).strip()))

    # 3. Always guarantee default master phone
    if not recipients:
        recipients.append((DEFAULT_MASTER_PHONE, DEFAULT_CALLMEBOT_APIKEY))

    # Deduplicate by clean phone
    unique = []
    seen = set()
    for p, k in recipients:
        c = clean_phone(p)
        if c and c not in seen:
            seen.add(c)
            unique.append((p, k))

    return unique or [(DEFAULT_MASTER_PHONE, DEFAULT_CALLMEBOT_APIKEY)]


def notify_master_whatsapp(message_text: str) -> Dict[str, Any]:
    """
    Sends WhatsApp notification to all configured master numbers.
    Uses CallMeBot + Self-hosted Gateway.
    """
    recipients = get_notification_recipients()
    results = []

    for phone, apikey in recipients:
        sent_callmebot = False
        sent_gateway = False

        # Try CallMeBot (direct personal push)
        if apikey:
            sent_callmebot = send_callmebot_whatsapp(phone, message_text, apikey)

        # Try Gateway / Green API
        sent_gateway = send_gateway_whatsapp(phone, message_text)

        # Try Telegram fallback
        sent_tg = send_telegram_admin_alert(message_text)

        success = sent_callmebot or sent_gateway or sent_tg
        results.append({
            "phone": phone,
            "success": success,
            "callmebot": sent_callmebot,
            "gateway": sent_gateway,
            "telegram": sent_tg,
        })

    return {
        "success": any(r["success"] for r in results),
        "results": results
    }


def send_booking_whatsapp_alert(booking, source: str = "🌐 Сайт tochkabatumi.ge") -> Dict[str, Any]:
    """
    Convenience helper to send a WhatsApp notification for a Booking instance or dict.
    """
    if hasattr(booking, "client_name"):
        # Django Booking Model instance
        msg = format_booking_notification(
            client_name=booking.client_name,
            client_phone=booking.client_phone,
            service_name=booking.service_name or (booking.service.name if booking.service else "Массаж"),
            booking_date=booking.booking_date,
            booking_time=booking.booking_time,
            notes=booking.notes or "",
            booking_id=booking.id,
            source=source
        )
    elif isinstance(booking, dict):
        msg = format_booking_notification(
            client_name=booking.get("client_name") or booking.get("name", "Гость"),
            client_phone=booking.get("client_phone") or booking.get("phone", ""),
            service_name=booking.get("service_name") or booking.get("ritual", "Массаж"),
            booking_date=booking.get("booking_date") or booking.get("date", datetime.today().date()),
            booking_time=booking.get("booking_time") or booking.get("time", "12:00"),
            notes=booking.get("notes", ""),
            booking_id=booking.get("booking_id") or booking.get("id"),
            source=source
        )
    else:
        return {"success": False, "error": "Invalid booking object"}

    return notify_master_whatsapp(msg)
