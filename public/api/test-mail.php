<?php
/**
 * Тестовый файл для проверки работы mail() на сервере
 * Удалите этот файл после проверки!
 */

// ИЗМЕНИТЕ НА ВАШ EMAIL
$test_email = 'EcoKozhevnikov@yandex.ru';

echo "<h2>Тест отправки почты</h2>";

$subject = "Тест mail() - FIT Website";
$message = "Это тестовое письмо. Если вы его получили, значит функция mail() работает корректно!";
// Измените на email с вашего домена
$headers = "From: FIT Website <noreply@instrument-fit.ru>\r\n";
$headers .= "Content-Type: text/html; charset=UTF-8\r\n";

if (mail($test_email, $subject, $message, $headers)) {
    echo "<p style='color: green;'>✅ Письмо успешно отправлено на $test_email</p>";
    echo "<p>Проверьте почту (включая папку Спам)</p>";
} else {
    echo "<p style='color: red;'>❌ Ошибка отправки письма</p>";
    echo "<p>Функция mail() не работает на этом сервере.</p>";
    echo "<p><strong>Возможные причины:</strong></p>";
    echo "<ul>";
    echo "<li>mail() отключена в настройках PHP</li>";
    echo "<li>Сервер не настроен для отправки почты</li>";
    echo "<li>Требуется SMTP настройка</li>";
    echo "</ul>";
    echo "<p><strong>Решения:</strong></p>";
    echo "<ul>";
    echo "<li>Обратитесь в поддержку хостинга</li>";
    echo "<li>Используйте PHPMailer с SMTP</li>";
    echo "<li>Используйте готовый сервис (Formspree, EmailJS)</li>";
    echo "</ul>";
}

echo "<hr>";
echo "<h3>Информация о сервере:</h3>";
echo "<p>PHP версия: " . phpversion() . "</p>";
echo "<p>Sendmail path: " . ini_get('sendmail_path') . "</p>";
echo "<p>SMTP: " . ini_get('SMTP') . "</p>";
echo "<p>SMTP Port: " . ini_get('smtp_port') . "</p>";

echo "<hr>";
echo "<p style='color: orange;'><strong>⚠️ ВАЖНО: Удалите этот файл после тестирования!</strong></p>";
?>

