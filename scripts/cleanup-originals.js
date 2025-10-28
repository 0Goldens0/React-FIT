import { readdirSync, statSync, existsSync, unlinkSync } from 'fs';
import { join, extname, basename } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const imgDir = join(__dirname, '../public/img');

// Расширения для удаления
const imageExtensions = ['.png', '.jpg', '.jpeg'];

// Файлы-исключения (не удалять)
const excludePatterns = [
  'logo', 'Logo', 'LOGO',
  'svg.svg'
];

let totalDeleted = 0;
let totalSpaceFreed = 0;

/**
 * Проверяет, нужно ли исключить файл
 */
function shouldExclude(filename) {
  return excludePatterns.some(pattern => filename.includes(pattern));
}

/**
 * Рекурсивно обходит директории и удаляет оригиналы
 */
function cleanupDirectory(dirPath) {
  const items = readdirSync(dirPath);

  for (const item of items) {
    const fullPath = join(dirPath, item);
    const stat = statSync(fullPath);

    if (stat.isDirectory()) {
      // Рекурсивно обрабатываем поддиректории
      cleanupDirectory(fullPath);
    } else if (stat.isFile()) {
      const ext = extname(item).toLowerCase();
      const baseName = basename(item, ext);
      
      // Проверяем, нужно ли удалять
      if (imageExtensions.includes(ext) && !shouldExclude(item)) {
        const webpPath = join(dirPath, `${baseName}.webp`);
        
        // Удаляем только если есть соответствующий WebP файл
        if (existsSync(webpPath)) {
          const fileSize = stat.size;
          
          try {
            unlinkSync(fullPath);
            
            totalDeleted++;
            totalSpaceFreed += fileSize;
            
            console.log(`🗑️  Удалено: ${item} (${(fileSize / 1024).toFixed(1)}KB)`);
            
          } catch (error) {
            console.error(`❌ Ошибка при удалении ${item}:`, error.message);
          }
        } else {
          console.log(`⚠️  Пропущено (нет WebP): ${item}`);
        }
      }
    }
  }
}

/**
 * Главная функция
 */
function main() {
  console.log('🗑️  Удаление оригинальных изображений...\n');
  console.log(`📁 Директория: ${imgDir}\n`);
  console.log('⚠️  ВНИМАНИЕ: Будут удалены только файлы, для которых существует WebP версия!\n');
  
  try {
    cleanupDirectory(imgDir);
    
    console.log('\n' + '='.repeat(60));
    console.log(`✨ Готово!`);
    console.log(`📊 Статистика:`);
    console.log(`   - Удалено файлов: ${totalDeleted}`);
    console.log(`   - Освобождено места: ${(totalSpaceFreed / 1024 / 1024).toFixed(2)} MB`);
    console.log('='.repeat(60));
    
  } catch (error) {
    console.error('❌ Критическая ошибка:', error);
    process.exit(1);
  }
}

main();

