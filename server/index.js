import express from 'express';
import cors from 'cors';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import rateLimit from 'express-rate-limit';

dotenv.config();

const app = express();
const PORT = 3070;

// Middleware
app.use(cors());
app.use(express.json());

// ЗАЩИТА ОТ СПАМА: Rate Limiting
const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 минут
  max: 3, // Максимум 3 запроса с одного IP за 15 минут
  message: {
    success: false,
    message: 'Слишком много запросов. Пожалуйста, попробуйте позже через 15 минут.'
  },
  standardHeaders: true,
  legacyHeaders: false,
  // Пропускаем OPTIONS запросы
  skip: (req) => req.method === 'OPTIONS',
  handler: (req, res) => {
    res.status(429).json({
      success: false,
      message: 'Слишком много попыток отправки. Попробуйте через 15 минут.'
    });
  }
});

// Email транспортер
let transporter;
let isTestMode = false;

async function setupEmail() {
  // Проверяем есть ли настройки в .env
  if (process.env.SMTP_USER && process.env.SMTP_PASS) {
    transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.yandex.ru',
      port: Number(process.env.SMTP_PORT) || 465,
      secure: true, // true для 465
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
  } else {
    const testAccount = await nodemailer.createTestAccount();
    isTestMode = true;
    
    transporter = nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      secure: false,
      auth: {
        user: testAccount.user,
        pass: testAccount.pass,
      },
    });
  }
}

setupEmail();

// API endpoint для отправки контактной формы (с защитой от спама)
app.post('/api/contact', contactLimiter, async (req, res) => {
  try {
    const { name, email, company, city, message } = req.body;

    if (!transporter) {
      throw new Error('Email транспортер еще не готов, подождите...');
    }

    // Настройки письма
    const recipientEmail = process.env.RECIPIENT_EMAIL || 'test@example.com';
    const fromEmail = process.env.SMTP_USER || 'no-reply@fit-test.com';
    
    const mailOptions = {
      from: `"FIT - Инструменты и оборудование" <${fromEmail}>`,
      to: recipientEmail,
      replyTo: email,
      subject: `🔔 Новое обращение от ${name}`,
      html: `
        <!DOCTYPE html>
        <html lang="ru">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <style>
            * {
              margin: 0;
              padding: 0;
              box-sizing: border-box;
            }
            body {
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', sans-serif;
              line-height: 1.6;
              color: #333;
              background-color: #f5f5f5;
              padding: 20px;
            }
            .email-container {
              max-width: 600px;
              margin: 0 auto;
              background: #ffffff;
              border-radius: 12px;
              overflow: hidden;
              box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
            }
            .email-header {
              background: linear-gradient(135deg, #FFB800 0%, #FFA500 100%);
              padding: 30px;
              text-align: center;
              color: #000;
            }
            .email-header h1 {
              font-size: 28px;
              font-weight: 700;
              margin-bottom: 8px;
              text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
            }
            .email-header p {
              font-size: 14px;
              opacity: 0.9;
              margin: 0;
            }
            .email-body {
              padding: 35px 30px;
            }
            .alert-badge {
              display: inline-block;
              background: #fff3cd;
              color: #856404;
              padding: 8px 16px;
              border-radius: 20px;
              font-size: 13px;
              font-weight: 600;
              margin-bottom: 25px;
              border-left: 3px solid #FFB800;
            }
            .info-section {
              background: #f8f9fa;
              border-left: 4px solid #FFB800;
              padding: 20px;
              margin-bottom: 20px;
              border-radius: 6px;
            }
            .info-section h3 {
              font-size: 14px;
              color: #666;
              text-transform: uppercase;
              letter-spacing: 1px;
              margin-bottom: 12px;
              font-weight: 600;
            }
            .info-row {
              display: flex;
              padding: 10px 0;
              border-bottom: 1px solid #e9ecef;
            }
            .info-row:last-child {
              border-bottom: none;
            }
            .info-label {
              font-weight: 600;
              color: #555;
              min-width: 120px;
              font-size: 14px;
            }
            .info-value {
              color: #333;
              font-size: 14px;
              word-break: break-word;
            }
            .info-value a {
              color: #FFB800;
              text-decoration: none;
              font-weight: 500;
            }
            .info-value a:hover {
              text-decoration: underline;
            }
            .message-section {
              background: #ffffff;
              border: 2px solid #e9ecef;
              border-radius: 8px;
              padding: 20px;
              margin-top: 20px;
            }
            .message-section h3 {
              font-size: 16px;
              color: #333;
              margin-bottom: 12px;
              font-weight: 600;
            }
            .message-content {
              color: #555;
              font-size: 15px;
              line-height: 1.7;
              white-space: pre-wrap;
              word-wrap: break-word;
            }
            .action-buttons {
              margin-top: 25px;
              text-align: center;
              padding-top: 20px;
              border-top: 1px solid #e9ecef;
            }
            .btn {
              display: inline-block;
              padding: 12px 28px;
              background: linear-gradient(135deg, #FFB800 0%, #FFA500 100%);
              color: #000;
              text-decoration: none;
              border-radius: 6px;
              font-weight: 600;
              font-size: 14px;
              box-shadow: 0 4px 12px rgba(255, 184, 0, 0.3);
              transition: all 0.3s ease;
            }
            .btn:hover {
              box-shadow: 0 6px 16px rgba(255, 184, 0, 0.4);
              transform: translateY(-2px);
            }
            .email-footer {
              background: #2c2c2c;
              color: #999;
              padding: 25px 30px;
              text-align: center;
              font-size: 12px;
            }
            .email-footer p {
              margin: 5px 0;
            }
            .email-footer a {
              color: #FFB800;
              text-decoration: none;
            }
            .timestamp {
              display: inline-block;
              background: #f8f9fa;
              padding: 6px 12px;
              border-radius: 4px;
              font-size: 12px;
              color: #666;
              margin-top: 15px;
            }
          </style>
        </head>
        <body>
          <div class="email-container">
            <!-- Header -->
            <div class="email-header">
              <h1>🔔 Новое обращение</h1>
              <p>Сообщение с формы обратной связи сайта</p>
            </div>

            <!-- Body -->
            <div class="email-body">
              <div class="alert-badge">
                ⚡ Требуется ответ
              </div>

              <!-- Contact Info -->
              <div class="info-section">
                <h3>📋 Информация о клиенте</h3>
                
                <div class="info-row">
                  <div class="info-label">👤 Имя:</div>
                  <div class="info-value">${name}</div>
                </div>
                
                <div class="info-row">
                  <div class="info-label">📧 Email:</div>
                  <div class="info-value">
                    <a href="mailto:${email}">${email}</a>
                  </div>
                </div>
                
                ${company ? `
                <div class="info-row">
                  <div class="info-label">🏢 Компания:</div>
                  <div class="info-value">${company}</div>
                </div>
                ` : ''}
                
                ${city ? `
                <div class="info-row">
                  <div class="info-label">📍 Город:</div>
                  <div class="info-value">${city}</div>
                </div>
                ` : ''}
              </div>

              <!-- Message -->
              <div class="message-section">
                <h3>💬 Сообщение</h3>
                <div class="message-content">${message}</div>
              </div>

              <!-- Action Buttons -->
              <div class="action-buttons">
                <a href="mailto:${email}?subject=Re: Ваше обращение в FIT" class="btn">
                  ✉️ Ответить клиенту
                </a>
              </div>

              <div style="text-align: center;">
                <span class="timestamp">
                  🕐 Получено: ${new Date().toLocaleString('ru-RU', { 
                    day: '2-digit',
                    month: 'long',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </span>
              </div>
            </div>

            <!-- Footer -->
            <div class="email-footer">
              <p><strong>FIT - Инструменты и оборудование</strong></p>
              <p>📞 8 (800) 511-12-33 | 📧 <a href="mailto:info@instrument-fit.ru">info@instrument-fit.ru</a></p>
              <p style="margin-top: 12px; color: #666;">
                Это автоматическое уведомление с сайта instrument-fit.ru
              </p>
            </div>
          </div>
        </body>
        </html>
      `,
      text: `
═══════════════════════════════════════
  НОВОЕ ОБРАЩЕНИЕ С САЙТА FIT
═══════════════════════════════════════

📋 ИНФОРМАЦИЯ О КЛИЕНТЕ:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
👤 Имя: ${name}
📧 Email: ${email}
${company ? `🏢 Компания: ${company}` : ''}
${city ? `📍 Город: ${city}` : ''}

💬 СООБЩЕНИЕ:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
${message}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🕐 Получено: ${new Date().toLocaleString('ru-RU')}

---
FIT - Инструменты и оборудование
📞 8 (800) 511-12-33
📧 info@instrument-fit.ru
🌐 fit24.ru
      `.trim(),
    };

    // Отправка email
    const info = await transporter.sendMail(mailOptions);
    
    // В тестовом режиме показываем ссылку для просмотра
    let previewUrl = null;
    if (isTestMode) {
      previewUrl = nodemailer.getTestMessageUrl(info);
    }

    res.status(200).json({
      success: true,
      message: 'Сообщение успешно отправлено',
      previewUrl: previewUrl,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Ошибка при отправке. Попробуйте позже.',
    });
  }
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    ready: !!transporter,
  });
});

app.listen(PORT);

