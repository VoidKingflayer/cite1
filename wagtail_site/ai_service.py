"""
Unified AI Assistant Service for TOCHKA Massage Studio (Batumi).
Provides multi-channel message processing (Telegram, WhatsApp, Web, CLI):
- Persistent chat memory in SQLite
- Real-time studio tool calling (slots, bookings, services catalog, live time)
- Google AI Studio (Gemini / Gemma) with automatic fallback to OpenRouter
- Customer contact and preferences profile tracking
"""

import os
import json
import logging
from typing import Dict, Any, List, Optional, Tuple

from openrouter_client import OpenRouterClient, OpenRouterModels, Conversation
from gemini_client import GeminiClient, GeminiModels
from ai_tools import STUDIO_TOOLS_SCHEMA, STUDIO_TOOL_HANDLERS
from chat_memory import ChatMemoryManager

logger = logging.getLogger(__name__)

# Studio Knowledge & System Prompt
STUDIO_KNOWLEDGE = """
Информация о студии массажа TOCHKA (Батуми):
- Адрес: Батуми, ул. Лука Асатиани, 46 (46 Luka Asatiani St, Batumi)
- Телефон / WhatsApp: +995 591 226 145
- Часы работы: ежедневно с 09:00 до 23:00
- 👤 ЕДИНСТВЕННЫЙ МАСТЕР И ОСНОВАТЕЛЬ: Анна Колосова.
  (В студии работает РОВНО ОДИН мастер — сама основатель Анна Колосова. Все сеансы проводит исключительно она лично по авторской технике непрерывного контакта. Других мастеров в салоне нет, что гарантирует 100% приватность, персональное внимание и авторское качество).

Услуги и цены (В СТУДИИ РОВНО 4 ВИДА МАССАЖА):
1. Расслабляющий (Релакс) массаж: 60 мин — 120 GEL ($45), 90 мин — 170 GEL ($65)
   (плавные, мягкие движения, лёгкая проработка мышц, снятие стресса и глубокий отдых)
2. Классический массаж тела: 60 мин — 120 GEL ($45), 90 мин — 170 GEL ($65)
   (средний ритм, глубокая проработка мышц, улучшение тонуса и кровообращения)
3. Спортивный массаж: 60 мин — 120 GEL ($45), 90 мин — 170 GEL ($65)
   (интенсивная работа с мышцами, фасциями и триггерными точками, снятие сильных зажимов)
4. Лимфодренажный массаж: 60 мин — 120 GEL ($45), 90 мин — 170 GEL ($65)
   (мягкая работа по ходу лимфотока, снятие отечности, детокс и легкость)

ВАЖНОЕ ПРИМЕЧАНИЕ:
- В студии TOCHKA доступны ИСКЛЮЧИТЕЛЬНО эти 4 вида массажа тела.
- Массажа в 4 руки, массажа лица и отдельных фокус-зон в меню НЕТ. Если гость спрашивает о них, вежливо поясни, что таких услуг нет, и предложи один из 4 ритуалов.
- Все массажи выполняет лично основатель Анна Колосова.

Специальные акции и условия:
- Скидка 10% на первый визит по промокоду FIRST10.
- Скидка 20% на каждый 5-й массаж по программе лояльности.
- Подарочные сертификаты на любую сумму.
- Оплата: наличные (USD, GEL), банковские карты, перевод.
"""

def load_dynamic_ai_config() -> Dict[str, Any]:
    """
    Loads real-time settings directly from Wagtail Admin (home_aisettings table in SQLite).
    Any changes saved in Wagtail Admin instantly take effect without restarting!
    """
    config = {
        "ai_enabled": True,
        "system_prompt": STUDIO_KNOWLEDGE,
        "knowledge_base": STUDIO_KNOWLEDGE,
        "custom_instructions": "",
        "telegram_welcome_message": "",
        "model_name": "gemini-3.5-flash-lite",
        "temperature": 0.4,
        "tools_enabled": True,
        "telegram_bot_token": "",
        "telegram_admin_usernames": "Kingmachineflayer, Ankolosova",
        "first_visit_discount": "10%",
        "first_visit_code": "FIRST10",
        "full_system_prompt": "",
    }

    try:
        from chat_memory import DEFAULT_DB_PATH
        import sqlite3
        conn = sqlite3.connect(DEFAULT_DB_PATH)
        conn.row_factory = sqlite3.Row
        cur = conn.cursor()
        cur.execute("SELECT * FROM home_aisettings LIMIT 1")
        row = cur.fetchone()
        if row:
            config["ai_enabled"] = bool(row["ai_enabled"]) if row["ai_enabled"] is not None else True
            config["system_prompt"] = row["ai_system_prompt"] or ""
            config["knowledge_base"] = row["studio_knowledge_base"] or ""
            config["custom_instructions"] = row["ai_custom_instructions"] or ""
            config["telegram_welcome_message"] = row["telegram_welcome_message"] or ""
            config["model_name"] = row["ai_model_name"] or "gemini-3.5-flash-lite"
            config["temperature"] = float(row["ai_temperature"]) if row["ai_temperature"] is not None else 0.4
            config["tools_enabled"] = bool(row["ai_tools_enabled"]) if row["ai_tools_enabled"] is not None else True
            config["telegram_bot_token"] = row["telegram_bot_token"] or ""
            config["telegram_admin_usernames"] = row["telegram_admin_usernames"] or "Kingmachineflayer, Ankolosova"
            config["first_visit_discount"] = row["first_visit_discount"] or "10%"
            config["first_visit_code"] = row["first_visit_code"] or "FIRST10"
        conn.close()
    except Exception as e:
        logger.debug("Could not read home_aisettings from DB, using defaults: %s", e)

    # Build composite system prompt
    base_prompt = config["system_prompt"] if config["system_prompt"] else get_system_prompt()
    kb_text = config["knowledge_base"] if config["knowledge_base"] else STUDIO_KNOWLEDGE
    notes_text = f"\n\nОперативные указания руководителя:\n{config['custom_instructions']}" if config["custom_instructions"] else ""

    if "{STUDIO_KNOWLEDGE}" in base_prompt:
        full_prompt = base_prompt.replace("{STUDIO_KNOWLEDGE}", kb_text) + notes_text
    elif "База знаний студии:" in base_prompt:
        full_prompt = base_prompt + notes_text
    else:
        full_prompt = f"{base_prompt}\n\nБаза знаний студии:\n{kb_text}{notes_text}"

    config["full_system_prompt"] = full_prompt
    return config


def is_admin_user(username: Optional[str]) -> bool:
    """Checks if the Telegram username is an authorized admin/master."""
    if not username:
        return False
    clean = username.lower().replace("@", "").strip()
    cfg = load_dynamic_ai_config()
    raw_admins = cfg.get("telegram_admin_usernames", "Kingmachineflayer, Ankolosova")
    admins = [a.lower().replace("@", "").strip() for a in raw_admins.split(",") if a.strip()]
    # Default fallbacks
    admins.extend(["kingmachineflayer", "ankolosova"])
    return clean in admins


def get_system_prompt() -> str:
    return load_dynamic_ai_config()["full_system_prompt"]


SYSTEM_PROMPT = get_system_prompt()


def clean_ai_response(text: str) -> str:
    """
    Cleans any leaked reasoning, chain-of-thought, or draft bullets from the final output.
    """
    if not text:
        return ""

    import re
    # 1. Strip think/thought tags
    text = re.sub(r"<think>.*?</think>", "", text, flags=re.DOTALL | re.IGNORECASE)
    text = re.sub(r"<thought>.*?</thought>", "", text, flags=re.DOTALL | re.IGNORECASE)

    # 2. Check if output contains reasoning preamble (User asks, Draft, Tone, Context)
    lines = text.split("\n")
    cleaned_lines = []
    in_scratchpad = False

    for line in lines:
        stripped = line.strip()
        # Markers indicating model scratchpad / internal deliberation
        if any(stripped.startswith(prefix) for prefix in (
            "*   User", "* User", "*   Context", "* Context", "*   Tone", "* Tone",
            "*   Draft", "* Draft", "*   Action", "* Action", "*   Plan", "* Plan",
            "Thought:", "Reasoning:", "Thinking:", "*   Note", "* Note",
            "*   Clarify", "*   Acknowledge", "*   Maintain", "*   Steer",
            "*   The studio", "*   Acknowledge", "*   Gently"
        )):
            in_scratchpad = True
            continue

        if in_scratchpad:
            # Look for transition to actual polite reply
            if any(stripped.startswith(g) for g in (
                "Здравствуйте", "Добрый день", "Привет", "Доброе утро", "Добрый вечер",
                "Hello", "Hi", "გამარჯობა", "Merhaba", "مرحبا", "Да,", "Нет,", "К сожалению"
            )):
                in_scratchpad = False
                cleaned_lines.append(line)
            elif not stripped.startswith(("*", "-", "1.", "2.", "3.", "•")) and len(stripped) > 0 and not stripped.endswith(":"):
                in_scratchpad = False
                cleaned_lines.append(line)
        else:
            cleaned_lines.append(line)

    result = "\n".join(cleaned_lines).strip()
    return result if result else text.strip()



class AIAssistantService:
    """
    Singleton / Reusable AI Assistant Service.
    Handles message processing, fallback mechanics, database tool execution, and session management.
    """

    def __init__(self, db_path: Optional[str] = None):
        self.memory = ChatMemoryManager(db_path=db_path) if db_path else ChatMemoryManager()
        
        self.gemini_client: Optional[GeminiClient] = None
        self.openrouter_client: Optional[OpenRouterClient] = None

        self._init_clients()

    def _init_clients(self):
        """Initializes API clients safely."""
        try:
            self.gemini_client = GeminiClient()
        except Exception as e:
            logger.warning(f"Could not initialize GeminiClient: {e}")

        try:
            self.openrouter_client = OpenRouterClient()
        except Exception as e:
            logger.warning(f"Could not initialize OpenRouterClient: {e}")

    def process_incoming_message(
        self,
        session_id: str,
        user_text: str,
        channel: str = "web",
        client_name: Optional[str] = None,
        client_phone: Optional[str] = None,
        metadata: Optional[Dict[str, Any]] = None,
    ) -> Dict[str, Any]:
        """
        Main entry point for processing incoming messages from any channel.
        
        Returns a dict:
        {
            "success": bool,
            "response_text": str,
            "session_id": str,
            "channel": str,
            "tools_called": list,
            "engine": str,
            "error": Optional[str]
        }
        """
        if not user_text or not user_text.strip():
            return {
                "success": False,
                "response_text": "Пустое сообщение.",
                "session_id": session_id,
                "channel": channel,
                "tools_called": [],
                "engine": "none",
                "error": "Empty message",
            }

        # 0. Load live dynamic configuration from Wagtail Admin
        ai_cfg = load_dynamic_ai_config()
        if not ai_cfg.get("ai_enabled", True):
            return {
                "success": True,
                "response_text": "Здравствуйте! 🌿 В данный момент онлайн-консультант отключен в панели управления. Вы можете связаться с мастером напрямую по телефону / WhatsApp: +995 591 226 145 или выбрать время на сайте tochkabatumi.ge ✨",
                "session_id": session_id,
                "channel": channel,
                "tools_called": [],
                "engine": "disabled_by_admin",
                "error": None,
            }

        target_model = ai_cfg.get("model_name") or "gemini-3.5-flash-lite"
        temperature = ai_cfg.get("temperature", 0.4)
        use_tools = ai_cfg.get("tools_enabled", True)

        # 1. Update client profile if contact info provided
        if client_name or client_phone or metadata:
            self.memory.update_client_profile(
                session_id=session_id,
                name=client_name,
                phone=client_phone,
                metadata=metadata,
            )

        # Check if caller is authorized studio admin / master
        caller_username = (metadata or {}).get("username")
        is_admin = is_admin_user(caller_username) or bool((metadata or {}).get("is_admin"))

        admin_instructions = ""
        if is_admin:
            u_name = caller_username or "Анна"
            admin_instructions = f"""

👑 РЕЖИМ УПРАВЛЕНИЯ СТУДИЕЙ ДЛЯ АДМИНИСТРАТОРА/МАСТЕРА (@{u_name}):
Ты общаешься с основателем/мастером Анной Колосовой или управляющим студии.
У тебя есть полный доступ к управлению заявками и расписанием:
- `admin_list_bookings`: просмотр списка заявок с фильтром по статусу (pending, confirmed, completed, cancelled, all) и дате (today, tomorrow, YYYY-MM-DD, all).
- `admin_update_booking_status`: изменить статус заявки (подтвердить -> 'confirmed', завершить -> 'completed', отменить -> 'cancelled') по ID заявки.
- `admin_get_schedule`: подробное расписание на день по часовым слотам с 09:00 до 23:00.
- `admin_block_slot`: закрыть/заблокировать конкретный слот на конкретную дату и время (перерыв, дела).

Отвечай четко, структурированно и профессионально, как персональный бизнес-ассистент руководителя студии. Всегда указывай ID заявок, имена, телефоны клиентов, выбранные услуги и статус.
"""

        # 2. Record user message in DB
        self.memory.add_message(
            session_id=session_id,
            role="user",
            content=user_text.strip(),
            channel=channel,
        )

        # 3. Load conversation context from SQLite with dynamic system prompt
        effective_system_prompt = ai_cfg["full_system_prompt"] + admin_instructions
        conversation = self.memory.get_conversation(
            session_id=session_id,
            system_prompt=effective_system_prompt,
            limit=20,
        )

        tools_called_log = []

        def tracking_handler(tool_name, base_handler):
            def wrapper(args):
                tools_called_log.append({"tool": tool_name, "args": args})
                logger.info(f"AI Tool Call [{tool_name}]: {args}")
                return base_handler(args)
            return wrapper

        wrapped_handlers = {
            name: tracking_handler(name, handler)
            for name, handler in STUDIO_TOOL_HANDLERS.items()
        }

        # 4. Try Google Gemini first (ultra-fast, 1500 free req/day)
        reply_text = ""
        engine_used = ""
        last_error = None

        if self.gemini_client:
            try:
                if use_tools:
                    reply_text = self.gemini_client.chat_with_tools(
                        messages=conversation,
                        tools=STUDIO_TOOLS_SCHEMA,
                        tool_handlers=wrapped_handlers,
                        model=target_model if "gemini" in target_model or "gemma" in target_model else None,
                        temperature=temperature,
                    )
                else:
                    reply_text = self.gemini_client.chat(
                        messages=conversation,
                        model=target_model if "gemini" in target_model or "gemma" in target_model else None,
                        temperature=temperature,
                    )
                engine_used = f"Google Gemini ({self.gemini_client.default_model})"
            except Exception as gemini_err:
                logger.error(f"Gemini API error for session {session_id}: {gemini_err}. Trying OpenRouter fallback...")
                last_error = str(gemini_err)

        # 5. Fallback to OpenRouter if Gemini fails or is unconfigured
        if not reply_text and self.openrouter_client:
            try:
                if use_tools:
                    reply_text = self.openrouter_client.chat_with_tools(
                        messages=conversation,
                        tools=STUDIO_TOOLS_SCHEMA,
                        tool_handlers=wrapped_handlers,
                        model=target_model if "/" in target_model else None,
                        temperature=temperature,
                    )
                else:
                    reply_text = self.openrouter_client.chat(
                        messages=conversation,
                        model=target_model if "/" in target_model else None,
                        temperature=temperature,
                    )
                engine_used = f"OpenRouter ({self.openrouter_client.default_model})"
            except Exception as openrouter_err:
                logger.error(f"OpenRouter API error for session {session_id}: {openrouter_err}")
                last_error = str(openrouter_err)

        if reply_text:
            reply_text = clean_ai_response(reply_text)

        if not reply_text:
            reply_text = (
                "Здравствуйте! 🌿 Извините, сейчас соединение с сервером немного затруднено. "
                "Вы можете сразу написать нашему мастеру напрямую: +995 591 226 145 или выбрать удобное время на сайте tochkabatumi.ge"
            )
            success = False
        else:
            success = True

        # 6. Save assistant response to DB
        self.memory.add_message(
            session_id=session_id,
            role="assistant",
            content=reply_text,
            tool_calls=tools_called_log if tools_called_log else None,
            channel=channel,
        )

        return {
            "success": success,
            "response_text": reply_text,
            "session_id": session_id,
            "channel": channel,
            "tools_called": tools_called_log,
            "engine": engine_used,
            "error": last_error if not success else None,
        }

    def reset_session(self, session_id: str):
        """Clears memory for a specific chat session."""
        self.memory.clear_session(session_id)

    def get_session_history(self, session_id: str, limit: int = 30):
        """Retrieves raw messages for inspection."""
        with self.memory._get_connection() as conn:
            cur = conn.cursor()
            cur.execute(
                "SELECT role, content, tool_calls_json, created_at FROM ai_chat_messages WHERE session_id = ? ORDER BY id ASC LIMIT ?",
                (session_id, limit)
            )
            return [dict(r) for r in cur.fetchall()]


# Module-level default singleton
_assistant_service: Optional[AIAssistantService] = None


def get_ai_assistant() -> AIAssistantService:
    global _assistant_service
    if _assistant_service is None:
        _assistant_service = AIAssistantService()
    return _assistant_service
