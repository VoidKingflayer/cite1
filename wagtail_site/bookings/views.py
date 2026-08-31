import json
import re
import urllib.parse
import urllib.request
import logging
from datetime import datetime, timedelta
from django.utils import timezone
from django.shortcuts import render
from django.http import JsonResponse, HttpResponse
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


# =========================================================================
# Wagtail Admin Interactive Schedule & Quick Edit Views
# =========================================================================
from django.contrib.auth.decorators import login_required
from django.shortcuts import render, get_object_or_404
from datetime import date, timedelta


@login_required
def admin_schedule_view(request):
    """
    Dedicated visual schedule & daily booking dashboard for Wagtail Admin.
    """
    raw_date = request.GET.get("date")
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

    today = timezone.localdate()
    yesterday = target_date - timedelta(days=1)
    tomorrow = target_date + timedelta(days=1)
    prev_week = target_date - timedelta(days=7)
    next_week = target_date + timedelta(days=7)

    # Operating hours: 09:00 - 22:00
    all_hours = [
        "09:00", "10:00", "11:00", "12:00", "13:00",
        "14:00", "15:00", "16:00", "17:00", "18:00",
        "19:00", "20:00", "21:00", "22:00"
    ]

    # Blocked slots on target_date
    is_day_blocked = BlockedTimeSlot.objects.filter(
        date=target_date,
        time_slot__in=["ALL_DAY", "all_day", "весь день", ""]
    ).exists()
    day_block_obj = BlockedTimeSlot.objects.filter(
        date=target_date,
        time_slot__in=["ALL_DAY", "all_day", "весь день", ""]
    ).first()

    blocked_slots = BlockedTimeSlot.objects.filter(date=target_date).exclude(
        time_slot__in=["ALL_DAY", "all_day", "весь день", ""]
    )
    blocked_dict = {b.time_slot.strip()[:5]: b for b in blocked_slots if b.time_slot}

    # Bookings on target date
    day_bookings = Booking.objects.filter(booking_date=target_date).order_by("booking_time")
    bookings_by_time = {}
    for b in day_bookings:
        t_key = (b.booking_time or "").strip()[:5]
        bookings_by_time.setdefault(t_key, []).append(b)

    # Statistics for the date
    total_count = day_bookings.count()
    pending_count = day_bookings.filter(status=Booking.Status.PENDING).count()
    confirmed_count = day_bookings.filter(status=Booking.Status.CONFIRMED).count()
    completed_count = day_bookings.filter(status=Booking.Status.COMPLETED).count()
    cancelled_count = day_bookings.filter(status=Booking.Status.CANCELLED).count()

    # Calculate estimated revenue for confirmed & completed
    est_revenue = 0
    for b in day_bookings:
        if b.status in (Booking.Status.CONFIRMED, Booking.Status.COMPLETED):
            # Extract price if available from service or notes
            if b.service and b.service.price_1:
                try:
                    p_val = int(re.sub(r"[^\d]", "", str(b.service.price_1)))
                    est_revenue += p_val
                except Exception:
                    pass
            else:
                est_revenue += 120  # standard 120 GEL fallback

    # Build timeline slot objects
    now_local = timezone.localtime(timezone.now())
    is_today = (target_date == today)
    current_time_str = now_local.strftime("%H:%M")

    timeline = []
    for h in all_hours:
        b_list = bookings_by_time.get(h, [])
        is_blocked = is_day_blocked or (h in blocked_dict)
        block_obj = day_block_obj if is_day_blocked else blocked_dict.get(h)
        is_past = is_today and (h <= current_time_str)

        timeline.append({
            "time": h,
            "bookings": b_list,
            "is_blocked": is_blocked,
            "block_obj": block_obj,
            "is_past": is_past,
            "is_free": (not b_list or all(b.status == Booking.Status.CANCELLED for b in b_list)) and not is_blocked,
        })

    # Available rituals for quick-booking modal
    rituals = Ritual.objects.all().order_by("order")

    # Recent 15 bookings for quick table reference
    recent_bookings = Booking.objects.all().order_by("-created_at")[:15]

    weekdays_ru = ["Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота", "Воскресенье"]
    months_ru = ["", "января", "февраля", "марта", "апреля", "мая", "июня", "июля", "августа", "сентября", "октября", "ноября", "декабря"]
    date_formatted = f"{target_date.day} {months_ru[target_date.month]} {target_date.year}, {weekdays_ru[target_date.weekday()]}"

    context = {
        "target_date": target_date,
        "target_date_str": target_date.strftime("%Y-%m-%d"),
        "date_formatted": date_formatted,
        "is_today": is_today,
        "today_str": today.strftime("%Y-%m-%d"),
        "yesterday_str": yesterday.strftime("%Y-%m-%d"),
        "tomorrow_str": tomorrow.strftime("%Y-%m-%d"),
        "prev_week_str": prev_week.strftime("%Y-%m-%d"),
        "next_week_str": next_week.strftime("%Y-%m-%d"),
        "timeline": timeline,
        "is_day_blocked": is_day_blocked,
        "day_block_obj": day_block_obj,
        "total_count": total_count,
        "pending_count": pending_count,
        "confirmed_count": confirmed_count,
        "completed_count": completed_count,
        "cancelled_count": cancelled_count,
        "est_revenue": est_revenue,
        "rituals": rituals,
        "recent_bookings": recent_bookings,
    }
    return render(request, "bookings/admin/schedule.html", context)


@login_required
@require_POST
def admin_update_booking_status_api(request):
    """
    AJAX endpoint to change booking status from table or timeline in 1 click.
    """
    booking_id = request.POST.get("booking_id")
    new_status = request.POST.get("status")

    if not booking_id or not new_status:
        return JsonResponse({"success": False, "error": "Missing booking_id or status"}, status=400)

    booking = get_object_or_404(Booking, id=booking_id)
    if new_status not in [s[0] for s in Booking.Status.choices]:
        return JsonResponse({"success": False, "error": "Invalid status"}, status=400)

    booking.status = new_status
    booking.save(update_fields=["status", "updated_at"])

    return JsonResponse({
        "success": True,
        "booking_id": booking.id,
        "status": booking.status,
        "status_display": booking.get_status_display(),
        "badge_html": booking.status_badge,
    })


@login_required
@require_POST
def admin_quick_create_booking_api(request):
    """
    AJAX endpoint to quickly book a client directly into a chosen time slot.
    """
    client_name = request.POST.get("client_name", "").strip()
    client_phone = request.POST.get("client_phone", "").strip()
    client_email = request.POST.get("client_email", "").strip()
    service_id = request.POST.get("service_id")
    service_name = request.POST.get("service_name", "").strip()
    booking_date_str = request.POST.get("booking_date", "").strip()
    booking_time = request.POST.get("booking_time", "").strip()
    notes = request.POST.get("notes", "").strip()
    status = request.POST.get("status", Booking.Status.CONFIRMED)

    if not client_name or not client_phone or not booking_date_str or not booking_time:
        return JsonResponse({"success": False, "error": "Заполните имя, телефон, дату и время."}, status=400)

    try:
        b_date = datetime.strptime(booking_date_str, "%Y-%m-%d").date()
    except ValueError:
        return JsonResponse({"success": False, "error": "Некорректный формат даты."}, status=400)

    ritual = None
    if service_id:
        ritual = Ritual.objects.filter(id=service_id).first()
        if ritual and not service_name:
            service_name = ritual.name_ru or ritual.name

    booking = Booking.objects.create(
        client_name=client_name,
        client_phone=client_phone,
        client_email=client_email,
        service=ritual,
        service_name=service_name or "Массаж",
        booking_date=b_date,
        booking_time=booking_time,
        notes=notes,
        status=status,
    )

    return JsonResponse({
        "success": True,
        "booking_id": booking.id,
        "message": f"Запись #{booking.id} для {client_name} на {booking_time} успешно создана!",
    })


@login_required
@require_POST
def admin_toggle_block_slot_api(request):
    """
    AJAX endpoint to block or unblock time slots or days off.
    """
    action = request.POST.get("action", "block")  # "block" or "unblock"
    date_str = request.POST.get("date", "").strip()
    time_slot = request.POST.get("time_slot", "").strip()
    reason = request.POST.get("reason", "Занято / Недоступно").strip()

    if not date_str:
        return JsonResponse({"success": False, "error": "Укажите дату."}, status=400)

    try:
        target_date = datetime.strptime(date_str, "%Y-%m-%d").date()
    except ValueError:
        return JsonResponse({"success": False, "error": "Неверный формат даты."}, status=400)

    if action == "unblock":
        slot_id = request.POST.get("slot_id")
        if slot_id:
            BlockedTimeSlot.objects.filter(id=slot_id).delete()
        else:
            BlockedTimeSlot.objects.filter(date=target_date, time_slot=time_slot).delete()
        return JsonResponse({"success": True, "message": "Слот разблокирован."})

    else:
        slot, created = BlockedTimeSlot.objects.get_or_create(
            date=target_date,
            time_slot=time_slot or "ALL_DAY",
            defaults={"reason": reason},
        )
        if not created and reason:
            slot.reason = reason
            slot.save(update_fields=["reason"])

        return JsonResponse({"success": True, "message": f"Слот {time_slot} заблокирован."})


def booking_confirmation_view(request):
    """
    Dedicated Booking Confirmation & Thank You Page.
    Crucial for:
    1. Google Ads / GA4 / Meta Pixel / Yandex Direct conversion tracking and goal measurement.
    2. Client UX: Add to Google Calendar in 1-click, WhatsApp/Telegram click-to-chat, directions on Google Maps, guest guidelines.
    """
    homepage = HomePage.objects.first()
    
    # Extract query parameters
    raw_id = request.GET.get("id") or request.GET.get("booking_id")
    client_name = (request.GET.get("name") or request.GET.get("client_name") or "").strip()
    client_phone = (request.GET.get("phone") or request.GET.get("client_phone") or "").strip()
    service_name = (request.GET.get("service") or request.GET.get("ritual") or request.GET.get("service_name") or "").strip()
    raw_date = (request.GET.get("date") or request.GET.get("booking_date") or "").strip()
    raw_time = (request.GET.get("time") or request.GET.get("booking_time") or "").strip()
    lang = (request.GET.get("lang") or "ru").strip().lower()
    if lang not in ["ru", "en", "ka", "tr", "ar"]:
        lang = "ru"

    booking = None
    if raw_id and str(raw_id).isdigit():
        booking = Booking.objects.filter(id=int(raw_id)).first()

    if booking:
        booking_id = booking.id
        client_name = client_name or booking.client_name
        client_phone = client_phone or booking.client_phone
        service_name = service_name or booking.service_name or (booking.service.name if booking.service else "Сеанс массажа")
        booking_date = booking.booking_date
        booking_time = booking.booking_time or "12:00"
    else:
        booking_id = raw_id if raw_id else (int(timezone.now().timestamp()) % 100000)
        booking_date = None
        if raw_date:
            for fmt in ("%Y-%m-%d", "%d.%m.%Y", "%d/%m/%Y"):
                try:
                    booking_date = datetime.strptime(raw_date, fmt).date()
                    break
                except ValueError:
                    pass
        if not booking_date:
            booking_date = timezone.localdate()
        booking_time = raw_time if raw_time else "12:00"
        if not client_name:
            client_name = "Дорогой гость" if lang == "ru" else ("ძვირფასო სტუმარო" if lang == "ka" else "Valued Guest")
        if not service_name:
            service_name = "Расслабляющий массаж" if lang == "ru" else ("რელაქს მასაჟი" if lang == "ka" else "Relaxing Massage")

    booking_time_clean = booking_time[:5] if booking_time else "12:00"
    booking_reference = f"TK-{booking_date.strftime('%Y%m%d')}-{booking_id}"

    # Calculate Google Calendar URL
    # Combine date and time
    try:
        time_parts = booking_time_clean.split(":")
        hour = int(time_parts[0])
        minute = int(time_parts[1]) if len(time_parts) > 1 else 0
        start_dt = datetime(booking_date.year, booking_date.month, booking_date.day, hour, minute)
        end_dt = start_dt + timedelta(minutes=75)  # 60m session + 15m relaxation
        gcal_start = start_dt.strftime("%Y%m%dT%H%M%S")
        gcal_end = end_dt.strftime("%Y%m%dT%H%M%S")
    except Exception:
        gcal_start = booking_date.strftime("%Y%m%dT120000")
        gcal_end = booking_date.strftime("%Y%m%dT131500")

    gcal_title = f"💆 Массаж в TOCHKA: {service_name}"
    gcal_location = "46 Luka Asatiani St, Batumi, Georgia (Студия TOCHKA)"
    gcal_details = (
        f"Сеанс массажа в студии TOCHKA Батуми.\n"
        f"Ритуал: {service_name}\n"
        f"Мастер: Анна Колосова (авторская техника)\n"
        f"Номер брони: {booking_reference}\n"
        f"Адрес: ул. Лука Асатиани, 46, Батуми\n"
        f"Тел / WhatsApp: +995 591 226 145\n"
        f"Сайт: https://tochkabatumi.ge/"
    )

    gcal_url = (
        f"https://calendar.google.com/calendar/render?action=TEMPLATE"
        f"&text={urllib.parse.quote(gcal_title)}"
        f"&dates={gcal_start}/{gcal_end}"
        f"&details={urllib.parse.quote(gcal_details)}"
        f"&location={urllib.parse.quote(gcal_location)}"
        f"&ctz=Asia/Tbilisi"
    )

    # Salon Contact Links
    salon_whatsapp = (homepage.loc_whatsapp_url if homepage else "https://wa.me/message/vopznnayguwab1")
    salon_telegram = (homepage.loc_telegram_url if homepage else "https://t.me/tochka_batumi")
    salon_instagram = (homepage.loc_instagram_url if homepage else "https://www.instagram.com/toch._ka/")
    salon_phone = (homepage.loc_phone if homepage else "+995 591 226 145")
    salon_address = (homepage.loc_address if homepage else "ул. Лука Асатиани, 46, Батуми")
    salon_gmaps = (homepage.loc_gmaps_url if homepage else "https://maps.app.goo.gl/xjAE2yyKdikHBroi9")

    # Client pre-filled WhatsApp click-to-chat link
    wa_text = f"Здравствуйте, Анна! Я оформил(а) запись на сайте TOCHKA (бронь {booking_reference}):\nРитуал: {service_name}\nДата: {booking_date.strftime('%d.%m.%Y')}\nВремя: {booking_time_clean}"
    if "wa.me/" in salon_whatsapp and "?" not in salon_whatsapp:
        direct_wa_url = f"{salon_whatsapp}?text={urllib.parse.quote(wa_text)}"
    elif "?" in salon_whatsapp:
        direct_wa_url = f"{salon_whatsapp}&text={urllib.parse.quote(wa_text)}"
    else:
        direct_wa_url = f"https://wa.me/995591226145?text={urllib.parse.quote(wa_text)}"

    # Estimated value in GEL / USD for conversion tracking
    conversion_value_gel = 120
    conversion_value_usd = 45
    if "90" in service_name:
        conversion_value_gel = 170
        conversion_value_usd = 65

    context = {
        "booking_id": booking_id,
        "booking_reference": booking_reference,
        "client_name": client_name,
        "client_phone": client_phone,
        "service_name": service_name,
        "booking_date": booking_date,
        "booking_date_iso": booking_date.strftime("%Y-%m-%d"),
        "booking_date_formatted": booking_date.strftime("%d.%m.%Y"),
        "booking_time": booking_time_clean,
        "gcal_url": gcal_url,
        "direct_wa_url": direct_wa_url,
        "direct_tg_url": salon_telegram,
        "direct_ig_url": salon_instagram,
        "salon_phone": salon_phone,
        "salon_address": salon_address,
        "salon_gmaps": salon_gmaps,
        "current_lang": lang,
        "conversion_value_gel": conversion_value_gel,
        "conversion_value_usd": conversion_value_usd,
    }

    return render(request, "bookings/booking_confirmed.html", context)



