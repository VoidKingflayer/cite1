#!/usr/bin/env bash
set -e

SERVER_IP="72.56.65.153"
SERVER_USER="root"
TARGET_DIR="/var/www/tochka"
PROJECT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

echo "=================================================="
echo "🚀 DEPLOYING TOCHKA TO SERVER: $SERVER_IP"
echo "=================================================="

echo "📦 1. Creating target directory on server..."
ssh -o StrictHostKeyChecking=no "$SERVER_USER@$SERVER_IP" "mkdir -p $TARGET_DIR"

echo "📤 2. Uploading project files to server..."
rsync -avz --exclude='venv' --exclude='__pycache__' --exclude='.git' --exclude='db.sqlite3' --exclude='*.backup' --exclude='static' \
      "$PROJECT_DIR/" "$SERVER_USER@$SERVER_IP:$TARGET_DIR/"

echo "⚙️ 3. Running setup & launching Wagtail + Nginx + SSL on server..."
ssh -t "$SERVER_USER@$SERVER_IP" "chmod +x $TARGET_DIR/setup_server.sh && bash $TARGET_DIR/setup_server.sh"

echo "=================================================="
echo "🎉 SUCCESS! Your site is live at: https://tochkabatumi.ge"
echo "=================================================="
