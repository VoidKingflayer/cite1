/**
 * TOCHKA Massage Studio — Self-Hosted WhatsApp Multi-Device Gateway
 * Powered by @whiskeysockets/baileys.
 * Supports both Live QR Code and 8-Digit Pairing Code (Привязка по коду).
 */

const express = require('express');
const cors = require('cors');
const qrcode = require('qrcode');
const path = require('path');
const fs = require('fs');
const http = require('http');
const pino = require('pino');

const {
  default: makeWASocket,
  useMultiFileAuthState,
  DisconnectReason,
  fetchLatestBaileysVersion,
  Browsers,
  delay
} = require('@whiskeysockets/baileys');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.WA_GATEWAY_PORT || 3001;
const SESSION_DIR = process.env.WA_SESSION_DIR || path.join(__dirname, 'whatsapp_session');
const DJANGO_WEBHOOK_URL = process.env.DJANGO_WEBHOOK_URL || 'http://127.0.0.1:8000/api/whatsapp/webhook/';

if (!fs.existsSync(SESSION_DIR)) {
  fs.mkdirSync(SESSION_DIR, { recursive: true });
}

let sock = null;
let currentQrRaw = null;
let currentQrBase64 = null;
let qrGeneratedAt = 0;
let connectionStatus = 'initializing'; // 'initializing', 'qr_ready', 'connected', 'disconnected'
let connectedNumber = null;
let lastError = null;

const logger = pino({ level: 'info' });

const jidMap = new Map();

async function connectToWhatsApp() {
  try {
    const { state, saveCreds } = await useMultiFileAuthState(SESSION_DIR);
    const { version, isLatest } = await fetchLatestBaileysVersion();
    logger.info(`Starting Baileys Socket v${version.join('.')} (latest: ${isLatest})`);

    sock = makeWASocket({
      version,
      logger: pino({ level: 'silent' }),
      auth: state,
      browser: Browsers.macOS('Desktop'),
      syncFullHistory: false,
      connectTimeoutMs: 60000,
      defaultQueryTimeoutMs: 60000,
      keepAliveIntervalMs: 25000,
      generateHighQualityLinkPreview: true,
    });

    sock.ev.on('creds.update', saveCreds);

    sock.ev.on('connection.update', async (update) => {
      const { connection, lastDisconnect, qr } = update;

      if (qr) {
        currentQrRaw = qr;
        try {
          currentQrBase64 = await qrcode.toDataURL(qr, { margin: 2, scale: 7 });
          qrGeneratedAt = Date.now();
          connectionStatus = 'qr_ready';
          logger.info('Fresh WhatsApp QR Code generated and ready to scan.');
        } catch (e) {
          logger.error(`QR generation error: ${e}`);
        }
      }

      if (connection === 'close') {
        const statusCode = lastDisconnect?.error?.output?.statusCode;
        const errorMsg = lastDisconnect?.error?.message || 'Connection closed';
        lastError = `Status ${statusCode}: ${errorMsg}`;

        const shouldReconnect = statusCode !== DisconnectReason.loggedOut;
        logger.warn(`WhatsApp connection closed (${lastError}). Reconnecting: ${shouldReconnect}`);
        connectionStatus = 'disconnected';
        currentQrRaw = null;
        currentQrBase64 = null;

        if (shouldReconnect) {
          setTimeout(connectToWhatsApp, 2500);
        } else {
          logger.error('WhatsApp Logged Out. Clearing session for clean QR/Pairing code.');
          try {
            fs.rmSync(SESSION_DIR, { recursive: true, force: true });
            fs.mkdirSync(SESSION_DIR, { recursive: true });
          } catch (e) {}
          setTimeout(connectToWhatsApp, 2000);
        }
      } else if (connection === 'open') {
        connectionStatus = 'connected';
        currentQrRaw = null;
        currentQrBase64 = null;
        lastError = null;
        connectedNumber = sock.user?.id ? sock.user.id.split(':')[0].replace(/[^0-9]/g, '') : 'Connected';
        logger.info(`✅ WhatsApp Connected successfully as +${connectedNumber}!`);
      }
    });

    // Handle incoming messages
    sock.ev.on('messages.upsert', async ({ messages, type }) => {
      if (type !== 'notify') return;

      for (const msg of messages) {
        try {
          if (!msg.message || msg.key.fromMe) continue;

          const remoteJid = msg.key.remoteJid || '';
          if (remoteJid.includes('@g.us') || remoteJid === 'status@broadcast') continue;

          // Cache JID mapping
          const senderPhone = remoteJid.replace('@s.whatsapp.net', '').replace('@c.us', '');
          const cleanDigits = senderPhone.replace(/[^0-9]/g, '');

          jidMap.set(remoteJid, remoteJid);
          jidMap.set(senderPhone, remoteJid);
          if (cleanDigits) jidMap.set(cleanDigits, remoteJid);

          const pushName = msg.pushName || `WhatsApp Guest +${senderPhone}`;

          const text = msg.message.conversation ||
                       msg.message.extendedTextMessage?.text ||
                       msg.message.imageMessage?.caption ||
                       '';

          if (!text || !text.trim()) continue;

          logger.info(`📩 Incoming WhatsApp from ${pushName} (${remoteJid}): "${text}"`);

          forwardToDjangoWebhook({
            sender_phone: senderPhone,
            raw_jid: remoteJid,
            push_name: pushName,
            text: text.trim(),
            message_id: msg.key.id,
            timestamp: msg.messageTimestamp,
          });

        } catch (err) {
          logger.error(`Error processing message: ${err}`);
        }
      }
    });

  } catch (err) {
    logger.error(`Fatal connection error: ${err}`);
    setTimeout(connectToWhatsApp, 3000);
  }
}

function forwardToDjangoWebhook(payload) {
  const data = JSON.stringify({
    provider: 'self_hosted',
    sender_phone: payload.sender_phone,
    raw_jid: payload.raw_jid,
    sender_name: payload.push_name,
    text: payload.text,
    message_id: payload.message_id,
    timestamp: payload.timestamp,
  });

  const url = new URL(DJANGO_WEBHOOK_URL);
  const req = http.request({
    hostname: url.hostname,
    port: url.port || 80,
    path: url.pathname,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(data),
      'User-Agent': 'TOCHKA-WhatsApp-Gateway/1.0',
    },
    timeout: 15000,
  }, (res) => {
    let body = '';
    res.on('data', chunk => body += chunk);
    res.on('end', () => {
      logger.info(`Django Webhook response [${res.statusCode}]: ${body.substring(0, 100)}`);
    });
  });

  req.on('error', (err) => {
    logger.error(`Django Webhook network error: ${err.message}`);
  });

  req.write(data);
  req.end();
}

// =========================================================================
// REST API
// =========================================================================

// Status API
app.get('/api/status', (req, res) => {
  res.json({
    success: true,
    status: connectionStatus,
    phone: connectedNumber,
    is_connected: connectionStatus === 'connected',
    has_qr: connectionStatus === 'qr_ready' && Boolean(currentQrBase64),
    qr_image: currentQrBase64,
    qr_age_seconds: Math.floor((Date.now() - qrGeneratedAt) / 1000),
    last_error: lastError,
  });
});

// Request 8-Digit Pairing Code (Альтернатива QR-коду)
app.post('/api/pairing-code', async (req, res) => {
  try {
    let { phone } = req.body;
    if (!phone) {
      return res.status(400).json({ success: false, error: 'Укажите номер телефона' });
    }

    const cleanPhone = String(phone).replace(/[^0-9]/g, '');
    if (cleanPhone.length < 9) {
      return res.status(400).json({ success: false, error: 'Некорректный номер телефона' });
    }

    if (connectionStatus === 'connected') {
      return res.json({ success: true, already_connected: true, phone: connectedNumber });
    }

    if (!sock) {
      return res.status(503).json({ success: false, error: 'Шлюз ещё инициализируется, подождите 2 секунды' });
    }

    logger.info(`Requesting WhatsApp Pairing Code for phone: +${cleanPhone}`);
    await delay(1000);
    const code = await sock.requestPairingCode(cleanPhone);

    const formattedCode = code ? `${code.slice(0, 4)}-${code.slice(4)}` : code;

    res.json({
      success: true,
      pairing_code: formattedCode,
      raw_code: code,
      phone: cleanPhone,
      message: 'Код успешно сгенерирован! Введите его в приложении WhatsApp.'
    });
  } catch (err) {
    logger.error(`Pairing code error: ${err}`);
    res.status(500).json({ success: false, error: err.message || 'Ошибка генерации кода привязки' });
  }
});

// Outgoing message API
app.post('/api/send', async (req, res) => {
  try {
    const { phone, message, jid } = req.body;
    const target = String(jid || phone || '').trim();

    if (!target || !message) {
      return res.status(400).json({ success: false, error: 'Missing phone or message parameter' });
    }

    if (connectionStatus !== 'connected' || !sock) {
      return res.status(503).json({ success: false, error: `WhatsApp not connected (status: ${connectionStatus})` });
    }

    // Resolve exact JID from cache or format
    const cleanDigits = target.replace(/[^0-9]/g, '');
    let recipientJid = jidMap.get(target) || (cleanDigits ? jidMap.get(cleanDigits) : null);

    if (!recipientJid) {
      if (target.includes('@lid') || target.includes('@s.whatsapp.net')) {
        recipientJid = target;
      } else if (target.includes('@c.us')) {
        recipientJid = target.replace('@c.us', '@s.whatsapp.net');
      } else {
        recipientJid = `${cleanDigits}@s.whatsapp.net`;
      }
    }

    logger.info(`📤 Sending WhatsApp message to ${recipientJid} (query: ${target}): "${message.substring(0, 60)}..."`);
    const sent = await sock.sendMessage(recipientJid, { text: message });

    res.json({
      success: true,
      message_id: sent?.key?.id,
      recipient: recipientJid,
    });
  } catch (err) {
    logger.error(`Failed to send WhatsApp message: ${err}`);
    res.status(500).json({ success: false, error: err.message });
  }
});

// Reset session API
app.post('/api/reset', (req, res) => {
  try {
    logger.warn('Resetting WhatsApp session requested via API...');
    try {
      if (sock) sock.logout();
    } catch (e) {}
    try {
      fs.rmSync(SESSION_DIR, { recursive: true, force: true });
      fs.mkdirSync(SESSION_DIR, { recursive: true });
    } catch (e) {}
    connectionStatus = 'disconnected';
    currentQrRaw = null;
    currentQrBase64 = null;
    connectedNumber = null;
    setTimeout(connectToWhatsApp, 1500);
    res.json({ success: true, message: 'Сессия сброшена, шлюз перезапущен.' });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// QR Code & Pairing Code Web Page
app.get(['/', '/qr', '/whatsapp', '/whatsapp/qr'], (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="ru">
    <head>
      <meta charset="UTF-8">
      <title>Подключение WhatsApp — TOCHKA Batumi</title>
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <style>
        * { box-sizing: border-box; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; }
        body {
          background: #0f172a;
          color: #f8fafc;
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0;
          padding: 20px;
        }
        .card {
          background: #1e293b;
          border: 1px solid #334155;
          border-radius: 24px;
          padding: 36px 32px;
          max-width: 520px;
          width: 100%;
          text-align: center;
          box-shadow: 0 25px 50px -12px rgba(0,0,0,0.5);
        }
        h1 { font-size: 1.6rem; font-weight: 800; margin: 0 0 8px; color: #ffffff; }
        p { color: #94a3b8; font-size: 0.92rem; margin: 0 0 20px; line-height: 1.5; }
        
        .tabs {
          display: flex;
          background: #0f172a;
          padding: 4px;
          border-radius: 12px;
          margin-bottom: 24px;
          gap: 4px;
        }
        .tab-btn {
          flex: 1;
          background: transparent;
          border: none;
          color: #94a3b8;
          padding: 10px;
          border-radius: 8px;
          font-weight: 700;
          font-size: 0.88rem;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .tab-btn.active {
          background: #2563eb;
          color: #ffffff;
          box-shadow: 0 2px 8px rgba(37,99,235,0.4);
        }
        
        .qr-box {
          background: #ffffff;
          padding: 18px;
          border-radius: 16px;
          display: inline-block;
          margin: 12px 0;
          box-shadow: 0 10px 25px rgba(0,0,0,0.3);
        }
        .qr-box img { display: block; width: 230px; height: 230px; }
        
        .badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 6px 16px;
          border-radius: 9999px;
          font-weight: 700;
          font-size: 0.85rem;
          margin-bottom: 16px;
        }
        .badge.ready { background: #0284c7; color: #fff; }
        .badge.connected { background: #10b981; color: #fff; }
        .badge.loading { background: #eab308; color: #000; }
        
        .pairing-box {
          background: #0f172a;
          border: 1px solid #334155;
          border-radius: 16px;
          padding: 24px 20px;
          margin: 16px 0;
          text-align: left;
        }
        .input-group {
          margin-bottom: 16px;
        }
        label {
          display: block;
          font-size: 0.85rem;
          font-weight: 700;
          color: #cbd5e1;
          margin-bottom: 6px;
        }
        input[type="text"] {
          width: 100%;
          background: #1e293b;
          border: 1px solid #475569;
          border-radius: 10px;
          padding: 12px 16px;
          color: #ffffff;
          font-size: 1.05rem;
          font-weight: 600;
          outline: none;
        }
        input[type="text"]:focus {
          border-color: #3b82f6;
          box-shadow: 0 0 0 3px rgba(59,130,246,0.25);
        }
        
        .btn-primary {
          width: 100%;
          background: #10b981;
          color: #ffffff;
          border: none;
          padding: 13px;
          border-radius: 10px;
          font-weight: 800;
          font-size: 1rem;
          cursor: pointer;
          transition: all 0.15s ease;
        }
        .btn-primary:hover {
          background: #059669;
        }
        
        .code-display {
          background: #1e293b;
          border: 2px dashed #10b981;
          border-radius: 12px;
          padding: 16px;
          text-align: center;
          margin-top: 16px;
        }
        .code-val {
          font-family: monospace;
          font-size: 2.2rem;
          font-weight: 900;
          color: #34d399;
          letter-spacing: 4px;
        }
        
        .steps {
          text-align: left;
          background: #0f172a;
          padding: 16px 20px;
          border-radius: 12px;
          font-size: 0.85rem;
          color: #cbd5e1;
          margin-top: 20px;
        }
        .steps ol { margin: 0; padding-left: 20px; }
        .steps li { margin-bottom: 6px; }

        .btn-reset {
          background: transparent;
          border: 1px solid #475569;
          color: #94a3b8;
          padding: 8px 16px;
          border-radius: 8px;
          font-size: 0.8rem;
          cursor: pointer;
          margin-top: 16px;
        }
        .btn-reset:hover {
          color: #ef4444;
          border-color: #ef4444;
        }
      </style>
    </head>
    <body>
      <div class="card">
        <h1>📱 Подключение WhatsApp</h1>
        <p>Студия массажа TOCHKA (Батуми) • Шлюз AI-Администратора</p>

        <div id="statusBadge" class="badge loading">
          ⏳ Проверка статуса...
        </div>

        <div id="connectedView" style="display: none; padding: 30px 20px;">
          <div style="font-size: 3rem; margin-bottom: 12px;">🎉</div>
          <div id="connectedPhoneTxt" style="color: #10b981; font-size: 1.3rem; font-weight: 800; margin-bottom: 8px;">WhatsApp успешно подключен!</div>
          <p style="color: #94a3b8; font-size: 0.9rem;">Бот готов принимать сообщения от клиентов и отвечать в реальном времени.</p>
          <a href="/admin/inbox/" style="display: inline-block; background: #2563eb; color: #fff; padding: 10px 24px; border-radius: 10px; text-decoration: none; font-weight: 700; margin-top: 10px;">💬 Открыть чаты в Wagtail</a>
          <br>
          <button onclick="resetSession()" class="btn-reset" style="margin-top: 24px;">Перепривязать другой номер</button>
        </div>

        <div id="setupView">
          <div class="tabs">
            <button class="tab-btn active" id="tabQrBtn" onclick="switchTab('qr')">📷 По QR-коду</button>
            <button class="tab-btn" id="tabCodeBtn" onclick="switchTab('code')">🔑 По коду телефона</button>
          </div>

          <!-- Tab 1: QR Code -->
          <div id="tabQr">
            <div id="qrContent">
              <div class="qr-box">
                ${currentQrBase64 ? '<img src="' + currentQrBase64 + '" alt="WhatsApp QR" id="qrImg" />' : '<div style="padding: 90px 20px; color: #94a3b8;">Генерация QR-кода...</div>'}
              </div>
            </div>

            <div class="steps">
              <strong style="color: #fff; display: block; margin-bottom: 8px;">Как привязать по QR:</strong>
              <ol>
                <li>В WhatsApp на телефоне: <strong>Настройки ➔ Связанные устройства</strong></li>
                <li>Нажмите <strong>Привязать устройство</strong></li>
                <li>Наведите камеру на QR-код выше</li>
              </ol>
            </div>
          </div>

          <!-- Tab 2: Pairing Code -->
          <div id="tabCode" style="display: none;">
            <div class="pairing-box">
              <div class="input-group">
                <label>Номер телефона WhatsApp (с кодом страны):</label>
                <input type="text" id="phoneInput" value="+995 591 226 145" placeholder="+995591226145" />
              </div>
              <button onclick="requestPairingCode()" class="btn-primary" id="getCodeBtn">
                Получить код для привязки ✨
              </button>

              <div id="codeResult" style="display: none;" class="code-display">
                <span style="font-size: 0.8rem; color: #94a3b8; display: block; margin-bottom: 6px;">Введите этот 8-значный код в WhatsApp:</span>
                <div class="code-val" id="codeText">---- ----</div>
              </div>
            </div>

            <div class="steps">
              <strong style="color: #fff; display: block; margin-bottom: 8px;">Как привязать по коду:</strong>
              <ol>
                <li>В WhatsApp на телефоне: <strong>Настройки ➔ Связанные устройства</strong></li>
                <li>Нажмите <strong>Привязать устройство</strong></li>
                <li>Внизу нажмите <strong>«Связать по номеру телефона»</strong> (или «Привязать по коду»)</li>
                <li>Введите 8-значный код, показанный выше</li>
              </ol>
            </div>
          </div>

          <button onclick="resetSession()" class="btn-reset">Сбросить сессию и начать заново</button>
        </div>
      </div>

      <script>
        let currentTab = 'qr';
        const BASE_API = window.location.pathname.includes('/whatsapp') ? '/whatsapp/api' : '/api';

        function switchTab(t) {
          currentTab = t;
          document.getElementById('tabCodeBtn').className = 'tab-btn ' + (t === 'code' ? 'active' : '');
          document.getElementById('tabQrBtn').className = 'tab-btn ' + (t === 'qr' ? 'active' : '');
          document.getElementById('tabCode').style.display = t === 'code' ? 'block' : 'none';
          document.getElementById('tabQr').style.display = t === 'qr' ? 'block' : 'none';
        }

        function pollStatus() {
          fetch(BASE_API + '/status')
            .then(r => r.json())
            .then(d => {
              const b = document.getElementById('statusBadge');
              if (d.is_connected) {
                b.className = 'badge connected';
                b.innerHTML = '✅ WhatsApp Подключен: +' + d.phone;
                document.getElementById('setupView').style.display = 'none';
                document.getElementById('connectedView').style.display = 'block';
                document.getElementById('connectedPhoneTxt').innerText = 'WhatsApp Подключен: +' + d.phone;
              } else {
                document.getElementById('setupView').style.display = 'block';
                document.getElementById('connectedView').style.display = 'none';
                if (d.has_qr && d.qr_image) {
                  b.className = 'badge ready';
                  b.innerHTML = '📷 QR-код готов к сканированию (обновлено)';
                  document.getElementById('qrContent').innerHTML = '<div class="qr-box"><img src="' + d.qr_image + '" alt="WhatsApp QR" id="qrImg" /></div>';
                } else {
                  b.className = 'badge loading';
                  b.innerHTML = '⏳ Ожидание привязки...';
                }
              }
            })
            .catch(() => {});
        }

        function requestPairingCode() {
          const phone = document.getElementById('phoneInput').value;
          const btn = document.getElementById('getCodeBtn');
          btn.innerText = 'Генерация кода... ⏳';
          btn.disabled = true;

          fetch(BASE_API + '/pairing-code', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ phone: phone })
          })
          .then(r => r.json())
          .then(data => {
            btn.innerText = 'Получить код для привязки ✨';
            btn.disabled = false;
            if (data.success && data.pairing_code) {
              document.getElementById('codeResult').style.display = 'block';
              document.getElementById('codeText').innerText = data.pairing_code;
            } else if (data.already_connected) {
              alert('WhatsApp уже подключен!');
              pollStatus();
            } else {
              alert('Ошибка: ' + (data.error || 'Не удалось получить код. Попробуйте еще раз.'));
            }
          })
          .catch(err => {
            btn.innerText = 'Получить код для привязки ✨';
            btn.disabled = false;
            alert('Ошибка сети: ' + err);
          });
        }

        function resetSession() {
          if (!confirm('Сбросить привязку WhatsApp и начать заново?')) return;
          fetch(BASE_API + '/reset', { method: 'POST' })
            .then(r => r.json())
            .then(() => {
              alert('Сессия сброшена. Пожалуйста, подождите 2 секунды.');
              pollStatus();
            });
        }

        pollStatus();
        setInterval(pollStatus, 2500);
      </script>
    </body>
    </html>
  `);
});

app.listen(PORT, () => {
  logger.info(`🚀 WhatsApp Gateway HTTP Server running on http://127.0.0.1:${PORT}`);
  connectToWhatsApp();
});
