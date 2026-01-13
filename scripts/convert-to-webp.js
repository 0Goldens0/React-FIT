import sharp from 'sharp';
import { readdirSync, statSync, existsSync } from 'fs';
import { join, extname, basename } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const imgDir = join(__dirname, '../public/img');

// Расширения для конвертации
const imageExtensions = ['.png', '.jpg', '.jpeg'];

// Файлы-исключения (логотипы и SVG)
const excludePatterns = [
  'logo', 'Logo', 'LOGO',
  'svg.svg'
];

let totalConverted = 0;
let totalSaved = 0;

/**
 * Проверяет, нужно ли исключить файл
 */
function shouldExclude(filename) {
  return excludePatterns.some(pattern => filename.includes(pattern));
}

/**
 * Рекурсивно обходит директории и конвертирует изображения
 */
async function convertDirectory(dirPath) {
  const items = readdirSync(dirPath);

  for (const item of items) {
    const fullPath = join(dirPath, item);
    const stat = statSync(fullPath);

    if (stat.isDirectory()) {
      // Рекурсивно обрабатываем поддиректории
      await convertDirectory(fullPath);
    } else if (stat.isFile()) {
      const ext = extname(item).toLowerCase();
      const baseName = basename(item, ext);
      
      // Проверяем, нужно ли конвертировать
      if (imageExtensions.includes(ext) && !shouldExclude(item)) {
        const webpPath = join(dirPath, `${baseName}.webp`);
        
        // Если webp уже существует, пропускаем
        if (existsSync(webpPath)) {
          console.log(`⏭️  Пропускаем (уже существует): ${item}`);
          continue;
        }

        try {
          const originalSize = stat.size;
          
          // Конвертируем в WebP с качеством 85
          await sharp(fullPath)
            .webp({ quality: 85 })
            .toFile(webpPath);
          
          const webpStat = statSync(webpPath);
          const webpSize = webpStat.size;
          const savedBytes = originalSize - webpSize;
          const savedPercent = ((savedBytes / originalSize) * 100).toFixed(1);
          
          totalConverted++;
          totalSaved += savedBytes;
          
          console.log(`✅ ${item} → ${baseName}.webp`);
          console.log(`   Размер: ${(originalSize / 1024).toFixed(1)}KB → ${(webpSize / 1024).toFixed(1)}KB (экономия ${savedPercent}%)`);
          
        } catch (error) {
          console.error(`❌ Ошибка при конвертации ${item}:`, error.message);
        }
      }
    }
  }
}

/**
 * Главная функция
 */
async function main() {
  console.log('🖼️  Конвертация изображений в WebP...\n');
  console.log(`📁 Директория: ${imgDir}\n`);
  
  try {
    await convertDirectory(imgDir);
    
    console.log('\n' + '='.repeat(60));
    console.log(`✨ Готово!`);
    console.log(`📊 Статистика:`);
    console.log(`   - Конвертировано файлов: ${totalConverted}`);
    console.log(`   - Общая экономия: ${(totalSaved / 1024 / 1024).toFixed(2)} MB`);
    console.log('='.repeat(60));
    
  } catch (error) {
    console.error('❌ Критическая ошибка:', error);
    process.exit(1);
  }
}

main();

