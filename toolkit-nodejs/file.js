const fs = require('fs');

function read(filePath) {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, 'utf8', (err, textFileData) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(textFileData);
    });
  });
}

module.exports = {
  read: read
};
