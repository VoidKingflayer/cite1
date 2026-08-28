"""
Automated Test Suite for TOCHKA AI Telegram & WhatsApp Adapters and Django Endpoints.
"""

import os
import sys
import json
import unittest

# Ensure Django settings are configured
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "wagtail_site.settings.dev")
import django
django.setup()

from django.test import Client
from ai_service import AIAssistantService, get_ai_assistant
from telegram_adapter import TelegramAdapter, TelegramClient
from whatsapp_adapter import WhatsAppAdapter, WhatsAppClient, clean_phone_number


class TestAIAdapters(unittest.TestCase):

    def setUp(self):
        self.ai = get_ai_assistant()
        self.client = Client()

    def test_phone_cleaner(self):
        self.assertEqual(clean_phone_number("+995 591 226 145"), "995591226145")
        self.assertEqual(clean_phone_number("8 (999) 123-45-67"), "89991234567")
        self.assertEqual(clean_phone_number("995591226145@c.us"), "995591226145")

    def test_ai_service_basic_chat(self):
        session_id = "test_unit_session_1"
        self.ai.reset_session(session_id)

        res = self.ai.process_incoming_message(
            session_id=session_id,
            user_text="Здравствуйте! Сколько стоит классический массаж?",
            channel="test",
            client_name="Тестовый Гость"
        )
        self.assertTrue(res["success"])
        self.assertTrue(len(res["response_text"]) > 10)
        self.assertIn("120", res["response_text"])  # 120 GEL or $45

        # Check history was recorded
        history = self.ai.get_session_history(session_id)
        self.assertEqual(len(history), 2)  # 1 user + 1 assistant

    def test_telegram_adapter_update_handling(self):
        tg = TelegramAdapter(bot_token="123456:dummy_token_test")
        
        # Mock send_message and send_chat_action to avoid real network call
        sent_messages = []
        tg.tg.send_message = lambda chat_id, text, **kwargs: sent_messages.append((chat_id, text))
        tg.tg.send_chat_action = lambda chat_id, action: True

        # 1. Test /start
        update_start = {
            "update_id": 1001,
            "message": {
                "message_id": 1,
                "from": {"id": 999111, "first_name": "Elena", "username": "elena_test"},
                "chat": {"id": 999111, "type": "private"},
                "text": "/start"
            }
        }
        handled = tg.process_update(update_start)
        self.assertTrue(handled)
        self.assertTrue(any("Elena" in msg[1] for msg in sent_messages))

        # 2. Test Contact Sharing
        sent_messages.clear()
        update_contact = {
            "update_id": 1002,
            "message": {
                "message_id": 2,
                "from": {"id": 999111, "first_name": "Elena"},
                "chat": {"id": 999111, "type": "private"},
                "contact": {"phone_number": "+995591226145", "first_name": "Elena", "last_name": "K"}
            }
        }
        handled = tg.process_update(update_contact)
        self.assertTrue(handled)
        self.assertTrue(any("+995591226145" in msg[1] for msg in sent_messages))

        # 3. Test Text Message (query about hours)
        sent_messages.clear()
        update_text = {
            "update_id": 1003,
            "message": {
                "message_id": 3,
                "from": {"id": 999111, "first_name": "Elena"},
                "chat": {"id": 999111, "type": "private"},
                "text": "До скольки вы работаете?"
            }
        }
        handled = tg.process_update(update_text)
        self.assertTrue(handled)
        self.assertTrue(len(sent_messages) > 0)
        self.assertTrue("23:00" in sent_messages[0][1] or "TOCHKA" in sent_messages[0][1])

    def test_whatsapp_adapter_parsing_and_processing(self):
        wa = WhatsAppAdapter()
        sent_wa = []
        wa.wa.send_message = lambda phone, text: sent_wa.append((phone, text)) or {"success": True}

        # 1. Parse Green API format
        green_payload = {
            "typeWebhook": "incomingMessageReceived",
            "instanceData": {"idInstance": 1101},
            "senderData": {
                "sender": "995591226145@c.us",
                "senderName": "Dmitry"
            },
            "messageData": {
                "typeMessage": "textMessage",
                "textMessageData": {"textMessage": "Где вы находитесь?"}
            }
        }
        parsed = wa.parse_incoming_payload(green_payload)
        self.assertIsNotNone(parsed)
        self.assertEqual(parsed["sender_phone"], "995591226145")
        self.assertEqual(parsed["message_text"], "Где вы находитесь?")

        # Process Green API message
        res = wa.process_incoming_message(parsed)
        self.assertTrue(res["success"])
        self.assertTrue(len(sent_wa) > 0)
        self.assertEqual(sent_wa[0][0], "995591226145")
        self.assertTrue("Лука Асатиани" in sent_wa[0][1] or "Батуми" in sent_wa[0][1])

        # 2. Parse Meta WhatsApp Cloud API format
        meta_payload = {
            "object": "whatsapp_business_account",
            "entry": [{
                "id": "123",
                "changes": [{
                    "value": {
                        "messaging_product": "whatsapp",
                        "contacts": [{"profile": {"name": "Maria"}, "wa_id": "995591000000"}],
                        "messages": [{
                            "from": "995591000000",
                            "id": "wamid.123",
                            "type": "text",
                            "text": {"body": "Хочу массаж лица"}
                        }]
                    }
                }]
            }]
        }
        parsed_meta = wa.parse_incoming_payload(meta_payload)
        self.assertIsNotNone(parsed_meta)
        self.assertEqual(parsed_meta["sender_phone"], "995591000000")
        self.assertEqual(parsed_meta["message_text"], "Хочу массаж лица")

    def test_django_ai_endpoints(self):
        # 1. AI Status API
        response = self.client.get("/api/ai/status/")
        self.assertEqual(response.status_code, 200)
        data = response.json()
        self.assertEqual(data["status"], "online")
        self.assertTrue("telegram" in data)
        self.assertTrue("whatsapp" in data)

        # 2. Web AI Chat API
        response = self.client.post(
            "/api/ai/chat/",
            data=json.dumps({"message": "Здравствуйте!", "session_id": "test_web_1"}),
            content_type="application/json"
        )
        self.assertEqual(response.status_code, 200)
        data = response.json()
        self.assertTrue(data["success"])
        self.assertTrue(len(data["response_text"]) > 0)

        # 3. WhatsApp Meta Webhook Challenge (GET)
        response = self.client.get("/api/ai/whatsapp/webhook/?hub.mode=subscribe&hub.verify_token=tochka_verify_token&hub.challenge=test_challenge_123")
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.content.decode("utf-8"), "test_challenge_123")


if __name__ == "__main__":
    unittest.main()
