import json
import re
import urllib.parse
import urllib.request
import logging
from datetime import datetime
from django.utils import timezone
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_POST, require_http_methods
from home.models import Ritual, HomePage
from .models import Booking, BlockedTimeSlot

logger = logging.getLogger(__name__)


@require_http_methods(["GET", "POST"])
def get_available_slots_api(request):
    """
    Returns available and busy time slots dynamically for the requested date.
    Considers:
    1. Active bookings in the database (Booking model with status != cancelled)
    2. Explicitly blocked slots or full day off (BlockedTimeSlot model)
    3. Past time slots if date is today in local time.
    """
    raw_date = request.GET.get("date") or request.POST.get("date")
    target_date = None
    if raw_date:
        for fmt in ("%Y-%m-%d", "%d.%m.%Y", "%d/%m/%Y"):
            try:
                target_date = datetime.strptime(raw_date.strip(), fmt).date()
                break
            except ValueError:
                pass
    if not target_date:
        target_date = timezone.localdate()

    # Base operating slots for TOCHKA sanctuary (09:00 - 22:00)
    all_slots = [
        "09:00", "10:00", "11:00", "12:00", "13:00",
        "14:00", "15:00", "16:00", "17:00", "18:00",
        "19:00", "20:00", "21:00", "22:00"
    ]

    # Check if the entire day is blocked
    is_day_blocked = BlockedTimeSlot.objects.filter(
        date=target_date,
        time_slot__in=["ALL_DAY", "all_day", "весь день", ""]
    ).exists()

    # Specific blocked time slots
    blocked_slot_objs = BlockedTimeSlot.objects.filter(date=target_date).exclude(time_slot__in=["ALL_DAY", "all_day", "весь день", ""])
    blocked_times = {b.time_slot.strip()[:5]: (b.reason or "Занято") for b in blocked_slot_objs if b.time_slot}

    # Active bookings on that date
    active_bookings = Booking.objects.filter(
        booking_date=target_date
    ).exclude(status=Booking.Status.CANCELLED)

    booked_times = {}
    for b in active_bookings:
        if b.booking_time:
            time_str = b.booking_time.strip()[:5]
            booked_times[time_str] = b.service_name or "Запись"

    # Current local time check if booking for today
    now_local = timezone.localtime(timezone.now())
    is_today = (target_date == now_local.date())
    current_time_str = now_local.strftime("%H:%M")

    slots_data = []
    for slot in all_slots:
        is_booked = slot in booked_times
        is_explicitly_blocked = is_day_blocked or (slot in blocked_times)
        is_past = is_today and (slot <= current_time_str)

        is_available = not is_booked and not is_explicitly_blocked and not is_past

        reason = None
        if is_day_blocked:
            reason = "day_off"
        elif is_explicitly_blocked:
            reason = blocked_times.get(slot, "blocked")
        elif is_booked:
            reason = "booked"
        elif is_past:
            reason = "past"

        slots_data.append({
            "time": slot,
            "available": is_available,
            "reason": reason,
        })

    return JsonResponse({
        "success": True,
        "date": target_date.strftime("%Y-%m-%d"),
        "is_day_blocked": is_day_blocked,
        "slots": slots_data,
    })


def send_callmebot_notification(booking, homepage=None):
    """
    Sends an automated notification directly to the master's WhatsApp via CallMeBot API.
    100% free and instant.
    """
    if not homepage:
        homepage = HomePage.objects.first()
    if not homepage:
        return False

    phone = (homepage.whatsapp_notify_phone or "").strip()
    apikey = (homepage.whatsapp_notify_apikey or "").strip()

    if not phone or not apikey:
        logger.info("CallMeBot: whatsapp_notify_phone or whatsapp_notify_apikey is not configured in Wagtail.")
        return False

    # Normalize master phone: digits only (e.g. 995591226145)
    clean_master_phone = re.sub(r"[^\d]", "", phone)

    clean_client_phone = re.sub(r"[^\d]", "", booking.client_phone)

    # Format notification message
    lines = [
        "🔔 *НОВАЯ ЗАПИСЬ В TOCHKA!*",
        "",
        f"👤 *Имя:* {booking.client_name}",
        f"📞 *Телефон:* {booking.client_phone}",
        f"💆 *Ритуал:* {booking.service_name or 'Не указан'}",
        f"📅 *Дата:* {booking.booking_date}",
        f"⏰ *Время:* {booking.booking_time or 'Не указано'}",
        f"📝 *Пожелания:* {booking.notes or '—'}",
        "",
        f"💬 *Написать клиенту в WhatsApp:*",
        f"https://wa.me/{clean_client_phone}",
    ]
    message_text = "\n".join(lines)
    encoded_text = urllib.parse.quote(message_text)

    # CallMeBot WhatsApp API Endpoint
    url = f"https://api.callmebot.com/whatsapp.php?phone={urllib.parse.quote(clean_master_phone)}&text={encoded_text}&apikey={apikey}"

    try:
        req = urllib.request.Request(
            url,
            headers={"User-Agent": "TOCHKA-Sanctuary-Booking/1.0"},
        )
        with urllib.request.urlopen(req, timeout=4) as response:
            res_body = response.read().decode("utf-8", errors="ignore")
            logger.info("CallMeBot notification sent: %s", res_body)
            return True
    except Exception as err:
        logger.error("CallMeBot notification failed: %s", err)
        return False


@csrf_exempt
@require_POST
def create_booking_api(request):
    try:
        if request.content_type == "application/json":
            data = json.loads(request.body.decode("utf-8"))
        else:
            data = request.POST.dict()

        client_name = data.get("client_name") or data.get("name", "").strip()
        client_phone = data.get("client_phone") or data.get("phone", "").strip()
        client_email = data.get("client_email") or data.get("email", "").strip()

        if not client_name or not client_phone:
            return JsonResponse(
                {"success": False, "error": "Name and phone number are required."},
                status=400,
            )

        # Parse date
        raw_date = data.get("booking_date") or data.get("date")
        booking_date = None
        if raw_date:
            for fmt in ("%Y-%m-%d", "%d.%m.%Y", "%d/%m/%Y"):
                try:
                    booking_date = datetime.strptime(raw_date, fmt).date()
                    break
                except ValueError:
                    pass
        if not booking_date:
            booking_date = datetime.today().date()

        notes = data.get("notes", "").strip()

        # Service / Ritual lookup
        service_val = data.get("service_id") or data.get("service") or data.get("ritual")
        service_obj = None
        service_name = ""
        if service_val:
            if str(service_val).isdigit():
                service_obj = Ritual.objects.filter(id=int(service_val)).first()
            if not service_obj:
                service_obj = Ritual.objects.filter(name__icontains=str(service_val).strip()).first()
            if service_obj:
                service_name = service_obj.name
            else:
                service_name = str(service_val).strip()

        booking = Booking.objects.create(
            client_name=client_name,
            client_phone=client_phone,
            client_email=client_email,
            service=service_obj,
            service_name=service_name,
            booking_date=booking_date,
            booking_time=data.get("booking_time") or data.get("time", "12:00"),
            notes=notes,
            status=Booking.Status.PENDING,
        )

        homepage = HomePage.objects.first()

        # Trigger automatic WhatsApp notification to master in background
        wa_sent = False
        try:
            wa_sent = send_callmebot_notification(booking, homepage)
        except Exception as e:
            logger.error("Error triggering CallMeBot: %s", e)

        # Prepare direct chat link for client (Click-to-Chat with salon)
        salon_whatsapp = (homepage.loc_whatsapp_url if homepage else "https://wa.me/message/vopznnayguwab1")
        salon_telegram = (homepage.loc_telegram_url if homepage else "https://t.me/tochka_batumi")
        salon_instagram = (homepage.loc_instagram_url if homepage else "https://www.instagram.com/toch._ka/")

        # Pre-filled WhatsApp message for the client if they click to open salon WhatsApp
        client_prefill_msg = f"Здравствуйте! Я оформил(а) запись на сайте TOCHKA:\nИмя: {client_name}\nРитуал: {service_name or 'Массаж'}\nДата: {booking.booking_date}\nВремя: {booking.booking_time}"
        if "wa.me/" in salon_whatsapp and "?" not in salon_whatsapp:
            direct_wa_url = f"{salon_whatsapp}?text={urllib.parse.quote(client_prefill_msg)}"
        else:
            direct_wa_url = salon_whatsapp

        return JsonResponse(
            {
                "success": True,
                "booking_id": booking.id,
                "whatsapp_notified": wa_sent,
                "message": f"Спасибо, {client_name}! Ваша заявка на {booking.booking_date} принята. Мастер свяжется с вами в течение 15 минут.",
                "direct_whatsapp_url": direct_wa_url,
                "direct_telegram_url": salon_telegram,
                "direct_instagram_url": salon_instagram,
            },
            status=201,
        )

    except Exception as e:
        return JsonResponse({"success": False, "error": str(e)}, status=500)


@csrf_exempt
@require_POST
def create_certificate_order_api(request):
    """
    Dedicated API endpoint for ordering gift certificates.
    Sends instant WhatsApp alert to master via CallMeBot and prepares WhatsApp Click-to-Chat.
    """
    try:
        if request.content_type == "application/json":
            data = json.loads(request.body.decode("utf-8"))
        else:
            data = request.POST.dict()

        buyer_name = (data.get("buyer_name") or data.get("name") or "").strip()
        buyer_phone = (data.get("buyer_phone") or data.get("phone") or "").strip()
        recipient_name = (data.get("recipient_name") or data.get("recipient") or "").strip()
        cert_value = (data.get("certificate_value") or data.get("amount") or "$45").strip()
        delivery_type = (data.get("delivery_type") or "Электронный (WhatsApp / Telegram)").strip()
        wishes = (data.get("wishes") or data.get("notes") or "").strip()

        if not buyer_name or not buyer_phone:
            return JsonResponse(
                {"success": False, "error": "Имя покупателя и контактный телефон обязательны."},
                status=400,
            )

        notes_full = (
            f"🎁 ЗАКАЗ СЕРТИФИКАТА\n"
            f"Номинал: {cert_value}\n"
            f"Покупатель: {buyer_name}\n"
            f"Телефон: {buyer_phone}\n"
            f"Получатель: {recipient_name or 'Не указан'}\n"
            f"Формат: {delivery_type}\n"
            f"Пожелания: {wishes or '—'}"
        )

        booking = Booking.objects.create(
            client_name=buyer_name,
            client_phone=buyer_phone,
            service_name=f"🎁 Сертификат: {cert_value}",
            booking_date=timezone.localdate(),
            booking_time="00:00",
            notes=notes_full,
            status=Booking.Status.PENDING,
        )

        homepage = HomePage.objects.first()

        # Send CallMeBot WhatsApp notification to Master
        wa_sent = False
        try:
            if homepage:
                phone = (homepage.whatsapp_notify_phone or "").strip()
                apikey = (homepage.whatsapp_notify_apikey or "").strip()
                if phone and apikey:
                    clean_master_phone = re.sub(r"[^\d]", "", phone)
                    clean_buyer_phone = re.sub(r"[^\d]", "", buyer_phone)
                    lines = [
                        "🎁 *НОВЫЙ ЗАКАЗ ПОДАРОЧНОГО СЕРТИФИКАТА В TOCHKA!*",
                        "",
                        f"💰 *Сертификат:* {cert_value}",
                        f"👤 *Покупатель:* {buyer_name}",
                        f"📞 *Телефон:* {buyer_phone}",
                        f"🎀 *Получатель:* {recipient_name or 'Не указан'}",
                        f"📦 *Формат:* {delivery_type}",
                        f"💌 *Пожелания:* {wishes or '—'}",
                        "",
                        f"💬 *Написать покупателю в WhatsApp:*",
                        f"https://wa.me/{clean_buyer_phone}",
                    ]
                    msg_text = "\n".join(lines)
                    encoded_text = urllib.parse.quote(msg_text)
                    url = f"https://api.callmebot.com/whatsapp.php?phone={urllib.parse.quote(clean_master_phone)}&text={encoded_text}&apikey={apikey}"
                    req = urllib.request.Request(url, headers={"User-Agent": "TOCHKA-Sanctuary-Booking/1.0"})
                    with urllib.request.urlopen(req, timeout=4) as response:
                        res_body = response.read().decode("utf-8", errors="ignore")
                        logger.info("CallMeBot certificate notification sent: %s", res_body)
                        wa_sent = True
        except Exception as e:
            logger.error("Error sending CallMeBot notification for certificate: %s", e)

        # Prepare direct chat link for client (Click-to-Chat with salon)
        salon_whatsapp = (homepage.loc_whatsapp_url if homepage else "https://wa.me/message/vopznnayguwab1")
        salon_telegram = (homepage.loc_telegram_url if homepage else "https://t.me/tochka_batumi")

        client_prefill_msg = (
            f"Здравствуйте! Я хочу приобрести подарочный сертификат TOCHKA:\n"
            f"Номинал: {cert_value}\n"
            f"Покупатель: {buyer_name}\n"
            f"Получатель: {recipient_name or '—'}\n"
            f"Формат: {delivery_type}"
        )
        if "wa.me/" in salon_whatsapp and "?" not in salon_whatsapp:
            direct_wa_url = f"{salon_whatsapp}?text={urllib.parse.quote(client_prefill_msg)}"
        else:
            direct_wa_url = salon_whatsapp

        return JsonResponse(
            {
                "success": True,
                "order_id": booking.id,
                "whatsapp_notified": wa_sent,
                "message": f"Спасибо, {buyer_name}! Ваш заказ на сертификат ({cert_value}) принят. Мы свяжемся с вами в течение 15 минут для отправки/передачи сертификата.",
                "direct_whatsapp_url": direct_wa_url,
                "direct_telegram_url": salon_telegram,
            },
            status=201,
        )

    except Exception as e:
        return JsonResponse({"success": False, "error": str(e)}, status=500)

