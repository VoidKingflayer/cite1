"""
OpenRouter API Client for Python.
Provides synchronous and asynchronous chat completions, streaming, model switching,
fallback models, and conversation history management.
"""

import os
import json
import urllib.request
import urllib.error
import asyncio
from typing import List, Dict, Any, Optional, Iterator, AsyncIterator, Union


class OpenRouterModels:
    """Popular active models on OpenRouter for convenient switching."""
    # Free Tier Models (Verified Live)
    NVIDIA_NEMOTRON_FREE = "nvidia/nemotron-3.5-lightning:free"
    GOOGLE_GEMMA_26B_FREE = "google/gemma-4-26b-a4b-it:free"
    GOOGLE_GEMMA_31B_FREE = "google/gemma-4-31b-it:free"
    MINIMAX_M3_FREE = "minimax/minimax-m3:free"
    ZAI_GLM_FREE = "z-ai/glm-5.2:free"
    LIQUID_LFM_FREE = "liquid/lfm-2.5-2.6b:free"
    
    # Fast & Cost-Effective Production Models
    GEMINI_2_FLASH = "google/gemini-2.0-flash-001"
    GPT_4O_MINI = "openai/gpt-4o-mini"
    DEEPSEEK_V3 = "deepseek/deepseek-chat"
    DEEPSEEK_R1 = "deepseek/deepseek-r1"
    CLAUDE_3_5_HAIKU = "anthropic/claude-3.5-haiku"
    CLAUDE_3_5_SONNET = "anthropic/claude-3.5-sonnet"


class Conversation:
    """
    Manages multi-turn conversation history for a chat session.
    """
    def __init__(self, system_prompt: Optional[str] = None, max_messages: int = 40):
        self.system_prompt = system_prompt
        self.max_messages = max_messages
        self.messages: List[Dict[str, str]] = []
        if system_prompt:
            self.messages.append({"role": "system", "content": system_prompt})

    def add_user_message(self, content: str) -> "Conversation":
        self.messages.append({"role": "user", "content": content})
        self._trim()
        return self

    def add_assistant_message(self, content: str) -> "Conversation":
        self.messages.append({"role": "assistant", "content": content})
        self._trim()
        return self

    def set_system_prompt(self, system_prompt: str) -> "Conversation":
        self.system_prompt = system_prompt
        if self.messages and self.messages[0].get("role") == "system":
            self.messages[0]["content"] = system_prompt
        else:
            self.messages.insert(0, {"role": "system", "content": system_prompt})
        return self

    def get_messages(self) -> List[Dict[str, str]]:
        return list(self.messages)

    def clear(self, keep_system: bool = True):
        if keep_system and self.system_prompt:
            self.messages = [{"role": "system", "content": self.system_prompt}]
        else:
            self.messages = []

    def _trim(self):
        """Ensures the conversation doesn't grow indefinitely, preserving system prompt."""
        if len(self.messages) > self.max_messages:
            has_system = self.messages and self.messages[0].get("role") == "system"
            excess = len(self.messages) - self.max_messages
            if has_system:
                self.messages = [self.messages[0]] + self.messages[1 + excess:]
            else:
                self.messages = self.messages[excess:]


def _find_and_load_env():
    """Automatically locates and parses .env file if variables are not in os.environ."""
    if os.getenv("OPENROUTER_API_KEY"):
        return

    try:
        from dotenv import load_dotenv
        load_dotenv()
        if os.getenv("OPENROUTER_API_KEY"):
            return
    except ImportError:
        pass

    # Search current directory and parent directories for .env
    search_paths = [
        os.getcwd(),
        os.path.dirname(os.path.abspath(__file__)),
        os.path.dirname(os.path.dirname(os.path.abspath(__file__))),
        os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))),
    ]
    for p in search_paths:
        env_file = os.path.join(p, ".env")
        if os.path.isfile(env_file):
            try:
                with open(env_file, "r", encoding="utf-8") as f:
                    for line in f:
                        line = line.strip()
                        if not line or line.startswith("#") or "=" not in line:
                            continue
                        k, v = line.split("=", 1)
                        k = k.strip()
                        v = v.strip().strip("'\"")
                        if k not in os.environ:
                            os.environ[k] = v
                if os.getenv("OPENROUTER_API_KEY"):
                    break
            except Exception:
                pass


class OpenRouterClient:
    """
    Client for interacting with OpenRouter API (OpenAI-compatible).
    Supports model switching, streaming, async/sync requests, and fallback models.
    """
    DEFAULT_API_URL = "https://openrouter.ai/api/v1/chat/completions"

    def __init__(
        self,
        api_key: Optional[str] = None,
        default_model: str = OpenRouterModels.GOOGLE_GEMMA_31B_FREE,
        fallback_models: Optional[List[str]] = None,
        base_url: str = DEFAULT_API_URL,
        site_url: Optional[str] = "https://tochkabatumi.ge",
        site_name: Optional[str] = "TOCHKA Massage Sanctuary Batumi",
        timeout: int = 60,
    ):
        _find_and_load_env()
        self.api_key = api_key or os.getenv("OPENROUTER_API_KEY")
        if not self.api_key:
            raise ValueError(
                "OpenRouter API Key is required. Pass it via api_key='sk-or-...' "
                "or set OPENROUTER_API_KEY in your .env file or environment variable."
            )
        self.default_model = default_model
        self.fallback_models = fallback_models or [
            OpenRouterModels.GOOGLE_GEMMA_26B_FREE,
            OpenRouterModels.NVIDIA_NEMOTRON_FREE,
            OpenRouterModels.MINIMAX_M3_FREE,
            OpenRouterModels.ZAI_GLM_FREE,
        ]
        self.base_url = base_url
        self.site_url = site_url
        self.site_name = site_name
        self.timeout = timeout

    def set_model(self, model_name: str):
        """Switches the default model for future requests."""
        self.default_model = model_name

    def _get_headers(self) -> Dict[str, str]:
        headers = {
            "Content-Type": "application/json",
            "Authorization": f"Bearer {self.api_key}",
            "User-Agent": "TOCHKA-AI-Assistant/1.0",
        }
        if self.site_url:
            headers["HTTP-Referer"] = self.site_url
        if self.site_name:
            headers["X-Title"] = self.site_name
        return headers

    def _prepare_payload(
        self,
        messages: List[Dict[str, str]],
        model: Optional[str] = None,
        temperature: float = 0.7,
        max_tokens: Optional[int] = None,
        stream: bool = False,
        extra_params: Optional[Dict[str, Any]] = None,
    ) -> Dict[str, Any]:
        payload: Dict[str, Any] = {
            "model": model or self.default_model,
            "messages": messages,
            "temperature": temperature,
            "stream": stream,
        }
        if max_tokens:
            payload["max_tokens"] = max_tokens
        if extra_params:
            payload.update(extra_params)
        return payload

    # =========================================================================
    # Synchronous Chat Completions
    # =========================================================================
    def chat(
        self,
        messages: Union[List[Dict[str, str]], Conversation],
        model: Optional[str] = None,
        temperature: float = 0.7,
        max_tokens: Optional[int] = None,
        use_fallback: bool = True,
        **kwargs,
    ) -> str:
        """
        Sends a synchronous chat request and returns the assistant's reply string.
        """
        msg_list = messages.get_messages() if isinstance(messages, Conversation) else messages
        models_to_try = [model or self.default_model]
        if use_fallback:
            for fb in self.fallback_models:
                if fb not in models_to_try:
                    models_to_try.append(fb)

        last_exception = None
        for current_model in models_to_try:
            try:
                payload = self._prepare_payload(
                    messages=msg_list,
                    model=current_model,
                    temperature=temperature,
                    max_tokens=max_tokens,
                    stream=False,
                    extra_params=kwargs,
                )
                req = urllib.request.Request(
                    self.base_url,
                    data=json.dumps(payload).encode("utf-8"),
                    headers=self._get_headers(),
                    method="POST",
                )
                with urllib.request.urlopen(req, timeout=self.timeout) as response:
                    raw_data = response.read().decode("utf-8")
                    data = json.loads(raw_data)

                    # Extract assistant message
                    choices = data.get("choices", [])
                    if choices:
                        content = choices[0].get("message", {}).get("content", "")
                        # If passed a Conversation instance, append reply
                        if isinstance(messages, Conversation) and content:
                            messages.add_assistant_message(content)
                        return content
                    else:
                        raise ValueError(f"No choices returned: {raw_data}")

            except Exception as e:
                last_exception = e
                # Try next fallback model if available
                continue

        raise RuntimeError(f"All models failed on OpenRouter. Last error: {last_exception}")

    def ask(
        self,
        user_message: str,
        system_prompt: Optional[str] = None,
        model: Optional[str] = None,
        temperature: float = 0.7,
        **kwargs,
    ) -> str:
        """
        Convenient one-shot method to ask a single question with optional system prompt.
        """
        messages = []
        if system_prompt:
            messages.append({"role": "system", "content": system_prompt})
        messages.append({"role": "user", "content": user_message})
        return self.chat(messages=messages, model=model, temperature=temperature, **kwargs)

    # =========================================================================
    # Tool Calling / Function Calling Execution Loop
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
        """
        Executes an agent loop with tool calling: sends message + tools, executes any requested
        functions locally using `tool_handlers`, and returns the final assistant answer.
        """
        conv = messages if isinstance(messages, Conversation) else Conversation()
        if not isinstance(messages, Conversation):
            conv.messages = list(messages)

        current_model = model or self.default_model

        for _ in range(max_iterations):
            payload = self._prepare_payload(
                messages=conv.get_messages(),
                model=current_model,
                temperature=temperature,
                stream=False,
                extra_params={"tools": tools, **kwargs},
            )
            req = urllib.request.Request(
                self.base_url,
                data=json.dumps(payload).encode("utf-8"),
                headers=self._get_headers(),
                method="POST",
            )
            with urllib.request.urlopen(req, timeout=self.timeout) as response:
                raw_data = response.read().decode("utf-8")
                data = json.loads(raw_data)

            choice = data.get("choices", [{}])[0]
            message = choice.get("message", {})
            tool_calls = message.get("tool_calls")

            # If no tool calls requested, we got our final text response
            if not tool_calls:
                content = message.get("content", "")
                conv.add_assistant_message(content)
                return content

            # Append the assistant message with tool calls to conversation
            conv.messages.append(message)

            # Execute all requested tool calls
            for t_call in tool_calls:
                func = t_call.get("function", {})
                func_name = func.get("name")
                call_id = t_call.get("id")

                try:
                    args = json.loads(func.get("arguments", "{}"))
                except Exception:
                    args = {}

                handler = tool_handlers.get(func_name)
                if handler:
                    try:
                        tool_result = handler(args)
                    except Exception as handler_err:
                        tool_result = {"error": str(handler_err)}
                else:
                    tool_result = {"error": f"Tool '{func_name}' not found."}

                # Append tool execution result
                conv.messages.append({
                    "role": "tool",
                    "tool_call_id": call_id,
                    "name": func_name,
                    "content": json.dumps(tool_result, ensure_ascii=False),
                })

        return "Превышено количество шагов вызова инструментов."

    async def achat_with_tools(
        self,
        messages: Union[List[Dict[str, Any]], Conversation],
        tools: List[Dict[str, Any]],
        tool_handlers: Dict[str, Any],
        model: Optional[str] = None,
        temperature: float = 0.4,
        **kwargs,
    ) -> str:
        """Async version of chat_with_tools."""
        return await asyncio.to_thread(
            self.chat_with_tools,
            messages=messages,
            tools=tools,
            tool_handlers=tool_handlers,
            model=model,
            temperature=temperature,
            **kwargs,
        )

    # =========================================================================
    # Streaming Chat Completions (Sync Generator)
    # =========================================================================
    def stream_chat(
        self,
        messages: Union[List[Dict[str, str]], Conversation],
        model: Optional[str] = None,
        temperature: float = 0.7,
        max_tokens: Optional[int] = None,
        **kwargs,
    ) -> Iterator[str]:
        """
        Streams response tokens in real-time. Yields text deltas as they arrive.
        """
        msg_list = messages.get_messages() if isinstance(messages, Conversation) else messages
        payload = self._prepare_payload(
            messages=msg_list,
            model=model or self.default_model,
            temperature=temperature,
            max_tokens=max_tokens,
            stream=True,
            extra_params=kwargs,
        )
        req = urllib.request.Request(
            self.base_url,
            data=json.dumps(payload).encode("utf-8"),
            headers=self._get_headers(),
            method="POST",
        )
        full_reply = []
        with urllib.request.urlopen(req, timeout=self.timeout) as response:
            for line in response:
                decoded = line.decode("utf-8").strip()
                if not decoded or not decoded.startswith("data:"):
                    continue
                data_str = decoded[5:].strip()
                if data_str == "[DONE]":
                    break
                try:
                    chunk = json.loads(data_str)
                    delta = chunk.get("choices", [{}])[0].get("delta", {}).get("content", "")
                    if delta:
                        full_reply.append(delta)
                        yield delta
                except json.JSONDecodeError:
                    continue

        if isinstance(messages, Conversation) and full_reply:
            messages.add_assistant_message("".join(full_reply))

    # =========================================================================
    # Asynchronous Chat Completions (Async / Await)
    # =========================================================================
    async def achat(
        self,
        messages: Union[List[Dict[str, str]], Conversation],
        model: Optional[str] = None,
        temperature: float = 0.7,
        max_tokens: Optional[int] = None,
        use_fallback: bool = True,
        **kwargs,
    ) -> str:
        """
        Asynchronously sends a chat request (ideal for FastAPI / aiogram Telegram bot).
        """
        return await asyncio.to_thread(
            self.chat,
            messages=messages,
            model=model,
            temperature=temperature,
            max_tokens=max_tokens,
            use_fallback=use_fallback,
            **kwargs,
        )

    async def aask(
        self,
        user_message: str,
        system_prompt: Optional[str] = None,
        model: Optional[str] = None,
        temperature: float = 0.7,
        **kwargs,
    ) -> str:
        """
        Async one-shot method to ask a question.
        """
        return await asyncio.to_thread(
            self.ask,
            user_message=user_message,
            system_prompt=system_prompt,
            model=model,
            temperature=temperature,
        )


if __name__ == "__main__":
    print("=" * 65)
    print("🤖 ТЕСТИРОВАНИЕ КЛИЕНТА OPENROUTER (ЗАГРУЗКА ИЗ .ENV)")
    print("=" * 65)

    try:
        # Автоматически находит и загружает OPENROUTER_API_KEY из .env
        client = OpenRouterClient()
        masked_key = f"{client.api_key[:8]}...{client.api_key[-4:]}"
        print(f"✅ Ключ API успешно найден в .env: {masked_key}")
        print(f"📦 Активная модель по умолчанию: {client.default_model}")

        system_prompt = (
            "Ты — заботливый и вежливый администратор премиальной студии массажа TOCHKA в Батуми (ул. Лука Асатиани, 46). "
            "Твой стиль: спокойный, теплый, лаконичный. Ответь клиенту кратко и дружелюбно (2-3 предложения)."
        )
        user_query = "Здравствуйте! Какие у вас есть расслабляющие массажи и где вы находитесь?"

        print(f"\n👤 Вопрос клиента: «{user_query}»")
        print("⏳ Отправка запроса в OpenRouter...")

        response = client.ask(user_query, system_prompt=system_prompt)

        print("\n✨ Ответ ИИ-Администратора:")
        print(response)
        print("\n" + "=" * 65)
        print("🎉 ВСЁ РАБОТАЕТ ОТЛИЧНО!")
        print("=" * 65)

    except Exception as e:
        print(f"\n❌ Ошибка: {e}")
