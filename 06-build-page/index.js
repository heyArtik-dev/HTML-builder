const fs = require('fs/promises');
const path = require('path');

async function createProjectDist() {
    // Шаг 1: Создание папки project-dist
    const distDir = path.join(__dirname, 'project-dist');
    await fs.mkdir(distDir, { recursive: true });

    // Шаг 2: Чтение шаблона
    const templatePath = path.join(__dirname, 'template.html');
    let templateContent = await fs.readFile(templatePath, 'utf-8');

    // Шаг 3: Получение списка компонентов
    const componentsDir = path.join(__dirname, 'components');
    const componentFiles = await fs.readdir(componentsDir);
    
    // Заменяем теги шаблона на содержимое компонентов
    for (const file of componentFiles) {
        const componentName = path.basename(file, path.extname(file));
        const componentPath = path.join(componentsDir, file);
        const componentContent = await fs.readFile(componentPath, 'utf-8');
        
        const templateTag = `{{${componentName}}}`;
        templateContent = templateContent.replace(new RegExp(templateTag, 'g'), componentContent);
    }

    // Записываем измененный шаблон в index.html
    const indexPath = path.join(distDir, 'index.html');
    await fs.writeFile(indexPath, templateContent);

    // Шаг 4: Компиляция стилей
    const stylesDir = path.join(__dirname, 'styles');
    const styleFiles = await fs.readdir(stylesDir);
    const cssContents = [];

    for (const file of styleFiles) {
        if (path.extname(file) === '.css') {
            const stylePath = path.join(stylesDir, file);
            const styleContent = await fs.readFile(stylePath, 'utf-8');
            cssContents.push(styleContent);
        }
    }

    const combinedCss = cssContents.join('\n');
    const stylePath = path.join(distDir, 'style.css');
    await fs.writeFile(stylePath, combinedCss);

    // Шаг 5: Копирование папки assets
    const assetsSrc = path.join(__dirname, 'assets');
    const assetsDest = path.join(distDir, 'assets');
    await copyDirectory(assetsSrc, assetsDest);
}

// Функция для копирования директории
async function copyDirectory(src, dest) {
    await fs.mkdir(dest, { recursive: true });
    const files = await fs.readdir(src);
    for (const file of files) {
        const srcPath = path.join(src, file);
        const destPath = path.join(dest, file);
        const stat = await fs.stat(srcPath);
        if (stat.isDirectory()) {
            await copyDirectory(srcPath, destPath);
        } else {
            await fs.copyFile(srcPath, destPath);
        }
    }
}

// Запуск функции
createProjectDist();