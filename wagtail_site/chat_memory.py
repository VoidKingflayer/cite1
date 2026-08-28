"""
Persistent Chat Memory Manager for AI Administrator.
Stores multi-channel chat history (Telegram, Web, WhatsApp) in SQLite database,
tracks client preferences, and automatically reloads conversation context across restarts.
"""

import os
import json
import sqlite3
import logging
from datetime import datetime
from typing import List, Dict, Any, Optional
from openrouter_client import Conversation

logger = logging.getLogger(__name__)

DEFAULT_DB_PATH = os.path.join(os.path.dirname(os.path.abspath(__file__)), "db.sqlite3")


class ChatMemoryManager:
    """
    Manages persistent chat conversations and client profiles in SQLite.
    Works seamlessly across Telegram user IDs, WhatsApp phone numbers, and Web session tokens.
    """

    def __init__(self, db_path: str = DEFAULT_DB_PATH):
        self.db_path = db_path
        self._init_tables()

    def _get_connection(self) -> sqlite3.Connection:
        conn = sqlite3.connect(self.db_path)
        conn.row_factory = sqlite3.Row
        return conn

    def _init_tables(self):
        """Creates tables for sessions, messages, and client profiles if not exist."""
        try:
            with self._get_connection() as conn:
                cur = conn.cursor()
                
                # 1. Table for chat sessions
                cur.execute("""
                CREATE TABLE IF NOT EXISTS ai_chat_sessions (
                    session_id TEXT PRIMARY KEY,
                    channel TEXT DEFAULT 'web',
                    client_name TEXT,
                    client_phone TEXT,
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                    metadata_json TEXT DEFAULT '{}'
                )
                """)

                # 2. Table for message history
                cur.execute("""
                CREATE TABLE IF NOT EXISTS ai_chat_messages (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    session_id TEXT NOT NULL,
                    role TEXT NOT NULL,
                    content TEXT NOT NULL,
                    tool_calls_json TEXT,
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                    FOREIGN KEY (session_id) REFERENCES ai_chat_sessions(session_id)
                )
                """)

                # Index for fast lookup by session_id
                cur.execute("CREATE INDEX IF NOT EXISTS idx_chat_session ON ai_chat_messages(session_id)")
                conn.commit()
        except Exception as e:
            logger.error("Failed to init chat memory tables: %s", e)

    # =========================================================================
    # Session & Message Operations
    # =========================================================================

    def get_or_create_session(self, session_id: str, channel: str = "web", client_name: Optional[str] = None, client_phone: Optional[str] = None) -> Dict[str, Any]:
        """Fetches or registers a new chat session."""
        with self._get_connection() as conn:
            cur = conn.cursor()
            cur.execute("SELECT * FROM ai_chat_sessions WHERE session_id = ?", (session_id,))
            row = cur.fetchone()
            if not row:
                cur.execute(
                    "INSERT INTO ai_chat_sessions (session_id, channel, client_name, client_phone) VALUES (?, ?, ?, ?)",
                    (session_id, channel, client_name, client_phone)
                )
                conn.commit()
                cur.execute("SELECT * FROM ai_chat_sessions WHERE session_id = ?", (session_id,))
                row = cur.fetchone()
            return dict(row)

    def add_message(self, session_id: str, role: str, content: str, tool_calls: Optional[Any] = None, channel: str = "web"):
        """Saves a user or assistant message to persistent history."""
        self.get_or_create_session(session_id, channel=channel)
        tool_json = json.dumps(tool_calls, ensure_ascii=False) if tool_calls else None
        
        with self._get_connection() as conn:
            cur = conn.cursor()
            cur.execute(
                "INSERT INTO ai_chat_messages (session_id, role, content, tool_calls_json) VALUES (?, ?, ?, ?)",
                (session_id, role, content, tool_json)
            )
            cur.execute(
                "UPDATE ai_chat_sessions SET updated_at = CURRENT_TIMESTAMP WHERE session_id = ?",
                (session_id,)
            )
            conn.commit()

    def get_conversation(self, session_id: str, system_prompt: Optional[str] = None, limit: int = 30) -> Conversation:
        """
        Loads the last `limit` messages from DB and returns an active Conversation instance.
        """
        self.get_or_create_session(session_id)
        conv = Conversation(system_prompt=system_prompt, max_messages=limit + 10)

        with self._get_connection() as conn:
            cur = conn.cursor()
            cur.execute(
                "SELECT role, content FROM ai_chat_messages WHERE session_id = ? ORDER BY id DESC LIMIT ?",
                (session_id, limit)
            )
            rows = cur.fetchall()
            # Reverse because we queried DESC
            for row in reversed(rows):
                if row["role"] == "user":
                    conv.add_user_message(row["content"])
                elif row["role"] == "assistant":
                    conv.add_assistant_message(row["content"])

        return conv

    def update_client_profile(self, session_id: str, name: Optional[str] = None, phone: Optional[str] = None, metadata: Optional[Dict] = None):
        """Stores client details (name, phone, preferences) discovered in dialogue."""
        with self._get_connection() as conn:
            cur = conn.cursor()
            cur.execute("SELECT metadata_json FROM ai_chat_sessions WHERE session_id = ?", (session_id,))
            row = cur.fetchone()
            current_meta = json.loads(row["metadata_json"]) if (row and row["metadata_json"]) else {}
            
            if metadata:
                current_meta.update(metadata)

            updates = []
            params = []
            if name:
                updates.append("client_name = ?")
                params.append(name)
            if phone:
                updates.append("client_phone = ?")
                params.append(phone)
            if metadata:
                updates.append("metadata_json = ?")
                params.append(json.dumps(current_meta, ensure_ascii=False))

            if updates:
                params.append(session_id)
                cur.execute(f"UPDATE ai_chat_sessions SET {', '.join(updates)}, updated_at = CURRENT_TIMESTAMP WHERE session_id = ?", params)
                conn.commit()

    def clear_session(self, session_id: str):
        """Deletes all messages for a given session."""
        with self._get_connection() as conn:
            cur = conn.cursor()
            cur.execute("DELETE FROM ai_chat_messages WHERE session_id = ?", (session_id,))
            conn.commit()

    def list_recent_sessions(self, limit: int = 20) -> List[Dict[str, Any]]:
        """Lists recent chat dialogues with last message preview."""
        with self._get_connection() as conn:
            cur = conn.cursor()
            cur.execute("""
            SELECT s.*, 
                   (SELECT content FROM ai_chat_messages m WHERE m.session_id = s.session_id ORDER BY m.id DESC LIMIT 1) as last_message,
                   (SELECT COUNT(*) FROM ai_chat_messages m WHERE m.session_id = s.session_id) as messages_count
            FROM ai_chat_sessions s
            ORDER BY s.updated_at DESC
            LIMIT ?
            """, (limit,))
            return [dict(r) for r in cur.fetchall()]
