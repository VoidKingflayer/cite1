"""
Google Gemini API Client for Python.
Direct high-speed official Google AI Studio integration with automatic model fallback.
"""

import os
import json
import urllib.request
import urllib.error
import asyncio
import logging
from typing import List, Dict, Any, Optional, Iterator, AsyncIterator, Union

from openrouter_client import Conversation, _find_and_load_env

logger = logging.getLogger(__name__)


class GeminiModels:
    """Official Google Gemini & Gemma Models available on Google AI Studio."""
    GEMINI_3_5_FLASH_LITE = "gemini-3.5-flash-lite"
    GEMINI_3_5_FLASH = "gemini-3.5-flash"
    GEMMA_4_31B_IT = "gemma-4-31b-it"
    GEMINI_3_1_FLASH_LITE = "gemini-3.1-flash-lite"
    GEMINI_3_6_FLASH = "gemini-3.6-flash"


class GeminiClient:
    """
    Direct official Google Gemini AI Studio Client with auto-fallback.
    """
    API_BASE = "https://generativelanguage.googleapis.com/v1beta/models"

    def __init__(
        self,
        api_key: Optional[str] = None,
        default_model: str = GeminiModels.GEMINI_3_5_FLASH_LITE,
        fallback_models: Optional[List[str]] = None,
        timeout: int = 45,
    ):
        _find_and_load_env()
        self.api_key = api_key or os.getenv("GEMINI_API_KEY")
        if not self.api_key:
            raise ValueError(
                "Gemini API Key is required. Set GEMINI_API_KEY in .env or pass api_key='...'"
            )
        self.default_model = default_model
        self.fallback_models = fallback_models or [
            GeminiModels.GEMINI_3_5_FLASH,
            GeminiModels.GEMINI_3_1_FLASH_LITE,
            GeminiModels.GEMMA_4_31B_IT,
        ]
        self.timeout = timeout

    def set_model(self, model_name: str):
        self.default_model = model_name

    def _convert_messages_to_gemini_contents(self, messages: List[Dict[str, Any]]) -> tuple[Optional[str], List[Dict[str, Any]]]:
        """Converts standard message format to Google Gemini format."""
        system_instruction = None
        contents = []

        for msg in messages:
            role = msg.get("role")
            content = msg.get("content", "")

            if role == "system":
                system_instruction = content
            elif role in ("user", "human"):
                contents.append({
                    "role": "user",
                    "parts": [{"text": content}]
                })
            elif role in ("assistant", "model"):
                if "raw_parts" in msg and msg["raw_parts"]:
                    contents.append({
                        "role": "model",
                        "parts": msg["raw_parts"]
                    })
                else:
                    parts = []
                    if content:
                        parts.append({"text": content})
                    if msg.get("tool_calls"):
                        for tc in msg["tool_calls"]:
                            func = tc.get("function", {})
                            args = func.get("arguments", {})
                            if isinstance(args, str):
                                try:
                                    args = json.loads(args)
                                except Exception:
                                    args = {}
                            parts.append({
                                "functionCall": {
                                    "name": func.get("name"),
                                    "args": args
                                }
                            })
                    if parts:
                        contents.append({"role": "model", "parts": parts})
            elif role == "tool":
                func_name = msg.get("name", "tool_result")
                raw_res = msg.get("content", "{}")
                try:
                    res_json = json.loads(raw_res) if isinstance(raw_res, str) else raw_res
                except Exception:
                    res_json = {"result": raw_res}

                contents.append({
                    "role": "user",
                    "parts": [{
                        "functionResponse": {
                            "name": func_name,
                            "response": {"name": func_name, "content": res_json}
                        }
                    }]
                })

        return system_instruction, contents

    def _convert_tools_to_gemini(self, tools: List[Dict[str, Any]]) -> List[Dict[str, Any]]:
        """Converts OpenAI tools schema to Gemini functionDeclarations format."""
        declarations = []
        for t in tools:
            f = t.get("function", t)
            decl = {
                "name": f.get("name"),
                "description": f.get("description", ""),
            }
            if "parameters" in f:
                decl["parameters"] = f["parameters"]
            declarations.append(decl)
        return [{"functionDeclarations": declarations}]

    def _send_request(self, model: str, payload: Dict[str, Any]) -> Dict[str, Any]:
        """Sends POST request to Google Gemini endpoint with retry across fallback models."""
        clean_model = model.replace("models/", "")
        url = f"{self.API_BASE}/{clean_model}:generateContent?key={self.api_key}"

        req = urllib.request.Request(
            url,
            data=json.dumps(payload).encode("utf-8"),
            headers={"Content-Type": "application/json"},
            method="POST"
        )

        with urllib.request.urlopen(req, timeout=self.timeout) as response:
            return json.loads(response.read().decode("utf-8"))

    # =========================================================================
    # Synchronous Chat Completion with Auto-Fallback
    # =========================================================================
    def chat(
        self,
        messages: Union[List[Dict[str, Any]], Conversation],
        model: Optional[str] = None,
        temperature: float = 0.7,
        **kwargs,
    ) -> str:
        msg_list = messages.get_messages() if isinstance(messages, Conversation) else messages
        system_instruction, contents = self._convert_messages_to_gemini_contents(msg_list)

        candidate_models = [model or self.default_model] + [
            m for m in self.fallback_models if m != (model or self.default_model)
        ]

        last_err = None
        for target_model in candidate_models:
            payload: Dict[str, Any] = {
                "contents": contents,
                "generationConfig": {"temperature": temperature}
            }
            if system_instruction and "gemma" not in target_model.lower():
                payload["systemInstruction"] = {"parts": [{"text": system_instruction}]}
            elif system_instruction and "gemma" in target_model.lower():
                # Gemma uses developer message inside contents
                if payload["contents"] and payload["contents"][0]["role"] == "user":
                    user_text = payload["contents"][0]["parts"][0]["text"]
                    payload["contents"][0]["parts"][0]["text"] = f"[System: {system_instruction}]\n\n{user_text}"

            try:
                data = self._send_request(target_model, payload)
                candidates = data.get("candidates", [])
                if not candidates:
                    continue

                parts = candidates[0].get("content", {}).get("parts", [])
                text_parts = [p.get("text", "") for p in parts if "text" in p]
                raw_reply = "".join(text_parts).strip()
                reply_text = self._clean_reasoning(raw_reply)

                if isinstance(messages, Conversation) and reply_text:
                    messages.add_assistant_message(reply_text)

                return reply_text
            except Exception as e:
                logger.warning(f"Model {target_model} failed: {e}. Trying next model...")
                last_err = e
                continue

        raise last_err or RuntimeError("All Gemini models failed.")

    @staticmethod
    def _clean_reasoning(text: str) -> str:
        """Strips out internal monologue, scratchpad, drafts, and thought bullets."""
        if not text:
            return ""
        import re
        text = re.sub(r"<think>.*?</think>", "", text, flags=re.DOTALL | re.IGNORECASE)
        text = re.sub(r"<thought>.*?</thought>", "", text, flags=re.DOTALL | re.IGNORECASE)

        lines = text.split("\n")
        cleaned_lines = []
        in_scratchpad = False

        for line in lines:
            stripped = line.strip()
            if any(stripped.startswith(prefix) for prefix in (
                "*   User", "* User", "*   Context", "* Context", "*   Tone", "* Tone",
                "*   Draft", "* Draft", "*   Action", "* Action", "*   Plan", "* Plan",
                "Thought:", "Reasoning:", "Thinking:", "*   Note", "* Note",
                "*   Clarify", "*   Acknowledge", "*   Maintain", "*   Steer",
                "*   The studio", "*   Gently"
            )):
                in_scratchpad = True
                continue

            if in_scratchpad:
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

    def ask(
        self,
        user_message: str,
        system_prompt: Optional[str] = None,
        model: Optional[str] = None,
        temperature: float = 0.7,
        **kwargs,
    ) -> str:
        messages = []
        if system_prompt:
            messages.append({"role": "system", "content": system_prompt})
        messages.append({"role": "user", "content": user_message})
        return self.chat(messages=messages, model=model, temperature=temperature, **kwargs)

    # =========================================================================
    # Tool Calling / Function Calling Loop
    # =========================================================================
    def chat_with_tools(
        self,
        messages: Union[List[Dict[str, Any]], Conversation],
        tools: List[Dict[str, Any]],
        tool_handlers: Dict[str, Any],
        model: Optional[str] = None,
        temperature: float = 0.4,
        max_iterations: int = 5,
        **kwargs,
    ) -> str:
        conv = messages if isinstance(messages, Conversation) else Conversation()
        if not isinstance(messages, Conversation):
            conv.messages = list(messages)

        candidate_models = [model or self.default_model] + [
            m for m in self.fallback_models if m != (model or self.default_model)
        ]
        gemini_tools = self._convert_tools_to_gemini(tools)

        for target_model in candidate_models:
            try:
                for _ in range(max_iterations):
                    system_instruction, contents = self._convert_messages_to_gemini_contents(conv.get_messages())
                    payload: Dict[str, Any] = {
                        "contents": contents,
                        "tools": gemini_tools,
                        "generationConfig": {"temperature": temperature}
                    }
                    if system_instruction:
                        payload["systemInstruction"] = {"parts": [{"text": system_instruction}]}

                    data = self._send_request(target_model, payload)
                    candidates = data.get("candidates", [])
                    if not candidates:
                        break

                    candidate_content = candidates[0].get("content", {})
                    parts = candidate_content.get("parts", [])

                    function_calls = [p["functionCall"] for p in parts if "functionCall" in p]

                    if not function_calls:
                        text_parts = [p.get("text", "") for p in parts if "text" in p]
                        raw_reply = "".join(text_parts).strip()
                        reply_text = self._clean_reasoning(raw_reply)
                        conv.add_assistant_message(reply_text)
                        return reply_text

                    # Record raw model response
                    conv.messages.append({
                        "role": "assistant",
                        "content": "",
                        "raw_parts": parts
                    })

                    # Execute local tool handlers
                    for fc in function_calls:
                        func_name = fc.get("name")
                        args = fc.get("args", {})
                        handler = tool_handlers.get(func_name)

                        if handler:
                            try:
                                tool_result = handler(args)
                            except Exception as handler_err:
                                tool_result = {"error": str(handler_err)}
                        else:
                            tool_result = {"error": f"Tool '{func_name}' not found."}

                        conv.messages.append({
                            "role": "tool",
                            "name": func_name,
                            "content": json.dumps(tool_result, ensure_ascii=False)
                        })

                return "Превышено количество шагов вызова инструментов."
            except Exception as e:
                logger.warning(f"Tool call on {target_model} failed: {e}. Trying fallback model...")
                continue

        # Final fallback to standard chat if tools endpoint is unavailable
        return self.chat(conv, model=self.default_model, temperature=temperature)

    # =========================================================================
    # Async Methods
    # =========================================================================
    async def achat(self, messages: Union[List[Dict[str, Any]], Conversation], **kwargs) -> str:
        return await asyncio.to_thread(self.chat, messages=messages, **kwargs)

    async def aask(self, user_message: str, **kwargs) -> str:
        return await asyncio.to_thread(self.ask, user_message=user_message, **kwargs)

    async def achat_with_tools(self, messages: Union[List[Dict[str, Any]], Conversation], tools: List[Dict[str, Any]], tool_handlers: Dict[str, Any], **kwargs) -> str:
        return await asyncio.to_thread(self.chat_with_tools, messages=messages, tools=tools, tool_handlers=tool_handlers, **kwargs)


if __name__ == "__main__":
    print("=" * 65)
    print("🚀 ТЕСТИРОВАНИЕ GEMINI CLIENT С АВТОМАТИЧЕСКИМ РЕЗЕРВОМ")
    print("=" * 65)
    client = GeminiClient()
    print(f"📦 Основная модель: {client.default_model}")
    print(f"🔄 Резервные модели: {client.fallback_models}")

    q = "Привет! Студия TOCHKA открыта? Ответь кратко на грузинском и русском."
    print(f"\n👤 Клиент: {q}")
    res = client.ask(q, system_prompt="Ты администратор TOCHKA в Батуми.")
    print("\n✨ Ответ ИИ:\n", res)
    print("=" * 65)
