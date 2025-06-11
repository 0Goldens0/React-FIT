# Скрипт для сохранения логотипов партнеров

# Создаем директорию, если она не существует
$dir = $PSScriptRoot
if (-not (Test-Path $dir)) {
    New-Item -ItemType Directory -Path $dir
}

# Функция для сохранения изображения из буфера обмена
function Save-ImageFromClipboard {
    param (
        [string]$OutputPath
    )
    
    Add-Type -AssemblyName System.Windows.Forms
    Add-Type -AssemblyName System.Drawing
    
    $clipboard = [System.Windows.Forms.Clipboard]::GetImage()
    
    if ($clipboard -ne $null) {
        try {
            $clipboard.Save($OutputPath)
            Write-Host "Изображение сохранено в $OutputPath"
        }
        catch {
            Write-Host "Ошибка при сохранении: $_"
        }
    }
    else {
        Write-Host "В буфере обмена нет изображения"
    }
}

Write-Host "Вставьте изображение в буфер обмена (Ctrl+C) и нажмите Enter для сохранения"
Write-Host "Инструкции:"
Write-Host "1. Откройте изображение логотипа, которое вы хотите сохранить"
Write-Host "2. Скопируйте его в буфер обмена (Ctrl+C)"
Write-Host "3. Вернитесь в эту консоль и нажмите Enter"
Write-Host "4. Повторите для всех логотипов"
Write-Host "5. Нажмите Ctrl+C, чтобы завершить скрипт"

$logos = @(
    "my-shop.png",
    "pleer-ru.jpg",
    "samorezik.png",
    "ozon.jpg",
    "autodoc.png",
    "vse-instrumenti.jpg",
    "minimaks.jpg",
    "etm.jpeg",
    "russvet.png"
)

foreach ($logo in $logos) {
    $outputPath = Join-Path $dir $logo
    Write-Host "Готов к сохранению $logo. Скопируйте изображение и нажмите Enter..."
    Read-Host
    Save-ImageFromClipboard -OutputPath $outputPath
}

Write-Host "Все логотипы сохранены!" 