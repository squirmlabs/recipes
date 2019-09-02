'use strict';

// Modules
const importJsonFromRestApi = require('../importJsonFromRestApi.js');

const url =
  'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_month.geojson';

// USAGE: Use toolkit function to import data from the REST API.
importJsonFromRestApi(url)
  .then(data => {
    
    // Callback to handle imported data.
    const earthquakes = data.features.map(feature => {
      // Restructure incoming data to the CDR.
      const earthquake = Object.assign({}, feature.properties, {
        id: feature.id
      });

      return earthquake;
    });

    // Print the data to the console so that we can verify it.
    console.log(earthquakes);

  })
  .catch(err => {

    // Handle any error that might have occurred.
    console.error('An error occurred.');
    console.error(err.stack);

  });
