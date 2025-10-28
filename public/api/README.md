# Настройка формы обратной связи

## 📧 Установка

### 1. Настройте email получателя
Откройте файл `contact.php` и измените строку 18:
```php
$to = 'info@instrument-fit.ru'; // ИЗМЕНИТЕ НА ВАШ EMAIL
```

### 2. Настройте отправителя (опционально)
Строка 106:
```php
$headers .= "From: FIT Website <noreply@instrument-fit.ru>\r\n";
```

### 3. Проверьте работу PHP mail()
Убедитесь, что на вашем хостинге работает функция `mail()`.

Для проверки создайте тестовый файл `test-mail.php`:
```php
<?php
if (mail('your@email.com', 'Test', 'Test message')) {
    echo 'Mail works!';
} else {
    echo 'Mail failed!';
}
?>
```

## 🚀 Использование

Форма автоматически отправляет POST запрос на `/api/contact.php`

### Формат запроса:
```json
{
  "name": "Иван Иванов",
  "email": "ivan@example.com",
  "company": "ООО Компания",
  "message": "Текст сообщения",
  "timestamp": "2025-01-01T12:00:00.000Z"
}
```

### Формат ответа (успех):
```json
{
  "success": true,
  "message": "Сообщение успешно отправлено"
}
```

### Формат ответа (ошибка):
```json
{
  "success": false,
  "message": "Описание ошибки"
}
```

## 🔒 Безопасность

Скрипт включает:
- ✅ Валидацию email
- ✅ Очистку данных от HTML тегов
- ✅ Проверку метода запроса (только POST)
- ✅ CORS заголовки
- ✅ Защиту от инъекций

## 🛠 Альтернативные решения

### Если mail() не работает на хостинге:

#### 1. **SMTP отправка через PHPMailer**
```bash
composer require phpmailer/phpmailer
```

#### 2. **Готовые сервисы (без PHP)**
- **Formspree**: https://formspree.io
- **EmailJS**: https://www.emailjs.com
- **Web3Forms**: https://web3forms.com

#### 3. **Telegram Bot**
Отправка в Telegram вместо email

## 📝 Логи

Ошибки PHP сохраняются в файл `error_log` на сервере.

## 🧪 Тестирование

Используйте curl для проверки:
```bash
curl -X POST http://your-site.com/api/contact.php \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test",
    "email": "test@example.com",
    "company": "Test Co",
    "message": "Test message"
  }'
```

## 📞 Поддержка

При проблемах проверьте:
1. PHP версия >= 7.0
2. Функция `mail()` доступна
3. Права на запись в директорию (для логов)
4. CORS настройки сервера

