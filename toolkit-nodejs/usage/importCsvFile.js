"use strict";

const path = require('path');
const importCsvFile = require('../importCsvFile.js');

importCsvFile(path.resolve(__dirname, "../earthquakes.csv"))
	.then(data => {
		console.log(data);
	})
	.catch(err => {
		console.error("An error occurred.");
		console.error(err.stack);
	});
