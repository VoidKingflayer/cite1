#!/usr/bin/env bash
set -e

DOMAIN="tochkabatumi.ge"
APP_DIR="/var/www/tochka"
USER="root"

echo "=== 1. Updating System Packages ==="
apt update && apt upgrade -y
apt install -y python3 python3-pip python3-venv python3-dev libjpeg-dev zlib1g-dev nginx certbot python3-certbot-nginx rsync ufw

echo "=== 2. Setting up Swap File (2GB) ==="
if [ ! -f /swapfile ]; then
    fallocate -l 2G /swapfile
    chmod 600 /swapfile
    mkswap /swapfile
    swapon /swapfile
    echo '/swapfile none swap sw 0 0' >> /etc/fstab
fi

echo "=== 3. Creating App Directory & Virtualenv ==="
mkdir -p "$APP_DIR"
mkdir -p "$APP_DIR/media"
mkdir -p "$APP_DIR/static"
cd "$APP_DIR"

if [ ! -d "venv" ]; then
    python3 -m venv venv
fi

"$APP_DIR/venv/bin/pip" install --upgrade pip
"$APP_DIR/venv/bin/pip" install -r "$APP_DIR/requirements.txt"
"$APP_DIR/venv/bin/pip" install gunicorn

echo "=== 4. Running Migrations & Collectstatic ==="
export DJANGO_SETTINGS_MODULE=wagtail_site.settings.production
"$APP_DIR/venv/bin/python" manage.py migrate --settings=wagtail_site.settings.production
"$APP_DIR/venv/bin/python" manage.py collectstatic --noinput --settings=wagtail_site.settings.production

echo "=== 5. Setting Permissions ==="
chown -R www-data:www-data "$APP_DIR"
chmod -R 775 "$APP_DIR/media"
chmod 664 "$APP_DIR/db.sqlite3" || true
chmod 775 "$APP_DIR"

echo "=== 6. Configuring Gunicorn Service ==="
cat << 'EOF' > /etc/systemd/system/tochka.service
[Unit]
Description=Gunicorn daemon for TOCHKA Batumi Wagtail Site
After=network.target

[Service]
User=root
Group=root
WorkingDirectory=/var/www/tochka
Environment="DJANGO_SETTINGS_MODULE=wagtail_site.settings.production"
ExecStart=/var/www/tochka/venv/bin/gunicorn \
          --workers 3 \
          --bind 127.0.0.1:8000 \
          --timeout 120 \
          --access-logfile /var/log/tochka_access.log \
          --error-logfile /var/log/tochka_error.log \
          wagtail_site.wsgi:application

[Install]
WantedBy=multi-user.target
EOF

systemctl daemon-reload
systemctl restart tochka
systemctl enable tochka

echo "=== 7. Configuring Nginx ==="
cat << 'EOF' > /etc/nginx/sites-available/tochka
server {
    listen 80;
    server_name tochkabatumi.ge www.tochkabatumi.ge 72.56.65.153;

    client_max_body_size 50M;

    location = /favicon.ico { 
        alias /var/www/tochka/static/home/images/favicon.ico;
        access_log off; 
        log_not_found off; 
        expires 30d;
        add_header Cache-Control "public, no-transform";
    }

    location /static/ {
        alias /var/www/tochka/static/;
        expires 30d;
        add_header Cache-Control "public, no-transform";
    }

    location /media/ {
        alias /var/www/tochka/media/;
        expires 30d;
        add_header Cache-Control "public, no-transform";
    }

    location / {
        include proxy_params;
        proxy_pass http://127.0.0.1:8000;
    }
}
EOF

ln -sf /etc/nginx/sites-available/tochka /etc/nginx/sites-enabled/
rm -f /etc/nginx/sites-enabled/default
nginx -t
systemctl restart nginx

echo "=== 8. Configuring Bot Service ==="
cat << 'EOF' > /etc/systemd/system/tochka-bot.service
[Unit]
Description=Telegram & WhatsApp AI Bot Daemon for TOCHKA Massage Studio
After=network.target tochka.service

[Service]
Type=simple
User=root
Group=root
WorkingDirectory=/var/www/tochka
Environment="PYTHONUNBUFFERED=1"
Environment="DJANGO_SETTINGS_MODULE=wagtail_site.settings.production"
ExecStart=/var/www/tochka/venv/bin/python run_adapters.py
Restart=always
RestartSec=5

[Install]
WantedBy=multi-user.target
EOF

systemctl daemon-reload
systemctl restart tochka-bot
systemctl enable tochka-bot

echo "=== 9. Configuring Firewall ==="
ufw allow 'Nginx Full'
ufw allow 'OpenSSH'
ufw --force enable

echo "=== 10. Installing SSL Certificate (HTTPS) ==="
certbot --nginx -d tochkabatumi.ge -d www.tochkabatumi.ge --non-interactive --agree-tos --register-unsafely-without-email || true

echo "=== DEPLOYMENT COMPLETED SUCCESSFULLY ==="
echo "Site is live at: https://tochkabatumi.ge"

