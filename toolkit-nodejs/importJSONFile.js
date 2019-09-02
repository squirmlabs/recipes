'use strict';

import { read } from './file.js';

// Helper function to import a JSON file.

function importJsonFile(filePath) {
  return read(filePath).then(textFileData => {
    return JSON.parse(textFileData);
  });
}

export default importJsonFile;
