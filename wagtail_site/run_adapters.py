#!/usr/bin/env python3
"""
Unified Bot Runner for TOCHKA Massage Studio AI Administrator.
Starts Telegram Bot and/or WhatsApp Bot in background/daemon mode.

Usage:
  python3 run_adapters.py --all           # Run both Telegram and WhatsApp bots
  python3 run_adapters.py --telegram      # Run Telegram bot only
  python3 run_adapters.py --whatsapp      # Run WhatsApp bot (Green API polling) only
"""

import sys
import time
import signal
import threading
import logging
from typing import List

from telegram_adapter import TelegramAdapter
from whatsapp_adapter import WhatsAppAdapter
from openrouter_client import _find_and_load_env

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] [%(name)s] %(message)s",
    datefmt="%H:%M:%S"
)
logger = logging.getLogger("TOCHKA-Adapters")


def run_telegram(tg_adapter: TelegramAdapter):
    try:
        tg_adapter.run_polling()
    except Exception as e:
        logger.error(f"Telegram worker crashed: {e}", exc_info=True)


def run_whatsapp(wa_adapter: WhatsAppAdapter):
    try:
        wa_adapter.run_polling()
    except Exception as e:
        logger.error(f"WhatsApp worker crashed: {e}", exc_info=True)


def main():
    _find_and_load_env()
    
    args = sys.argv[1:]
    run_tg = True
    run_wa = True

    if "--telegram" in args or "-t" in args:
        run_tg = True
        run_wa = False
    elif "--whatsapp" in args or "-w" in args:
        run_tg = False
        run_wa = True
    elif "--all" in args or "-a" in args:
        run_tg = True
        run_wa = True

    threads: List[threading.Thread] = []

    print("\n" + "═" * 70)
    print(" 🌿 TOCHKA MASSAGE SANCTUARY — AI ADAPTERS MULTI-RUNNER 🌿")
    print("═" * 70)

    tg_adapter = TelegramAdapter() if run_tg else None
    wa_adapter = WhatsAppAdapter() if run_wa else None

    if tg_adapter:
        if tg_adapter.tg.is_configured:
            t_tg = threading.Thread(target=run_telegram, args=(tg_adapter,), name="TelegramWorker", daemon=True)
            threads.append(t_tg)
            t_tg.start()
            logger.info("Telegram worker thread started.")
        else:
            logger.warning("Telegram Bot Token is not configured in .env (skipping).")

    if wa_adapter:
        if wa_adapter.wa.is_configured and wa_adapter.wa.provider == "greenapi":
            t_wa = threading.Thread(target=run_whatsapp, args=(wa_adapter,), name="WhatsAppWorker", daemon=True)
            threads.append(t_wa)
            t_wa.start()
            logger.info("WhatsApp (Green API) worker thread started.")
        elif wa_adapter.wa.is_configured:
            logger.info(f"WhatsApp provider '{wa_adapter.wa.provider}' configured for Webhook mode (Django /api/ai/whatsapp/webhook/).")
        else:
            logger.warning("WhatsApp credentials not configured in .env (skipping polling).")

    if not threads:
        print("\n⚠️ Ни один из адаптеров не был запущен в режиме polling.")
        print("Проверьте настройки в .env:")
        print("  - Для Telegram: TELEGRAM_BOT_TOKEN=\"...\"")
        print("  - Для WhatsApp (Green API): WHATSAPP_GREENAPI_INSTANCE=\"...\", WHATSAPP_GREENAPI_TOKEN=\"...\"")
        print("  - Или используйте вебхуки Django: /api/ai/telegram/webhook/ и /api/ai/whatsapp/webhook/")
        return

    print("\n⚡ Сервисы запущены. Для остановки нажмите Ctrl+C.\n")

    try:
        while True:
            time.sleep(1)
    except (KeyboardInterrupt, SystemExit):
        print("\n🛑 Остановка всех адаптеров...")


if __name__ == "__main__":
    main()
