#!/usr/bin/env python3
"""
Interactive CLI for TOCHKA AI Administrator.
Supports:
- Official Google Gemini direct API (1,500 free req/day, ultra-fast)
- OpenRouter API (Gemma, Nemotron, DeepSeek, etc.)
- Real-time tool calling (queries SQLite/Django database for slots, catalog, and bookings)
- Persistent conversation memory across sessions (saved to SQLite)
"""

import os
import sys
import time
import json
from typing import Optional, Union

# Import core modules
from openrouter_client import OpenRouterClient, OpenRouterModels, Conversation
from gemini_client import GeminiClient, GeminiModels
from ai_tools import STUDIO_TOOLS_SCHEMA, STUDIO_TOOL_HANDLERS
from chat_memory import ChatMemoryManager


# ANSI Colors for luxury terminal interface
class Colors:
    RESET = "\033[0m"
    BOLD = "\033[1m"
    DIM = "\033[2m"
    ITALIC = "\033[3m"
    
    GOLD = "\033[38;2;225;195;140m"
    PLATINUM = "\033[38;2;230;235;242m"
    BRIGHT_CYAN = "\033[38;2;120;210;255m"
    GREEN = "\033[38;2;120;220;140m"
    PURPLE = "\033[38;2;180;140;255m"
    RED = "\033[38;2;255;110;110m"
    GRAY = "\033[38;2;140;145;155m"
    DARK_BG = "\033[48;2;22;25;30m"


DEFAULT_STUDIO_KNOWLEDGE = """
Информация о студии массажа TOCHKA (Батуми):
- Адрес: Батуми, ул. Лука Асатиани, 46 (46 Luka Asatiani St, Batumi)
- Телефон / WhatsApp: +995 591 226 145
- Часы работы: ежедневно с 09:00 до 23:00
- Основатель и ведущий мастер: Анна Колосова (авторская техника непрерывного контакта)

Услуги и цены (В СТУДИИ РОВНО 4 ВИДА МАССАЖА):
1. Расслабляющий (Релакс) массаж: 60 мин — 120 GEL ($45), 90 мин — 170 GEL ($65)
2. Классический массаж тела: 60 мин — 120 GEL ($45), 90 мин — 170 GEL ($65)
3. Спортивный массаж: 60 мин — 120 GEL ($45), 90 мин — 170 GEL ($65)
4. Лимфодренажный массаж: 60 мин — 120 GEL ($45), 90 мин — 170 GEL ($65)

ВАЖНО: В меню есть ТОЛЬКО эти 4 вида массажа (массажа лица и в 4 руки нет).

Специальные акции и условия:
- Скидка 10% на первый визит по промокоду FIRST10.
- Скидка 20% на каждый 5-й массаж по программе лояльности.
- Подарочные сертификаты на любую сумму.
- Оплата: наличные (USD, GEL), банковские карты, перевод.
"""

DEFAULT_SYSTEM_PROMPT = f"""Ты — заботливый, экспертный и деликатный администратор премиальной студии массажа TOCHKA в Батуми.

Твоя цель:
- Приветливо и профессионально встречать гостей, отвечать на вопросы, помогать с выбором ритуала.
- В студии ровно 4 вида массажа тела по единой стоимости: 60 мин — 120 GEL ($45), 90 мин — 170 GEL ($65).
- 🕒 ВАЖНО: ВСЕГДА, когда речь заходит о записи, свободных окнах или когда клиент упоминает относительные даты ("сегодня", "завтра", "в эту субботу", "через пару часов"), ПЕРВЫМ ДЕЛОМ вызови инструмент `get_current_datetime`, чтобы узнать точную дату, время и день недели в Батуми. Никогда не угадывай дату без вызова `get_current_datetime`!
- При запросе о свободных окнах ОБЯЗАТЕЛЬНО используй инструмент `check_available_slots` с вычисленной точной датой (YYYY-MM-DD).
- При просьбе записаться запрашивай имя, телефон, желаемый массаж, дату и время, а затем вызывай инструмент `create_booking_in_db`.
- При вопросах о текущих записях используй `get_client_bookings`.

Правила общения:
- Тон: вежливый, теплый, спокойный, премиальный, ненавязчивый.
- Всегда отвечай на том языке, на котором обратился клиент (Русский, English, ქართული, Türkçe, العربية).
- Не пиши слишком длинный текст: 2-4 предложения или четкий список, чтобы клиенту было удобно читать в мессенджере.
- Запрещено выводить внутренние рассуждения или черновики.

База знаний студии:
{DEFAULT_STUDIO_KNOWLEDGE}
"""


class AIChatCLI:
    def __init__(self, session_id: str = "cli_admin_user"):
        self.gemini_client = GeminiClient()
        self.openrouter_client = OpenRouterClient()
        
        # Primary client is Google Gemini Direct (1500 free req/day)
        self.active_client: Union[GeminiClient, OpenRouterClient] = self.gemini_client
        self.engine_name = "Google AI Studio Direct API (1 500 req/day)"
        self.active_model = GeminiModels.GEMMA_4_31B_IT

        self.memory = ChatMemoryManager()
        self.session_id = session_id
        self.system_prompt = DEFAULT_SYSTEM_PROMPT
        self.tools_enabled = True

        # Load existing session from persistent DB
        self.conversation = self.memory.get_conversation(self.session_id, system_prompt=self.system_prompt)

    def print_banner(self):
        print(f"\n{Colors.GOLD}{'=' * 72}{Colors.RESET}")
        print(f"{Colors.GOLD}{Colors.BOLD}   🌿 TOCHKA BATUMI — ИИ АДМИНИСТРАТОР (GEMINI + OPENROUTER) 🌿{Colors.RESET}")
        print(f"{Colors.GOLD}{'=' * 72}{Colors.RESET}")
        print(f"{Colors.GRAY}⚡ Движок:{Colors.RESET} {Colors.GREEN}{self.engine_name}{Colors.RESET}")
        print(f"{Colors.GRAY}📦 Модель:{Colors.RESET} {Colors.BRIGHT_CYAN}{self.active_model}{Colors.RESET}")
        print(f"{Colors.GRAY}💾 Сессия памяти:{Colors.RESET} {Colors.PURPLE}{self.session_id}{Colors.RESET} ({len(self.conversation.messages)} сообщений в истории)")
        print(f"{Colors.GRAY}🛠 Инструменты БД:{Colors.RESET} {Colors.GREEN}ВКЛЮЧЕНЫ (слоты, бронирование, каталог){Colors.RESET}")
        print(f"{Colors.GRAY}💡 Команды: {Colors.PLATINUM}/help, /model, /clear, /tools, /history, /exit{Colors.RESET}")
        print(f"{Colors.GOLD}{'=' * 72}{Colors.RESET}\n")

    def print_help(self):
        print(f"\n{Colors.GOLD}--- СПИСОК ДОСТУПНЫХ КОМАНД ---{Colors.RESET}")
        print(f" {Colors.GREEN}/model{Colors.RESET}              - Показать активную модель или список популярных")
        print(f" {Colors.GREEN}/model <номер>{Colors.RESET}      - Переключить модель нейросети (1-8)")
        print(f" {Colors.GREEN}/tools{Colors.RESET}              - Включить/выключить доступ к вызову функций БД")
        print(f" {Colors.GREEN}/clear{Colors.RESET}              - Сбросить историю текущего диалога")
        print(f" {Colors.GREEN}/history{Colors.RESET}            - Показать сохраненную историю переписки")
        print(f" {Colors.GREEN}/prompt{Colors.RESET}             - Посмотреть системный промпт администратора")
        print(f" {Colors.GREEN}/exit{Colors.RESET} или {Colors.GREEN}/quit{Colors.RESET}      - Завершить работу CLI\n")

    def list_popular_models(self):
        print(f"\n{Colors.GOLD}--- ДОСТУПНЫЕ МОДЕЛИ И ДВИЖКИ ---{Colors.RESET}")
        models = [
            ("1", "Google Gemma 4 31B (Direct Google AI Studio)", "gemini_direct", GeminiModels.GEMMA_4_31B_IT),
            ("2", "Google Gemini 3.5 Flash Lite (Google API)", "gemini_direct", GeminiModels.GEMINI_3_5_FLASH_LITE),
            ("3", "Google Gemma 4 31B (OpenRouter Free)", "openrouter", OpenRouterModels.GOOGLE_GEMMA_31B_FREE),
            ("4", "NVIDIA Nemotron 3.5 (OpenRouter Free)", "openrouter", OpenRouterModels.NVIDIA_NEMOTRON_FREE),
            ("5", "MiniMax M3 (OpenRouter Free)", "openrouter", OpenRouterModels.MINIMAX_M3_FREE),
            ("6", "GLM 5.2 (OpenRouter Free)", "openrouter", OpenRouterModels.ZAI_GLM_FREE),
            ("7", "OpenAI GPT-4o Mini (OpenRouter)", "openrouter", OpenRouterModels.GPT_4O_MINI),
            ("8", "DeepSeek V3 (OpenRouter)", "openrouter", OpenRouterModels.DEEPSEEK_V3),
        ]
        for num, title, engine, model_id in models:
            is_active = " (АКТИВНА)" if model_id == self.active_model else ""
            print(f" {Colors.GREEN}[{num}]{Colors.RESET} {Colors.PLATINUM}{title}{Colors.RESET} -> {Colors.BRIGHT_CYAN}{model_id}{Colors.RESET}{Colors.GOLD}{is_active}{Colors.RESET}")
        print(f"\n{Colors.GRAY}Чтобы переключить, введите: {Colors.GREEN}/model <номер>{Colors.RESET}\n")

    def handle_model_switch(self, arg: str):
        choice = arg.strip()
        if choice == "1" or "gemma" in choice.lower():
            self.active_client = self.gemini_client
            self.engine_name = "Google AI Studio Direct API (1 500 req/day)"
            self.active_model = GeminiModels.GEMMA_4_31B_IT
            self.gemini_client.set_model(self.active_model)
            print(f"{Colors.GREEN}✅ Переключено на:{Colors.RESET} {Colors.BRIGHT_CYAN}Google AI Studio ({self.active_model}){Colors.RESET}\n")
            return
        elif choice == "2":
            self.active_client = self.gemini_client
            self.engine_name = "Google AI Studio Direct API (1 500 req/day)"
            self.active_model = GeminiModels.GEMINI_3_5_FLASH_LITE
            self.gemini_client.set_model(self.active_model)
            print(f"{Colors.GREEN}✅ Переключено на:{Colors.RESET} {Colors.BRIGHT_CYAN}Google AI Studio ({self.active_model}){Colors.RESET}\n")
            return

        openrouter_map = {
            "3": OpenRouterModels.GOOGLE_GEMMA_31B_FREE,
            "4": OpenRouterModels.NVIDIA_NEMOTRON_FREE,
            "5": OpenRouterModels.MINIMAX_M3_FREE,
            "6": OpenRouterModels.ZAI_GLM_FREE,
            "7": OpenRouterModels.GPT_4O_MINI,
            "8": OpenRouterModels.DEEPSEEK_V3,
        }
        new_model = openrouter_map.get(choice, choice)
        self.active_client = self.openrouter_client
        self.engine_name = "OpenRouter API"
        self.active_model = new_model
        self.openrouter_client.set_model(new_model)
        print(f"{Colors.GREEN}✅ Переключено на OpenRouter:{Colors.RESET} {Colors.BRIGHT_CYAN}{new_model}{Colors.RESET}\n")

    def run(self):
        self.print_banner()

        while True:
            try:
                user_input = input(f"{Colors.BOLD}{Colors.GOLD}Клиент 👤 > {Colors.RESET}").strip()
                
                if not user_input:
                    continue

                if user_input.startswith("/"):
                    cmd_parts = user_input.split(" ", 1)
                    cmd = cmd_parts[0].lower()
                    arg = cmd_parts[1] if len(cmd_parts) > 1 else ""

                    if cmd in ("/exit", "/quit", "/q"):
                        print(f"\n{Colors.GOLD}До свидания! История сохранена в базе данных.{Colors.RESET}")
                        break
                    elif cmd == "/help":
                        self.print_help()
                        continue
                    elif cmd == "/model":
                        if arg:
                            self.handle_model_switch(arg)
                        else:
                            self.list_popular_models()
                        continue
                    elif cmd == "/tools":
                        self.tools_enabled = not self.tools_enabled
                        st = "ВКЛЮЧЕНЫ" if self.tools_enabled else "ВЫКЛЮЧЕНЫ"
                        print(f"{Colors.GREEN}⚙️ Инструменты базы данных: {st}{Colors.RESET}\n")
                        continue
                    elif cmd == "/clear":
                        self.memory.clear_session(self.session_id)
                        self.conversation = self.memory.get_conversation(self.session_id, system_prompt=self.system_prompt)
                        print(f"{Colors.GREEN}🧹 История сессии очищена.{Colors.RESET}\n")
                        continue
                    elif cmd == "/history":
                        print(f"\n{Colors.GOLD}--- ИСТОРИЯ ДИАЛОГА ({len(self.conversation.messages)} сообщений) ---{Colors.RESET}")
                        for m in self.conversation.messages:
                            role = m.get('role', '').upper()
                            color = Colors.PURPLE if role == "SYSTEM" else (Colors.GOLD if role == "USER" else (Colors.BRIGHT_CYAN if role == "TOOL" else Colors.GREEN))
                            print(f"{color}[{role}]:{Colors.RESET} {m.get('content')}\n")
                        continue
                    elif cmd == "/prompt":
                        print(f"\n{Colors.GOLD}--- СИСТЕМНЫЙ ПРОМПТ ---{Colors.RESET}")
                        print(f"{Colors.GRAY}{self.system_prompt}{Colors.RESET}\n")
                        continue
                    else:
                        print(f"{Colors.RED}Неизвестная команда: {cmd}. Введите /help{Colors.RESET}\n")
                        continue

                # Add message to active conversation and SQLite memory
                self.conversation.add_user_message(user_input)
                self.memory.add_message(self.session_id, "user", user_input, channel="cli")

                print(f"\n{Colors.BOLD}{Colors.GREEN}Администратор TOCHKA 🌿:{Colors.RESET} ", end="", flush=True)

                start_time = time.time()
                
                if self.tools_enabled:
                    def logged_handler(func_name, handler):
                        def wrapper(args):
                            print(f"\n{Colors.BRIGHT_CYAN}⚡ [База данных]: Вызов {func_name}({args}){Colors.RESET}")
                            res = handler(args)
                            print(f"{Colors.DIM}{Colors.GRAY}   Результат: {json.dumps(res, ensure_ascii=False)[:120]}...{Colors.RESET}")
                            return res
                        return wrapper

                    wrapped_handlers = {
                        k: logged_handler(k, v) for k, v in STUDIO_TOOL_HANDLERS.items()
                    }

                    reply = self.active_client.chat_with_tools(
                        messages=self.conversation,
                        tools=STUDIO_TOOLS_SCHEMA,
                        tool_handlers=wrapped_handlers,
                        temperature=0.4
                    )
                else:
                    reply = self.active_client.chat(self.conversation)

                # Save assistant reply to memory
                self.memory.add_message(self.session_id, "assistant", reply, channel="cli")

                elapsed = time.time() - start_time
                print(f"{Colors.PLATINUM}{reply}{Colors.RESET}")
                print(f"{Colors.DIM}{Colors.GRAY}[{elapsed:.2f}s | {self.active_model} | {self.engine_name}]{Colors.RESET}\n")

            except (KeyboardInterrupt, EOFError):
                print(f"\n\n{Colors.GOLD}Завершение работы CLI. До свидания!{Colors.RESET}")
                break
            except Exception as e:
                print(f"\n{Colors.RED}❌ Ошибка: {e}{Colors.RESET}\n")


if __name__ == "__main__":
    cli = AIChatCLI()
    cli.run()
