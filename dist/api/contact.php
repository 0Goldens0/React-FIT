<?php
// Настройки
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// Обработка preflight запроса
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Только POST запросы
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Метод не разрешен']);
    exit();
}

// Email получателя (ИЗМЕНИТЕ НА СВОЙ!)
$to = 'EcoKozhevnikov@yandex.ru';

// Получаем данные
$json = file_get_contents('php://input');
$data = json_decode($json, true);

// Валидация данных
if (!isset($data['name']) || !isset($data['email']) || !isset($data['message'])) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Не все поля заполнены']);
    exit();
}

$name = strip_tags(trim($data['name']));
$email = filter_var(trim($data['email']), FILTER_SANITIZE_EMAIL);
$company = isset($data['company']) ? strip_tags(trim($data['company'])) : 'Не указана';
$message = strip_tags(trim($data['message']));
$timestamp = isset($data['timestamp']) ? $data['timestamp'] : date('Y-m-d H:i:s');

// Проверка email
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Некорректный email']);
    exit();
}

// Защита от пустых сообщений
if (empty($name) || empty($message)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Имя и сообщение обязательны']);
    exit();
}

// Формируем письмо
$subject = "Новая заявка с сайта FIT - от $name";

$email_content = "
<!DOCTYPE html>
<html>
<head>
    <meta charset='UTF-8'>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #FFB800 0%, #FFA000 100%); color: #1a1a1a; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
        .content { background: #f9f9f9; padding: 30px; border: 1px solid #e0e0e0; }
        .field { margin-bottom: 20px; }
        .field-label { font-weight: bold; color: #666; margin-bottom: 5px; }
        .field-value { color: #333; padding: 10px; background: white; border-left: 3px solid #FFB800; }
        .footer { background: #333; color: white; padding: 15px; text-align: center; font-size: 12px; border-radius: 0 0 8px 8px; }
    </style>
</head>
<body>
    <div class='container'>
        <div class='header'>
            <h2>📧 Новая заявка с сайта</h2>
        </div>
        <div class='content'>
            <div class='field'>
                <div class='field-label'>👤 Имя:</div>
                <div class='field-value'>$name</div>
            </div>
            
            <div class='field'>
                <div class='field-label'>📧 Email:</div>
                <div class='field-value'><a href='mailto:$email'>$email</a></div>
            </div>
            
            <div class='field'>
                <div class='field-label'>🏢 Компания:</div>
                <div class='field-value'>$company</div>
            </div>
            
            <div class='field'>
                <div class='field-label'>💬 Сообщение:</div>
                <div class='field-value'>$message</div>
            </div>
            
            <div class='field'>
                <div class='field-label'>🕐 Время отправки:</div>
                <div class='field-value'>$timestamp</div>
            </div>
        </div>
        <div class='footer'>
            <p>Это автоматическое сообщение с сайта FIT</p>
            <p>Для ответа используйте email: $email</p>
        </div>
    </div>
</body>
</html>
";

// Заголовки письма
$headers = "MIME-Version: 1.0\r\n";
$headers .= "Content-Type: text/html; charset=UTF-8\r\n";
// ВАЖНО: Измените на email с вашего домена (например, noreply@ваш-домен.ru)
// Это уменьшит вероятность попадания в спам
$headers .= "From: FIT Website <noreply@instrument-fit.ru>\r\n";
$headers .= "Reply-To: $email\r\n"; // Адрес клиента для ответа
$headers .= "X-Mailer: PHP/" . phpversion();

// Отправка письма
if (mail($to, $subject, $email_content, $headers)) {
    http_response_code(200);
    echo json_encode([
        'success' => true, 
        'message' => 'Сообщение успешно отправлено'
    ]);
} else {
    http_response_code(500);
    echo json_encode([
        'success' => false, 
        'message' => 'Ошибка при отправке письма'
    ]);
}
?>

