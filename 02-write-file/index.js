const fs = require('fs');
const path = require('path');
const { stdin } = process;

console.log('Hello. This app for add text to file!');

const filePath = path.join(__dirname, 'text.txt');

stdin.on("data", (data) => {
  const dataStr = data.toString().trim();

  if (dataStr.toLowerCase() === "exit") {
    console.log('Thank you for use app. Good bye!');
    process.exit();
  }

  fs.appendFile(filePath, dataStr + '\n', (err) => {
    if (err) {
      console.error('Error: ', err);
    }
  });
})

process.on('SIGINT', () => {
  console.log('Thank you for use app. Good bye!');
  process.exit();
});
