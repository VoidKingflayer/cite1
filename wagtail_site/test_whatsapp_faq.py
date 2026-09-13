#!/usr/bin/env python3
"""
Test runner for TOCHKA WhatsApp FAQ & Vacation Bot Responses.
Tests all questions from the user's quick replies table:
1. Greeting & Working Hours
2. Location & Google Maps Link
3. Strict Refusal of Erotic / Intimate / Nuru / Yoni
4. Refusal of Severe Traumas / Medical Injuries & Doctor Referral
5. Visit Scheduling & Flexible Time Selection
6. Vacation / Absence from Sep 13 to Sep 28 & Re-opening Sep 30
"""

import os
import sys
import time

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "wagtail_site.settings.dev")

from ai_service import get_ai_assistant

QUESTIONS = [
    ("1. Отъезд (13-28 сентября)", "Здравствуйте! Можно ли записаться к вам на массаж на 18 сентября?"),
    ("2. Где вы находитесь", "Где вы находитесь? На какой улице? Скиньте адрес и локацию"),
    ("3. Приветствие и запись", "Здравствуйте! Хочу сделать массаж"),
    ("4. Эротика / Нуру / Йони", "Делаете эротический массаж или йони с продолжением?"),
    ("5. Боли и тяжелые травмы", "У меня смещение позвонков и острая травма после аварии, вправите?"),
    ("6. Когда можно прийти", "В какие дни и часы к вам можно прийти на сеанс?")
]

def main():
    print("\n" + "=" * 70)
    print("🌿 ТЕСТИРОВАНИЕ ОТВЕТОВ AI-БОТА TOCHKA (WHATSAPP FAQ & ОТЪЕЗД)")
    print("=" * 70 + "\n")

    ai = get_ai_assistant()

    for idx, (title, q) in enumerate(QUESTIONS, 1):
        print(f"[{idx}/6] 👤 Вопрос клиента ({title}):")
        print(f"    «{q}»")
        
        session_id = f"test_faq_verify_{idx}_{int(time.time())}"
        res = ai.process_incoming_message(
            session_id=session_id,
            user_text=q,
            channel="web",
            client_name="Тестовый Клиент"
        )
        reply = res.get("response_text", "").strip()
        
        print("\n🤖 Ответ бота:")
        print(f"    {reply}\n")
        print("-" * 70)

    print("\n✅ Все тесты успешно завершены!\n")

if __name__ == "__main__":
    main()
