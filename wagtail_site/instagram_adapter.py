"""
Instagram Direct Messages (Meta Graph API) Adapter for TOCHKA Massage Studio.
Supports:
- Sending and receiving Instagram Direct Messages
- Meta Graph API Webhook verification & message parsing
- Channel identifier: 'instagram'
- Session ID format: 'ig_{instagram_scoped_id}'
"""

import os
import json
import logging
import urllib.request
import urllib.parse
import urllib.error
from typing import Dict, Any, Optional

from openrouter_client import _find_and_load_env

logger = logging.getLogger(__name__)


class InstagramClient:
    """
    Client for Instagram Messaging via Meta Graph API.
    """

    GRAPH_API_BASE = "https://graph.facebook.com/v20.0"

    def __init__(self):
        _find_and_load_env()
        self.access_token = os.getenv("INSTAGRAM_ACCESS_TOKEN") or os.getenv("META_GRAPH_TOKEN")
        self.page_id = os.getenv("INSTAGRAM_PAGE_ID") or os.getenv("META_PAGE_ID")
        self.verify_token = os.getenv("INSTAGRAM_VERIFY_TOKEN", "tochka_ig_verify_token")

        try:
            from home.models import AISettings
            settings = AISettings.objects.first()
            if settings:
                if not self.access_token and getattr(settings, "instagram_access_token", None):
                    self.access_token = settings.instagram_access_token
                if not self.page_id and getattr(settings, "instagram_page_id", None):
                    self.page_id = settings.instagram_page_id
                if getattr(settings, "instagram_verify_token", None):
                    self.verify_token = settings.instagram_verify_token
        except Exception:
            pass

    @property
    def is_configured(self) -> bool:
        return bool(self.access_token and self.page_id)

    def send_message(self, recipient_ig_id: str, text: str) -> Dict[str, Any]:
        """
        Sends a direct message to an Instagram user by their IGSID.
        """
        clean_id = recipient_ig_id.replace("ig_", "").strip()
        if not clean_id:
            return {"success": False, "error": "Invalid Instagram recipient ID"}

        if not self.is_configured:
            logger.info("Instagram token not configured in .env (running in simulation/sandbox mode). Message: %s", text[:50])
            return {
                "success": True,
                "simulated": True,
                "message": "Message saved to chat thread (Instagram API token not configured yet)."
            }

        url = f"{self.GRAPH_API_BASE}/me/messages?access_token={self.access_token}"
        payload = {
            "recipient": {"id": clean_id},
            "message": {"text": text}
        }

        req = urllib.request.Request(
            url,
            data=json.dumps(payload).encode("utf-8"),
            headers={"Content-Type": "application/json"},
            method="POST"
        )
        try:
            with urllib.request.urlopen(req, timeout=15) as resp:
                data = json.loads(resp.read().decode("utf-8"))
                return {"success": True, "data": data}
        except urllib.error.HTTPError as err:
            body = err.read().decode("utf-8", errors="ignore")
            logger.error("Instagram API error %s: %s", err.code, body)
            return {"success": False, "error": body}
        except Exception as e:
            logger.error("Instagram network error: %s", e)
            return {"success": False, "error": str(e)}


class InstagramAdapter:
    """
    Processes incoming Instagram Webhooks and interacts with AI/Memory.
    """

    def __init__(self):
        self.client = InstagramClient()

    def process_webhook_payload(self, payload: Dict[str, Any]) -> Dict[str, Any]:
        """
        Parses incoming Meta Instagram webhook event.
        """
        from ai_service import get_ai_assistant
        ai = get_ai_assistant()

        try:
            entries = payload.get("entry", [])
            for entry in entries:
                messaging_events = entry.get("messaging", [])
                for event in messaging_events:
                    sender_id = event.get("sender", {}).get("id")
                    message = event.get("message", {})
                    text = message.get("text", "").strip()

                    # Skip echo/bot messages
                    if message.get("is_echo") or not text or not sender_id:
                        continue

                    session_id = f"ig_{sender_id}"
                    client_name = f"IG User {sender_id[:6]}"

                    res = ai.process_incoming_message(
                        session_id=session_id,
                        user_text=text,
                        channel="instagram",
                        client_name=client_name,
                    )

                    if res.get("success") and res.get("response_text") and not res.get("manual_mode"):
                        self.client.send_message(sender_id, res["response_text"])

            return {"success": True}
        except Exception as e:
            logger.error("Error processing Instagram webhook: %s", e)
            return {"success": False, "error": str(e)}


_ig_adapter_instance = None


def get_instagram_adapter() -> InstagramAdapter:
    """Returns singleton InstagramAdapter instance."""
    global _ig_adapter_instance
    if _ig_adapter_instance is None:
        _ig_adapter_instance = InstagramAdapter()
    return _ig_adapter_instance
