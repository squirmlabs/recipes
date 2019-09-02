const bicycle_routes_url = '../data/bicycle_routes.txt';

readFilePromise(bicycle_routes_url)
  .then(content => {
    console.log(content);
  })
  .catch(err => {
    console.error('An error occurred.');
    console.error(err);
  });

function readFilePromise(filePath) {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, 'utf8', (err, content) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(content);
    });
  });
}
