import { copyFileSync, mkdirSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const rootDir = join(__dirname, '..');
const publicApiDir = join(rootDir, 'public', 'api');
const distApiDir = join(rootDir, 'dist', 'api');

// Создаем директорию api в dist, если её нет
if (!existsSync(distApiDir)) {
  mkdirSync(distApiDir, { recursive: true });
}

// Список файлов для копирования
const filesToCopy = [
  'contact.php',
  'test-mail.php',
  '.htaccess'
];

console.log('📦 Копирование API файлов в dist/...');

filesToCopy.forEach(file => {
  const source = join(publicApiDir, file);
  const destination = join(distApiDir, file);
  
  if (existsSync(source)) {
    copyFileSync(source, destination);
    console.log(`✅ Скопирован: ${file}`);
  } else {
    console.warn(`⚠️  Файл не найден: ${file}`);
  }
});

console.log('✨ Готово! API файлы скопированы в dist/api/');

