"""
Persistent Omnichannel Chat Memory & AI Control Manager.
Manages multi-channel chat history (Telegram, WhatsApp, Instagram, Web):
- Tracks active session states (AI automated vs Manual Human Master mode)
- Per-channel and global AI kill-switches (Telegram, WhatsApp, Instagram, Web, All)
- Unread message counters & instant message retrieval for Wagtail Omnichannel Live Inbox
- Client profile tracking (name, phone, username, preferences)
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
    Manages persistent chat conversations, client profiles, and AI/Manual modes in SQLite.
    Works seamlessly across Telegram user IDs, WhatsApp phone numbers, Instagram IDs, and Web sessions.
    """

    def __init__(self, db_path: str = DEFAULT_DB_PATH):
        self.db_path = db_path
        self._init_tables()

    def _get_connection(self) -> sqlite3.Connection:
        conn = sqlite3.connect(self.db_path)
        conn.row_factory = sqlite3.Row
        return conn

    def _init_tables(self):
        """Creates tables for sessions, messages, and channel settings if not exist, and migrates columns."""
        try:
            with self._get_connection() as conn:
                cur = conn.cursor()

                # 1. Table for chat sessions
                cur.execute("""
                CREATE TABLE IF NOT EXISTS ai_chat_sessions (
                    session_id TEXT PRIMARY KEY,
                    channel TEXT DEFAULT 'telegram',
                    client_name TEXT,
                    client_phone TEXT,
                    client_username TEXT,
                    ai_mode TEXT DEFAULT 'ai',
                    unread_count INTEGER DEFAULT 0,
                    last_message TEXT,
                    last_message_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
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

                # 3. Table for Channel-Level AI Toggles
                cur.execute("""
                CREATE TABLE IF NOT EXISTS ai_channel_settings (
                    channel TEXT PRIMARY KEY,
                    ai_enabled INTEGER DEFAULT 1,
                    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                )
                """)

                # Default channel settings
                default_channels = ["all", "telegram", "whatsapp", "instagram", "web"]
                for ch in default_channels:
                    cur.execute(
                        "INSERT OR IGNORE INTO ai_channel_settings (channel, ai_enabled) VALUES (?, 1)",
                        (ch,)
                    )

                # Migrate existing columns if old table exists
                cur.execute("PRAGMA table_info(ai_chat_sessions)")
                existing_cols = {row["name"] for row in cur.fetchall()}

                new_cols = {
                    "client_username": "TEXT",
                    "ai_mode": "TEXT DEFAULT 'ai'",
                    "unread_count": "INTEGER DEFAULT 0",
                    "last_message": "TEXT",
                    "last_message_at": "TIMESTAMP",
                }
                for col_name, col_type in new_cols.items():
                    if col_name not in existing_cols:
                        try:
                            cur.execute(f"ALTER TABLE ai_chat_sessions ADD COLUMN {col_name} {col_type}")
                        except Exception as ex:
                            logger.error("Failed to add column %s: %s", col_name, ex)

                # Indexes for lightning-fast lookups
                cur.execute("CREATE INDEX IF NOT EXISTS idx_chat_session ON ai_chat_messages(session_id)")
                cur.execute("CREATE INDEX IF NOT EXISTS idx_session_updated ON ai_chat_sessions(updated_at)")
                cur.execute("CREATE INDEX IF NOT EXISTS idx_session_channel ON ai_chat_sessions(channel)")
                conn.commit()
        except Exception as e:
            logger.error("Failed to init chat memory tables: %s", e)

    # =========================================================================
    # Channel-Level AI Toggles
    # =========================================================================

    def get_channel_ai_state(self, channel: str) -> bool:
        """Checks whether AI is enabled for a given channel or globally ('all')."""
        try:
            with self._get_connection() as conn:
                cur = conn.cursor()
                # 1. First check global kill-switch
                cur.execute("SELECT ai_enabled FROM ai_channel_settings WHERE channel = 'all'")
                row_all = cur.fetchone()
                if row_all and row_all["ai_enabled"] == 0:
                    return False

                # 2. Check channel-specific setting
                cur.execute("SELECT ai_enabled FROM ai_channel_settings WHERE channel = ?", (channel.lower(),))
                row_ch = cur.fetchone()
                if row_ch:
                    return bool(row_ch["ai_enabled"])
                return True
        except Exception as e:
            logger.error("Error getting channel AI state: %s", e)
            return True

    def set_channel_ai_state(self, channel: str, enabled: bool):
        """Toggles AI enabled state for a channel or globally ('all')."""
        with self._get_connection() as conn:
            cur = conn.cursor()
            val = 1 if enabled else 0
            cur.execute("""
            INSERT INTO ai_channel_settings (channel, ai_enabled, updated_at) 
            VALUES (?, ?, CURRENT_TIMESTAMP)
            ON CONFLICT(channel) DO UPDATE SET ai_enabled = ?, updated_at = CURRENT_TIMESTAMP
            """, (channel.lower(), val, val))
            conn.commit()

    def get_all_channel_states(self) -> Dict[str, bool]:
        """Returns dict of AI states across all channels."""
        states = {
            "all": True,
            "telegram": True,
            "whatsapp": True,
            "instagram": True,
            "web": True,
        }
        try:
            with self._get_connection() as conn:
                cur = conn.cursor()
                cur.execute("SELECT channel, ai_enabled FROM ai_channel_settings")
                for row in cur.fetchall():
                    states[row["channel"]] = bool(row["ai_enabled"])
        except Exception as e:
            logger.error("Error fetching all channel states: %s", e)
        return states

    # =========================================================================
    # Session Operations & Granular AI Mode (Chat-Level)
    # =========================================================================

    def get_or_create_session(
        self,
        session_id: str,
        channel: str = "telegram",
        client_name: Optional[str] = None,
        client_phone: Optional[str] = None,
        client_username: Optional[str] = None
    ) -> Dict[str, Any]:
        """Fetches or registers a new chat session."""
        with self._get_connection() as conn:
            cur = conn.cursor()
            cur.execute("SELECT * FROM ai_chat_sessions WHERE session_id = ?", (session_id,))
            row = cur.fetchone()
            if not row:
                cur.execute(
                    """
                    INSERT INTO ai_chat_sessions 
                    (session_id, channel, client_name, client_phone, client_username, ai_mode) 
                    VALUES (?, ?, ?, ?, ?, 'ai')
                    """,
                    (session_id, channel, client_name, client_phone, client_username)
                )
                conn.commit()
                cur.execute("SELECT * FROM ai_chat_sessions WHERE session_id = ?", (session_id,))
                row = cur.fetchone()
            else:
                # Update name / phone / username if newly provided
                updates = []
                params = []
                if client_name and not row["client_name"]:
                    updates.append("client_name = ?")
                    params.append(client_name)
                if client_phone and not row["client_phone"]:
                    updates.append("client_phone = ?")
                    params.append(client_phone)
                if client_username and not row["client_username"]:
                    updates.append("client_username = ?")
                    params.append(client_username)
                if updates:
                    params.append(session_id)
                    cur.execute(f"UPDATE ai_chat_sessions SET {', '.join(updates)} WHERE session_id = ?", params)
                    conn.commit()
                    cur.execute("SELECT * FROM ai_chat_sessions WHERE session_id = ?", (session_id,))
                    row = cur.fetchone()

            return dict(row)

    def set_session_ai_mode(self, session_id: str, mode: str):
        """Sets chat mode to 'ai' or 'manual'."""
        clean_mode = "manual" if mode == "manual" else "ai"
        with self._get_connection() as conn:
            cur = conn.cursor()
            cur.execute("UPDATE ai_chat_sessions SET ai_mode = ?, updated_at = CURRENT_TIMESTAMP WHERE session_id = ?", (clean_mode, session_id))
            conn.commit()

    def get_session_ai_mode(self, session_id: str) -> str:
        """Returns 'ai' or 'manual' for a given session."""
        with self._get_connection() as conn:
            cur = conn.cursor()
            cur.execute("SELECT ai_mode FROM ai_chat_sessions WHERE session_id = ?", (session_id,))
            row = cur.fetchone()
            return row["ai_mode"] if (row and row["ai_mode"]) else "ai"

    def mark_session_read(self, session_id: str):
        """Clears unread counter for a session."""
        with self._get_connection() as conn:
            cur = conn.cursor()
            cur.execute("UPDATE ai_chat_sessions SET unread_count = 0 WHERE session_id = ?", (session_id,))
            conn.commit()

    # =========================================================================
    # Message History Operations
    # =========================================================================

    def add_message(
        self,
        session_id: str,
        role: str,
        content: str,
        tool_calls: Optional[Any] = None,
        channel: str = "telegram",
        client_name: Optional[str] = None,
        client_phone: Optional[str] = None,
        client_username: Optional[str] = None
    ):
        """Saves a user, assistant, or master message to persistent history."""
        self.get_or_create_session(
            session_id,
            channel=channel,
            client_name=client_name,
            client_phone=client_phone,
            client_username=client_username
        )
        tool_json = json.dumps(tool_calls, ensure_ascii=False) if tool_calls else None
        preview = content if len(content) <= 120 else content[:117] + "..."

        with self._get_connection() as conn:
            cur = conn.cursor()
            cur.execute(
                "INSERT INTO ai_chat_messages (session_id, role, content, tool_calls_json) VALUES (?, ?, ?, ?)",
                (session_id, role, content, tool_json)
            )

            # If message is from user, increment unread count
            unread_delta = 1 if role == "user" else 0

            cur.execute(
                """
                UPDATE ai_chat_sessions 
                SET updated_at = CURRENT_TIMESTAMP,
                    last_message = ?,
                    last_message_at = CURRENT_TIMESTAMP,
                    unread_count = unread_count + ?
                WHERE session_id = ?
                """,
                (preview, unread_delta, session_id)
            )
            conn.commit()

    def add_master_message(self, session_id: str, content: str, set_manual: bool = True):
        """Saves a message sent by the human master from Wagtail Admin."""
        with self._get_connection() as conn:
            cur = conn.cursor()
            cur.execute(
                "INSERT INTO ai_chat_messages (session_id, role, content) VALUES (?, 'master', ?)",
                (session_id, content)
            )
            preview = f"👤 Мастер: {content[:100]}"
            mode_update = ", ai_mode = 'manual'" if set_manual else ""
            cur.execute(
                f"""
                UPDATE ai_chat_sessions 
                SET updated_at = CURRENT_TIMESTAMP,
                    last_message = ?,
                    last_message_at = CURRENT_TIMESTAMP,
                    unread_count = 0
                    {mode_update}
                WHERE session_id = ?
                """,
                (preview, session_id)
            )
            conn.commit()

    def get_session_messages(self, session_id: str, limit: int = 150) -> List[Dict[str, Any]]:
        """Returns message list for displaying in Wagtail Inbox conversation thread."""
        with self._get_connection() as conn:
            cur = conn.cursor()
            cur.execute(
                "SELECT * FROM ai_chat_messages WHERE session_id = ? ORDER BY id ASC LIMIT ?",
                (session_id, limit)
            )
            rows = cur.fetchall()
            messages = []
            for r in rows:
                m = dict(r)
                m["tool_calls"] = json.loads(m["tool_calls_json"]) if m.get("tool_calls_json") else None
                messages.append(m)
            return messages

    def get_conversation(self, session_id: str, system_prompt: Optional[str] = None, limit: int = 30) -> Conversation:
        """Loads last `limit` messages from DB and returns an active Conversation instance."""
        self.get_or_create_session(session_id)
        conv = Conversation(system_prompt=system_prompt, max_messages=limit + 10)

        with self._get_connection() as conn:
            cur = conn.cursor()
            cur.execute(
                "SELECT role, content FROM ai_chat_messages WHERE session_id = ? ORDER BY id DESC LIMIT ?",
                (session_id, limit)
            )
            rows = cur.fetchall()
            for row in reversed(rows):
                if row["role"] == "user":
                    conv.add_user_message(row["content"])
                elif row["role"] in ("assistant", "master"):
                    conv.add_assistant_message(row["content"])

        return conv

    def update_client_profile(self, session_id: str, name: Optional[str] = None, phone: Optional[str] = None, metadata: Optional[Dict] = None):
        """Stores client details discovered in dialogue."""
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

    # =========================================================================
    # Omnichannel Inbox Queries
    # =========================================================================

    def get_filtered_sessions(
        self,
        channel: Optional[str] = None,
        ai_mode: Optional[str] = None,
        search: Optional[str] = None,
        limit: int = 100
    ) -> List[Dict[str, Any]]:
        """Queries chat sessions filtered by channel, AI mode, and search keyword."""
        with self._get_connection() as conn:
            cur = conn.cursor()
            query = """
            SELECT s.*,
                   (SELECT COUNT(*) FROM ai_chat_messages m WHERE m.session_id = s.session_id) as total_messages
            FROM ai_chat_sessions s
            WHERE 1=1
            """
            params = []

            if channel and channel.lower() not in ("all", ""):
                query += " AND LOWER(s.channel) = ?"
                params.append(channel.lower())

            if ai_mode and ai_mode.lower() not in ("all", ""):
                query += " AND s.ai_mode = ?"
                params.append(ai_mode.lower())

            if search and search.strip():
                kw = f"%{search.strip().lower()}%"
                query += """ AND (
                    LOWER(s.session_id) LIKE ? OR
                    LOWER(COALESCE(s.client_name, '')) LIKE ? OR
                    LOWER(COALESCE(s.client_phone, '')) LIKE ? OR
                    LOWER(COALESCE(s.client_username, '')) LIKE ? OR
                    LOWER(COALESCE(s.last_message, '')) LIKE ?
                )"""
                params.extend([kw, kw, kw, kw, kw])

            query += " ORDER BY s.updated_at DESC LIMIT ?"
            params.append(limit)

            cur.execute(query, params)
            return [dict(r) for r in cur.fetchall()]

    def get_inbox_stats(self) -> Dict[str, Any]:
        """Calculates dashboard metrics for Omnichannel Inbox."""
        with self._get_connection() as conn:
            cur = conn.cursor()
            cur.execute("""
            SELECT 
                COUNT(*) as total_chats,
                SUM(CASE WHEN ai_mode = 'manual' THEN 1 ELSE 0 END) as manual_chats,
                SUM(CASE WHEN ai_mode = 'ai' THEN 1 ELSE 0 END) as ai_chats,
                SUM(unread_count) as total_unread,
                SUM(CASE WHEN LOWER(channel) = 'telegram' THEN 1 ELSE 0 END) as tg_chats,
                SUM(CASE WHEN LOWER(channel) = 'whatsapp' THEN 1 ELSE 0 END) as wa_chats,
                SUM(CASE WHEN LOWER(channel) = 'instagram' THEN 1 ELSE 0 END) as ig_chats,
                SUM(CASE WHEN LOWER(channel) = 'web' THEN 1 ELSE 0 END) as web_chats
            FROM ai_chat_sessions
            """)
            row = cur.fetchone()
            return {
                "total_chats": row["total_chats"] or 0,
                "manual_chats": row["manual_chats"] or 0,
                "ai_chats": row["ai_chats"] or 0,
                "total_unread": row["total_unread"] or 0,
                "tg_chats": row["tg_chats"] or 0,
                "wa_chats": row["wa_chats"] or 0,
                "ig_chats": row["ig_chats"] or 0,
                "web_chats": row["web_chats"] or 0,
            }
