const fs = require('fs');
const path = require('path');

const dir = path.resolve(__dirname, 'secret-folder');

fs.readdir(dir,
  { withFileTypes: true },
  (err, files) => {
    if (err)
      console.log(err);
    else {

      files.forEach(file => {

        fs.stat(`${dir}\\${file.name}`, (err, stats) => {
          if (err) {
            console.error(err);
            return;
          }
          console.log(`${file.name.slice(0, file.name.indexOf('.'))} - ${path.extname(file.name)} - ${stats.size} bytes`);
        });
      })
    }
  })