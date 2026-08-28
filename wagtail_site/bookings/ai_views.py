"""
Django AI API and Webhook Views for Telegram, WhatsApp, and Web Chat.
"""

import os
import json
import logging
from django.http import JsonResponse, HttpResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_POST, require_GET, require_http_methods

from ai_service import get_ai_assistant
from telegram_adapter import get_telegram_adapter
from whatsapp_adapter import get_whatsapp_adapter

logger = logging.getLogger(__name__)


@csrf_exempt
@require_POST
def telegram_webhook_view(request):
    """
    Receives incoming Telegram updates from Telegram Bot API Webhook.
    Endpoint: POST /api/ai/telegram/webhook/
    """
    secret_header = request.headers.get("X-Telegram-Bot-Api-Secret-Token")
    expected_secret = os.getenv("TELEGRAM_WEBHOOK_SECRET")
    if expected_secret and secret_header != expected_secret:
        return JsonResponse({"ok": False, "error": "Unauthorized"}, status=403)

    try:
        data = json.loads(request.body.decode("utf-8"))
        adapter = get_telegram_adapter()
        handled = adapter.process_update(data)
        return JsonResponse({"ok": True, "handled": handled})
    except Exception as e:
        logger.error(f"Telegram webhook handling error: {e}", exc_info=True)
        return JsonResponse({"ok": False, "error": str(e)}, status=500)


@csrf_exempt
@require_http_methods(["GET", "POST"])
def whatsapp_webhook_view(request):
    """
    Unified WhatsApp Webhook for Meta Cloud API, Green API, and UltraMsg.
    Endpoint: /api/ai/whatsapp/webhook/
    - GET: Meta Webhook verification handshake (hub.challenge)
    - POST: Incoming message processing
    """
    adapter = get_whatsapp_adapter()

    # Meta Cloud API Webhook Verification (GET)
    if request.method == "GET":
        mode = request.GET.get("hub.mode")
        token = request.GET.get("hub.verify_token")
        challenge = request.GET.get("hub.challenge")

        verify_token = adapter.wa.meta_verify_token
        if mode == "subscribe" and token == verify_token:
            logger.info("Meta WhatsApp webhook verified successfully.")
            return HttpResponse(challenge, content_type="text/plain")
        else:
            logger.warning(f"Meta WhatsApp webhook verification failed: token={token}")
            return HttpResponse("Forbidden", status=403)

    # Incoming message processing (POST)
    try:
        data = json.loads(request.body.decode("utf-8"))
        parsed = adapter.parse_incoming_payload(data)
        if not parsed:
            return JsonResponse({"success": True, "message": "Ignored or non-text event"})

        result = adapter.process_incoming_message(parsed)
        return JsonResponse(result)
    except Exception as e:
        logger.error(f"WhatsApp webhook handling error: {e}", exc_info=True)
        return JsonResponse({"success": False, "error": str(e)}, status=500)


@csrf_exempt
@require_POST
def web_ai_chat_api_view(request):
    """
    General REST API for web chat widget or external clients.
    Endpoint: POST /api/ai/chat/
    Body: {"session_id": "...", "message": "...", "name": "...", "phone": "..."}
    """
    try:
        if request.content_type == "application/json":
            data = json.loads(request.body.decode("utf-8"))
        else:
            data = request.POST.dict()

        session_id = data.get("session_id") or "web_guest_default"
        message = (data.get("message") or data.get("text") or "").strip()
        client_name = data.get("name") or data.get("client_name")
        client_phone = data.get("phone") or data.get("client_phone")

        if not message:
            return JsonResponse({"success": False, "error": "Message is required"}, status=400)

        ai = get_ai_assistant()
        result = ai.process_incoming_message(
            session_id=session_id,
            user_text=message,
            channel="web",
            client_name=client_name,
            client_phone=client_phone,
        )

        return JsonResponse(result)
    except Exception as e:
        logger.error(f"Web AI chat API error: {e}", exc_info=True)
        return JsonResponse({"success": False, "error": str(e)}, status=500)


@require_GET
def ai_status_api_view(request):
    """
    Status endpoint inspecting AI connectivity and adapter configurations.
    Endpoint: GET /api/ai/status/
    """
    ai = get_ai_assistant()
    tg = get_telegram_adapter().tg
    wa = get_whatsapp_adapter().wa

    recent_sessions = ai.memory.list_recent_sessions(limit=5)

    return JsonResponse({
        "status": "online",
        "gemini_active": bool(ai.gemini_client),
        "openrouter_active": bool(ai.openrouter_client),
        "telegram": {
            "configured": tg.is_configured,
        },
        "whatsapp": {
            "configured": wa.is_configured,
            "provider": wa.provider,
        },
        "recent_sessions_count": len(recent_sessions),
    })
