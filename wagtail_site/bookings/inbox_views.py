"""
Omnichannel Live Inbox & AI Control Center Views for Wagtail Admin.
Handles:
- Centralized real-time conversation monitoring across Telegram, WhatsApp, Instagram, Web
- Granular AI/Manual mode toggling at both channel level and individual session level
- Live message dispatching directly to Telegram, WhatsApp, and Instagram users
"""

import os
import re
import json
import logging
from typing import Dict, Any, Optional
from datetime import datetime

from django.contrib.auth.decorators import login_required
from django.views.decorators.http import require_POST, require_GET
from django.http import JsonResponse, HttpResponse
from django.shortcuts import render, get_object_or_404
from django.utils import timezone

from chat_memory import ChatMemoryManager
from telegram_adapter import TelegramClient
from whatsapp_adapter import WhatsAppClient, clean_phone_number
from instagram_adapter import InstagramClient
from home.models import HomePage, Ritual

logger = logging.getLogger(__name__)


@login_required
def admin_inbox_view(request):
    """
    Main Omnichannel Live Inbox Dashboard.
    """
    memory = ChatMemoryManager()
    stats = memory.get_inbox_stats()
    channel_states = memory.get_all_channel_states()

    selected_channel = request.GET.get("channel", "all")
    selected_ai_mode = request.GET.get("ai_mode", "all")
    search_query = request.GET.get("q", "")

    sessions = memory.get_filtered_sessions(
        channel=selected_channel if selected_channel != "all" else None,
        ai_mode=selected_ai_mode if selected_ai_mode != "all" else None,
        search=search_query,
        limit=50
    )

    active_session_id = request.GET.get("session_id")
    if not active_session_id and sessions:
        active_session_id = sessions[0]["session_id"]

    active_session = None
    active_messages = []
    if active_session_id:
        active_session = memory.get_or_create_session(active_session_id)
        memory.mark_session_read(active_session_id)
        active_messages = memory.get_session_messages(active_session_id)

    rituals = Ritual.objects.all().order_by("order")

    context = {
        "stats": stats,
        "channel_states": channel_states,
        "sessions": sessions,
        "active_session": active_session,
        "active_messages": active_messages,
        "active_session_id": active_session_id,
        "selected_channel": selected_channel,
        "selected_ai_mode": selected_ai_mode,
        "search_query": search_query,
        "rituals": rituals,
    }
    return render(request, "bookings/admin/inbox.html", context)


@login_required
@require_GET
def admin_inbox_get_chats_api(request):
    """
    AJAX endpoint for polling live chat updates.
    """
    memory = ChatMemoryManager()
    channel = request.GET.get("channel", "all")
    ai_mode = request.GET.get("ai_mode", "all")
    search = request.GET.get("q", "")

    sessions = memory.get_filtered_sessions(
        channel=channel if channel != "all" else None,
        ai_mode=ai_mode if ai_mode != "all" else None,
        search=search,
        limit=60
    )
    stats = memory.get_inbox_stats()
    channel_states = memory.get_all_channel_states()

    return JsonResponse({
        "success": True,
        "stats": stats,
        "channel_states": channel_states,
        "chats": sessions,
    })


@login_required
@require_GET
def admin_inbox_get_messages_api(request):
    """
    AJAX endpoint to fetch full message thread for a selected chat.
    """
    session_id = request.GET.get("session_id")
    if not session_id:
        return JsonResponse({"success": False, "error": "Missing session_id"}, status=400)

    memory = ChatMemoryManager()
    memory.mark_session_read(session_id)
    session = memory.get_or_create_session(session_id)
    messages = memory.get_session_messages(session_id, limit=200)

    return JsonResponse({
        "success": True,
        "session": session,
        "messages": messages,
    })


@login_required
@require_POST
def admin_inbox_send_reply_api(request):
    """
    AJAX endpoint for Master to send a manual reply directly to Telegram/WhatsApp/Instagram.
    """
    session_id = request.POST.get("session_id", "").strip()
    text = request.POST.get("text", "").strip()
    auto_manual = request.POST.get("set_manual", "true").lower() in ("true", "1", "yes")

    if not session_id or not text:
        return JsonResponse({"success": False, "error": "Заполните текст сообщения."}, status=400)

    memory = ChatMemoryManager()
    session = memory.get_or_create_session(session_id)
    channel = (session.get("channel") or "telegram").lower()

    dispatch_result = {"success": True}

    # 1. Dispatch to Telegram
    if channel == "telegram" or session_id.startswith("tg_"):
        tg_client = TelegramClient()
        raw_chat_id = session_id.replace("tg_", "").strip()
        if raw_chat_id.lstrip("-").isdigit():
            try:
                chat_id = int(raw_chat_id)
                tg_res = tg_client.send_message(chat_id=chat_id, text=text)
                if not tg_res.get("ok"):
                    dispatch_result = {"success": False, "error": f"Telegram API error: {tg_res.get('description')}"}
            except Exception as e:
                logger.error("Failed to send Telegram manual message to %s: %s", raw_chat_id, e)
                dispatch_result = {"success": False, "error": str(e)}
        else:
            dispatch_result = {"success": True, "simulated": True, "note": "Тестовый ID, сохранено в базе данных"}

    # 2. Dispatch to WhatsApp
    elif channel == "whatsapp" or session_id.startswith("wa_"):
        wa_client = WhatsAppClient()
        phone = session.get("client_phone") or session_id.replace("wa_", "")
        phone_digits = clean_phone_number(phone)
        if phone_digits:
            wa_res = wa_client.send_message(recipient_phone=phone_digits, text=text)
            if not wa_res.get("success"):
                logger.warning("WhatsApp send issue: %s", wa_res.get("error"))
                # If WhatsApp credentials not configured, we still save in history
                if "unconfigured" in str(wa_res.get("error")):
                    dispatch_result = {"success": True, "simulated": True, "note": "WhatsApp не настроен в .env, сообщение сохранено в чате"}
                else:
                    dispatch_result = wa_res

    # 3. Dispatch to Instagram
    elif channel == "instagram" or session_id.startswith("ig_"):
        ig_client = InstagramClient()
        ig_id = session_id.replace("ig_", "")
        ig_res = ig_client.send_message(recipient_ig_id=ig_id, text=text)
        if not ig_res.get("success"):
            dispatch_result = ig_res

    # 4. Save to Persistent DB with role='master'
    memory.add_master_message(session_id=session_id, content=text, set_manual=auto_manual)

    return JsonResponse({
        "success": dispatch_result.get("success", True),
        "error": dispatch_result.get("error"),
        "simulated": dispatch_result.get("simulated", False),
        "session_id": session_id,
        "ai_mode": memory.get_session_ai_mode(session_id),
        "sent_at": timezone.localtime(timezone.now()).strftime("%H:%M"),
        "message": "Сообщение успешно отправлено клиенту!",
    })


@login_required
@require_POST
def admin_inbox_toggle_chat_mode_api(request):
    """
    AJAX endpoint to switch individual chat mode between 'ai' and 'manual'.
    """
    session_id = request.POST.get("session_id")
    target_mode = request.POST.get("mode")  # 'ai' or 'manual'

    if not session_id or not target_mode:
        return JsonResponse({"success": False, "error": "Missing session_id or mode"}, status=400)

    clean_mode = "manual" if target_mode == "manual" else "ai"
    memory = ChatMemoryManager()
    memory.set_session_ai_mode(session_id, clean_mode)

    return JsonResponse({
        "success": True,
        "session_id": session_id,
        "ai_mode": clean_mode,
        "message": f"Режим диалога переключен на: {'👤 Ручной (Мастер)' if clean_mode == 'manual' else '🤖 AI-автопилот'}"
    })


@login_required
@require_POST
def admin_inbox_toggle_channel_mode_api(request):
    """
    AJAX endpoint to switch AI mode for an entire channel or globally ('all').
    """
    channel = request.POST.get("channel", "all").lower()
    enabled_val = request.POST.get("enabled")

    if enabled_val is None:
        return JsonResponse({"success": False, "error": "Missing enabled value"}, status=400)

    enabled = enabled_val.lower() in ("true", "1", "yes")

    memory = ChatMemoryManager()
    memory.set_channel_ai_state(channel, enabled)
    states = memory.get_all_channel_states()

    names = {
        "all": "всех каналов (Global)",
        "telegram": "Telegram",
        "whatsapp": "WhatsApp",
        "instagram": "Instagram",
        "web": "Веб-виджета",
    }
    ch_name = names.get(channel, channel)

    return JsonResponse({
        "success": True,
        "channel": channel,
        "ai_enabled": enabled,
        "states": states,
        "message": f"ИИ-ассистент {'🟢 ВКЛЮЧЕН' if enabled else '🔴 ВЫКЛЮЧЕН'} для {ch_name}!"
    })
