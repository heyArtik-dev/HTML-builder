const fs = require('fs/promises');
const path = require('path');

async function combineCssFiles(sourceDir, destFile) {
        const files = await fs.readdir(sourceDir);
        
        // Фильтруем только CSS файлы
        const cssFiles = files.filter(file => path.extname(file) === '.css');

        // Создаем массив для хранения содержимого CSS файлов
        const cssContents = [];

        // Читаем каждый CSS файл и добавляем его содержимое в массив
        for (const file of cssFiles) {
            const filePath = path.join(sourceDir, file);
            const content = await fs.readFile(filePath, 'utf-8');
            cssContents.push(content);
        }

        // Объединяем содержимое всех CSS файлов
        const combinedCss = cssContents.join('\n');

        // Записываем объединенное содержимое в новый файл
        await fs.writeFile(destFile, combinedCss);
}

// Укажите путь к директории с исходными CSS файлами и путь к выходному файлу
const sourceDirectory = path.join(__dirname, 'styles'); // Папка с CSS файлами
const destinationFile = path.join(__dirname, 'project-dist', 'bundle.css'); // Путь к выходному файлу

combineCssFiles(sourceDirectory, destinationFile);
