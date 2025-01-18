const fs = require('fs/promises');
const path = require('path');

async function copyDir(srcDir, destDir) {

  const files = await fs.readdir(srcDir);

  await fs.mkdir(destDir, { recursive: true });

  for (const file of files) {
    const srcFile = path.join(srcDir, file);
    const destFile = path.join(destDir, file);
    await fs.copyFile(srcFile, destFile);
  }
}

const srcDir = path.join(__dirname, 'files'); // Папка с файлами для копирования
const destDir = path.join(__dirname, 'files-copy'); // Папка, куда будут копироваться файлы

copyDir(srcDir, destDir);
