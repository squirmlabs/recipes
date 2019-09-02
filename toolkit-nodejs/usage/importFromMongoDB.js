'use strict';

const mongo = require('promised-mongo');
const importFromMongoDB = require('../importFromMongoDB.js');

// const db = mongo('localhost:6000/earthquakes', ['largest_earthquakes']);
const db = mongo('localhost:27017/earthquakes', ['largest_earthquakes']);

importFromMongoDB(db, 'largest_earthquakes')
  .then(data => {
    console.log(data);
  })
  .then(() => db.close())
  .catch(err => {
    console.error(err);
  });
