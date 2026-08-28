"""
WhatsApp Multi-Provider Adapter for TOCHKA Massage Studio AI Administrator.
Supports:
1. Green API (QR-based WhatsApp / API Instance — polling daemon & webhook)
2. Meta WhatsApp Cloud API (Official WhatsApp Business API)
3. UltraMsg / Whapi / Generic Webhook gateways
- Automatic provider detection from .env
- E.164 phone normalization
- Persistent chat memory per phone number (session_id = f"wa_{phone}")
- Background polling daemon for local development & zero-config testing
"""

import os
import re
import sys
import time
import json
import logging
import urllib.request
import urllib.parse
import urllib.error
from typing import Dict, Any, Optional, Tuple, List, Union

from ai_service import get_ai_assistant, AIAssistantService
from openrouter_client import _find_and_load_env

logger = logging.getLogger(__name__)


def clean_phone_number(phone: str) -> str:
    """Normalizes phone number to digits only (e.g., +995 591 226 145 -> 995591226145)."""
    digits = re.sub(r"[^\d]", "", str(phone))
    return digits


class WhatsAppClient:
    """
    Unified client supporting Green API, Meta WhatsApp Cloud API, and UltraMsg.
    """

    def __init__(self):
        _find_and_load_env()
        self.provider = os.getenv("WHATSAPP_PROVIDER", "greenapi").lower()

        # 1. Green API credentials
        self.greenapi_instance = os.getenv("WHATSAPP_GREENAPI_INSTANCE") or os.getenv("GREEN_API_INSTANCE_ID")
        self.greenapi_token = os.getenv("WHATSAPP_GREENAPI_TOKEN") or os.getenv("GREEN_API_TOKEN")
        self.greenapi_host = os.getenv("WHATSAPP_GREENAPI_HOST", "https://api.green-api.com")

        # 2. Meta WhatsApp Cloud API credentials
        self.meta_token = os.getenv("WHATSAPP_CLOUD_TOKEN") or os.getenv("META_WHATSAPP_TOKEN")
        self.meta_phone_id = os.getenv("WHATSAPP_PHONE_NUMBER_ID") or os.getenv("META_PHONE_ID")
        self.meta_verify_token = os.getenv("WHATSAPP_VERIFY_TOKEN", "tochka_verify_token")

        # 3. UltraMsg credentials
        self.ultramsg_instance = os.getenv("WHATSAPP_ULTRAMSG_INSTANCE")
        self.ultramsg_token = os.getenv("WHATSAPP_ULTRAMSG_TOKEN")

    @property
    def is_configured(self) -> bool:
        if self.provider == "greenapi":
            return bool(self.greenapi_instance and self.greenapi_token)
        elif self.provider in ("meta", "cloud"):
            return bool(self.meta_token and self.meta_phone_id)
        elif self.provider == "ultramsg":
            return bool(self.ultramsg_instance and self.ultramsg_token)
        return False

    def send_message(self, recipient_phone: str, text: str) -> Dict[str, Any]:
        """
        Sends an outgoing WhatsApp message to a phone number.
        """
        clean_phone = clean_phone_number(recipient_phone)
        if not clean_phone:
            return {"success": False, "error": "Invalid phone number"}

        if self.provider == "greenapi" or (self.greenapi_instance and self.greenapi_token):
            return self._send_greenapi(clean_phone, text)
        elif self.provider in ("meta", "cloud") or (self.meta_token and self.meta_phone_id):
            return self._send_meta_cloud(clean_phone, text)
        elif self.provider == "ultramsg" or (self.ultramsg_instance and self.ultramsg_token):
            return self._send_ultramsg(clean_phone, text)
        else:
            logger.warning("No WhatsApp provider credentials configured in .env")
            return {"success": False, "error": "WhatsApp credentials unconfigured"}

    # -------------------------------------------------------------------------
    # Provider-Specific Senders
    # -------------------------------------------------------------------------

    def _send_greenapi(self, phone: str, text: str) -> Dict[str, Any]:
        """Green API: POST /waInstance{idInstance}/sendMessage/{apiTokenInstance}"""
        chat_id = f"{phone}@c.us" if "@" not in phone else phone
        url = f"{self.greenapi_host}/waInstance{self.greenapi_instance}/sendMessage/{self.greenapi_token}"
        data = {"chatId": chat_id, "message": text}
        return self._http_post(url, data)

    def _send_meta_cloud(self, phone: str, text: str) -> Dict[str, Any]:
        """Meta Cloud API: POST https://graph.facebook.com/v20.0/{phone_id}/messages"""
        url = f"https://graph.facebook.com/v20.0/{self.meta_phone_id}/messages"
        headers = {
            "Authorization": f"Bearer {self.meta_token}",
            "Content-Type": "application/json",
        }
        data = {
            "messaging_product": "whatsapp",
            "recipient_type": "individual",
            "to": phone,
            "type": "text",
            "text": {"body": text},
        }
        return self._http_post(url, data, headers=headers)

    def _send_ultramsg(self, phone: str, text: str) -> Dict[str, Any]:
        """UltraMsg: POST https://api.ultramsg.com/{instance}/messages/chat"""
        url = f"https://api.ultramsg.com/{self.ultramsg_instance}/messages/chat"
        data = {
            "token": self.ultramsg_token,
            "to": phone,
            "body": text,
        }
        return self._http_post(url, data)

    def _http_post(self, url: str, data: Dict[str, Any], headers: Optional[Dict[str, str]] = None, timeout: int = 20) -> Dict[str, Any]:
        req_headers = {"Content-Type": "application/json"}
        if headers:
            req_headers.update(headers)

        payload = json.dumps(data).encode("utf-8")
        req = urllib.request.Request(url, data=payload, headers=req_headers, method="POST")

        try:
            with urllib.request.urlopen(req, timeout=timeout) as resp:
                res_body = resp.read().decode("utf-8")
                return {"success": True, "data": json.loads(res_body) if res_body.startswith("{") else res_body}
        except urllib.error.HTTPError as err:
            err_text = err.read().decode("utf-8", errors="ignore")
            logger.error(f"WhatsApp HTTP error ({err.code}): {err_text}")
            return {"success": False, "error": err_text, "status_code": err.code}
        except Exception as exc:
            logger.error(f"WhatsApp request error: {exc}")
            return {"success": False, "error": str(exc)}

    # -------------------------------------------------------------------------
    # Green API Polling Helpers
    # -------------------------------------------------------------------------

    def greenapi_receive_notification(self) -> Optional[Dict[str, Any]]:
        """Green API: GET /waInstance{idInstance}/receiveNotification/{apiTokenInstance}"""
        if not (self.greenapi_instance and self.greenapi_token):
            return None
        url = f"{self.greenapi_host}/waInstance{self.greenapi_instance}/receiveNotification/{self.greenapi_token}"
        req = urllib.request.Request(url, method="GET")
        try:
            with urllib.request.urlopen(req, timeout=30) as resp:
                raw = resp.read().decode("utf-8")
                return json.loads(raw) if raw else None
        except Exception:
            return None

    def greenapi_delete_notification(self, receipt_id: int) -> bool:
        """Green API: DELETE /waInstance{idInstance}/deleteNotification/{apiTokenInstance}/{receiptId}"""
        if not (self.greenapi_instance and self.greenapi_token):
            return False
        url = f"{self.greenapi_host}/waInstance{self.greenapi_instance}/deleteNotification/{self.greenapi_token}/{receipt_id}"
        req = urllib.request.Request(url, method="DELETE")
        try:
            with urllib.request.urlopen(req, timeout=10) as resp:
                return resp.status in (200, 204)
        except Exception:
            return False


class WhatsAppAdapter:
    """
    Adapter bridging incoming WhatsApp messages with the AI Studio Administrator.
    """

    def __init__(self, assistant: Optional[AIAssistantService] = None):
        self.wa = WhatsAppClient()
        self.ai = assistant or get_ai_assistant()

    def parse_incoming_payload(self, data: Dict[str, Any]) -> Optional[Dict[str, Any]]:
        """
        Parses different webhook payload formats into a unified message structure:
        Returns:
        {
            "sender_phone": "995591226145",
            "sender_name": "Anna",
            "message_text": "Hello",
            "raw_sender": "995591226145@c.us",
            "provider": "greenapi" | "meta" | "ultramsg"
        }
        """
        # 1. Green API Webhook format
        type_webhook = data.get("typeWebhook")
        if type_webhook == "incomingMessageReceived":
            sender_data = data.get("senderData", {})
            sender = sender_data.get("sender", "")
            clean_phone = clean_phone_number(sender)
            msg_data = data.get("messageData", {})
            text_data = msg_data.get("textMessageData", {})
            text = text_data.get("textMessage") or msg_data.get("extendedTextMessageData", {}).get("text", "")
            return {
                "sender_phone": clean_phone,
                "sender_name": sender_data.get("senderName", "") or "Гость WhatsApp",
                "message_text": text.strip(),
                "raw_sender": sender,
                "provider": "greenapi",
            }

        # 2. Meta WhatsApp Cloud API format
        if "object" in data and "entry" in data:
            for entry in data.get("entry", []):
                for change in entry.get("changes", []):
                    val = change.get("value", {})
                    contacts = val.get("contacts", [{}])
                    contact_name = contacts[0].get("profile", {}).get("name", "") if contacts else ""
                    messages = val.get("messages", [])
                    for msg in messages:
                        if msg.get("type") == "text":
                            from_phone = clean_phone_number(msg.get("from", ""))
                            body = msg.get("text", {}).get("body", "")
                            return {
                                "sender_phone": from_phone,
                                "sender_name": contact_name or "Гость WhatsApp",
                                "message_text": body.strip(),
                                "raw_sender": msg.get("from", ""),
                                "provider": "meta",
                            }

        # 3. UltraMsg webhook format
        if "data" in data and "from" in data.get("data", {}):
            d = data["data"]
            from_phone = clean_phone_number(d.get("from", ""))
            return {
                "sender_phone": from_phone,
                "sender_name": d.get("pushname", "") or "Гость WhatsApp",
                "message_text": (d.get("body") or "").strip(),
                "raw_sender": d.get("from", ""),
                "provider": "ultramsg",
            }

        # 4. Generic direct format {"phone": "...", "message": "...", "name": "..."}
        if "phone" in data and ("message" in data or "text" in data):
            phone = clean_phone_number(data.get("phone", ""))
            text = data.get("message") or data.get("text", "")
            return {
                "sender_phone": phone,
                "sender_name": data.get("name", "Гость WhatsApp"),
                "message_text": str(text).strip(),
                "raw_sender": phone,
                "provider": "generic",
            }

        return None

    def process_incoming_message(self, parsed: Dict[str, Any]) -> Dict[str, Any]:
        """
        Feeds incoming message to AI Assistant and sends response back via WhatsApp.
        """
        sender_phone = parsed.get("sender_phone")
        sender_name = parsed.get("sender_name")
        text = parsed.get("message_text")

        if not sender_phone or not text:
            return {"success": False, "error": "Missing sender or text"}

        session_id = f"wa_{sender_phone}"

        logger.info(f"Processing WhatsApp message from {sender_name} ({sender_phone}): {text}")

        # Process through unified AI Service
        result = self.ai.process_incoming_message(
            session_id=session_id,
            user_text=text,
            channel="whatsapp",
            client_name=sender_name,
            client_phone=sender_phone,
            metadata={"whatsapp_raw_sender": parsed.get("raw_sender"), "provider": parsed.get("provider")}
        )

        response_text = result.get("response_text", "")
        if response_text:
            # Send reply via WhatsApp API
            send_res = self.wa.send_message(sender_phone, response_text)
            return {
                "success": True,
                "reply": response_text,
                "send_result": send_res,
                "tools_called": result.get("tools_called", [])
            }

        return {"success": False, "error": "Empty AI response"}

    def run_polling(self, interval: float = 1.0):
        """
        Green API Long-Polling Daemon (ideal for local testing without webhooks).
        """
        print("\n" + "=" * 65)
        print("   🌿 TOCHKA AI WHATSAPP BOT — GREEN API POLLING DAEMON 🌿")
        print("=" * 65)

        if not (self.wa.greenapi_instance and self.wa.greenapi_token):
            print("❌ ОШИБКА: WHATSAPP_GREENAPI_INSTANCE или WHATSAPP_GREENAPI_TOKEN не заданы в .env!")
            print("Добавьте в .env:")
            print("  WHATSAPP_GREENAPI_INSTANCE=\"...\"")
            print("  WHATSAPP_GREENAPI_TOKEN=\"...\"")
            return

        print(f"✅ Green API Instance: {self.wa.greenapi_instance}")
        print("🚀 Служба прослушивания WhatsApp активна. Нажмите Ctrl+C для выхода.\n")

        while True:
            try:
                notif = self.wa.greenapi_receive_notification()
                if not notif or not notif.get("receiptId"):
                    time.sleep(interval)
                    continue

                receipt_id = notif["receiptId"]
                body = notif.get("body", {})

                parsed = self.parse_incoming_payload(body)
                if parsed and parsed.get("message_text"):
                    print(f"💬 Входящее WhatsApp от {parsed['sender_name']} ({parsed['sender_phone']}): {parsed['message_text']}")
                    res = self.process_incoming_message(parsed)
                    print(f"🤖 Ответ ИИ: {res.get('reply', '')[:100]}...\n")

                # Delete processed notification from queue
                self.wa.greenapi_delete_notification(receipt_id)

            except KeyboardInterrupt:
                print("\n🛑 Остановка WhatsApp демона по сигналу пользователя.")
                break
            except Exception as e:
                logger.error(f"WhatsApp polling loop error: {e}")
                time.sleep(3)


# Global adapter instance
_whatsapp_adapter: Optional[WhatsAppAdapter] = None


def get_whatsapp_adapter() -> WhatsAppAdapter:
    global _whatsapp_adapter
    if _whatsapp_adapter is None:
        _whatsapp_adapter = WhatsAppAdapter()
    return _whatsapp_adapter


if __name__ == "__main__":
    logging.basicConfig(level=logging.INFO, format="%(asctime)s [%(levelname)s] %(message)s")
    adapter = WhatsAppAdapter()
    adapter.run_polling()
