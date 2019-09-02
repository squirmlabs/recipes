# Build out toolkit

Tools that you need to move data from place to place.

| Type   | Data Source | Data Format | Tools                     | Methods                      |
| ------ | ----------- | ----------- | ------------------------- | ---------------------------- |
| Import | Text file   | JSON        | Node.js API               | fs.readfile, JSON.parse      |
|        |             | CSV         | Node.js API,PapaParse     | fs.readFile, Papa.parse      |
|        | REST API    | JSON        | request-promise           | request.get                  |
|        |             | CSV         | request-promise,PapaParse | request.get, Papa.parse      |
|        | Database    | MongoDB     | promised-mongo            | <database>.find              |
|        |             | MySQL       | nodejs-mysql              | <database>.exec              |
| Export | Text File   | JSON        | Node.js API               | fs.writeFile, JSON.stringify |
|        |             | CSV         | Node.js API,PapaParse     | fs.writeFile, Papa.parse     |
|        | Database    | MongoDB     | promised-mongo            | <database>.insert            |
|        |             | MySQL       | nodejs-mysql              | <database>.exec              |

## CDR - The Core Data Representation

This is a design pattern for structuring data pipelines. The CDR allows us to piece together flexible data pipelines from reusable code modules. With this design pattern, we can produce an almost infinite variety of data processing and conversion pipelines.

![alt text](https://i.imgur.com/F1TZg1c.png "A data pipeline with stages that communicate through the core data representation")

> A data pipeline with stages that communicate through the core data representation

CDR is the glue that binds together our data pipeline. The CDR is a shared representation of our data, and its purpose is to allow our pipeline stages to communicate and be cleanly separated with no hard dependencies on each other.

### Abilities of CDR 

> This separation is what allows us to build reusable code modules that we can then rearrange to create other data pipelines.

> The separation of the stages also gives us flexibility—we can restructure our data
pipeline by rearranging the stages or by adding and removing stages. These modifications
are easily made because the stages are only dependent on the CDR, and they don’t
require any particular sequence of preceding stages.

> Use the CDR to bridge the gap between our import and export code. This allows us to piece together data conversion pipelines from reusable code modules. We can mix and match import and export code to build a pipeline that converts data from any one format to any other.

> Flexibility is key. We must accept data from other websites and organizations in whatever format they provide it.

> We also want to be a good data sharing citizen, so not only do we make the data available through web pages and visualizations, we also want to make the data available in various machine-readable formats. Put succinctly, we must both import and export a variety of formats into and out of our data pipeline.

The CDR should be simple to understand: after all it’s just a JavaScript array of data. Each array element corresponds to a row in earthquakes.csv. Each array element contains a JavaScript object, or a record if you will, and each field corresponds to a column in earthquakes.csv.

![alt text](https://i.imgur.com/x1XEhde.png "Elements in a JavaScript array correspond to rows in earthquakes.csv.")

> Elements in a JavaScript array correspond to rows in earthquakes.csv.

## Create a data conversion pipeline

To create a data conversion pipeline, we must import from a data format and then
export to another. As one example, let’s take earthquakes.csv and import it into a MongoDB earthquakes database. To do this, we’ll need code to import the data from the
CSV file and then code to export the data to the MongoDB database.

![alt text](https://i.imgur.com/mMVolEm.png "Fields in JavaScript objects correspond to columns in earthquakes.csv.")

> Fields in JavaScript objects correspond to columns in earthquakes.csv.

![alt text](https://i.imgur.com/9UZd932.png "Import and export code feeds through the core data representation.")

## Formats 

| Type    | Data Source         | Notes                                                                                                  |
| ------- | ------------------- | ------------------------------------------------------------------------------------------------------ |
| JSON    | Text file, REST API | The JSON format is built into JavaScript. It’s convenient   and most REST APIs use it.                 |
| CSV     | Text file, REST API | CSV is a more compact format than JSON and is compatible with Excel.                                   |
| MongoDB | Database            | Flexible and convenient, schema-free database. Ideal when you don’t  yet know the format of your data. |
| MySQL   | Database            | Standard relational database. Mature, robust, and reliable.                                            |
| GraphQl | Database            | .....                                                                                                  |

We can easily plug a variety of data formats into our workflow as and when we need them.

CSV is here because it’s so common in data analysis projects. JSON is here because it’s so common in JavaScript and most convenient. MongoDB is here to represent the NoSQL class of databases. MySQL is here to represent the SQL class of databases.

Notice the range of data formats that can be imported into the CDR and then the range of data formats that can be exported from it. By wiring together modular import and export code (communicating using the CDR), we can now build a large variety of data conversion pipelines.

![alt text](https://i.imgur.com/jDfaIxa.png "Select from a variety of data formats to build a custom data conversion process.")

> Using the CDR design pattern, we can easily stitch together whatever data conversion we need to import from any data format on the left (f﻿igure 3.5) and export to any on the right.

> Select from a variety of data formats to build a custom data conversion process

[] Add Amazon DynamoDB, by learning the implementations with node.js
[] Add Cassandra, by learning the implementations with node.js
[] Add XML, by learning the implementations with node.js
[] Add PostgreSQL, by learning the implementations with node.js
[] Add Oracle, by learning the implementations with node.js
[] Add Microsoft SQL, by learning the implementations with node.js
[] Binary Files, by learning the implementations with node.js

## Importing Data

Load data from text files and REST APIs. Both are commonly found in business and data science scenarios. After loading text data—either from text file or REST API—we need to parse, or interpret, it according to a particular data format. 

That’s usually JSON or CSV, two common text formats. Finish by loading data from two different types of databases: MongoDB and MySQL.

### Loading data from text files

![alt text](https://i.imgur.com/H34QxV6.png "Importing a text file to the CDR")
> Importing a text file to the CDR

The general process of importing a text file to the core data representation is illustrated above. Toward the right of the diagram, notice the pathway branches; this is where we interpret the incoming data as a particular format and decode it to the CDR. 

For the moment, though, let’s load the text file into memory. 

In Node.js, we use the fs.readFile function to read the file’s content into memory.

How we parse the file varies according to the data format, but reading the text file into memory is the same in each case. You can run this code, and it will print the contents of the file earthquakes.csv to the console.

```js
"use strict";

const fs = require('fs');

fs.readFile("./data/earthquakes.csv", "utf8",
  (err, textFileData) => {
    if (err) {
      console.error("An error occurred!");
      return;
    }

    console.log(textFileData);
  }
);

```

![alt text](https://i.imgur.com/TKh3EwO.png "Importing a text file to the CDR")
> Reading a text file into memory

#### First function to add to the toolkit

For the convenience of managing the asynchronous operation, we’ll wrap this in a promise. Use boilerplate code that you use each time you load a text file. We’ll reuse this code many times throughout our work, so let’s turn it into a reusable toolkit function.

```js
// file.js
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
```

> This defines a Node.js code module called `file`. For the moment, it contains
the single function called `read`.


![alt text](https://i.imgur.com/dcqoFfG.png "A promise-based function to read a text file (toolkit-nodejs/file.js)")

> A promise-based function to read a text file (toolkit-nodejs/file.js)

#### Usage 

The `file` module is required, and we can now call `file.read` to load `earthquakes.csv` into memory. You can run the code, and it prints the file’s content to the console.

```js
"use strict";

const file = require('./toolkit-nodejs/file.js');

file.read("./data/earthquakes.csv")
  .then(textFileData => {
    console.log(textFileData);
  })
  .catch(err => {
    console.error("An error occurred!");
  });
```

![alt text](https://i.imgur.com/vIR3f55.png "Loading a text file with the promise-based read function")

> Loading a text file with the promise-based read function

#### Loading large files

> What happens when we load a large text file that doesn’t fit in memory?
> When this happens, Node.js raises an out-of-memory error. Although you might be surprised at how much memory you can get away with, ultimately this can be a big problem.

### Loading data from a REST API

Loading data from a REST (REpresentational State Transfer) API using HTTP (HyperText Transfer Protocol). This is a common way to retrieve data over the internet from a website or web service.

To get data by HTTP, we can use the third-party library `request-promise`. The Node.js API has built-in support for HTTP communication, but its good to use a higher-level library such as `request-promise`. It’s more convenient, and it wraps the operation in a promise for us.

```js
const request = require('request-promise');

const url =
  'https://earthquake.usgs.gov' +
  '/earthquakes/feed/v1.0/summary/significant_month.geojson';
request
  .get(url)
  .then(response => {
    console.log(response);
  })
  .catch(err => {
    console.error(err);
  });
```

![alt text](https://i.imgur.com/E9OEjmt.png "Importing data from a REST API to the CDR")

> Importing data from a REST API to the CDR. Using `request-promise`

![alt text](https://i.imgur.com/8iNEwvZ.png "Retrieving data from a REST API")

> Retrieving data from a REST API. Using `request-promise`


We can also use the third-party library `axios`. The usage is very similar

```js
const axios = require('axios');

const url =
  'https://earthquake.usgs.gov' +
  '/earthquakes/feed/v1.0/summary/significant_month.geojson';
axios
  .get(url)
  .then(response => {
    console.log(response.data);
  })
  .catch(err => {
    console.error(err);
  });
```

> <https://medium.com/@jeffrey.allen.lewis/http-requests-compared-why-axios-is-better-than-node-fetch-more-secure-can-handle-errors-better-39fde869a4a6>
> <https://medium.com/@kartikag01/fetch-vs-axios-vs-request-promise-vs-superagent-8e78fa358d17>
> <https://www.npmtrends.com/axios-vs-request-promise-vs-superagent>


## Parsing JSON Text Data

Now that we have loaded data into memory, we must decide on how to decode the content.

Working with raw text data can be painful, time-consuming, and error-prone; however, when we work with a common or standardized data format such as JSON or CSV, we have the advantage of using an existing library to import or export the data.

JSON is the first data format we’ll parse from our text data. It’s one of the most common
data formats you’ll encounter when working with JavaScript. It’s simple to understand
and goes hand-in-hand with JavaScript. The tools you need for working with JSON
are built into the JavaScript API, and that makes JSON a particularly appealing format
for us.

### Parsing A JSON Text File

> Before we attempt to import our data file, it’s a good idea to open the file in a text editor and visually verify that the data is what we think it is. There’s no point trying to work with a data file that’s corrupted or has other problems, and we can easily and quickly check for this before we start coding. This won’t catch all conceivable issues, but you might be surprised how many data issues you can spot by first doing a simple visual check.

![alt text](https://i.imgur.com/awLFswY.png "Shows earthquakes.json loaded in VSCode")

> Shows earthquakes.json loaded in VSCode

Let’s now import `earthquakes.json` to the core data representation. This is particularly
easy using the tools provided by `Node.js` and the `JavaScript API`. 

The JSON format is a serialized JavaScript data structure, so it lines up in a direct way with the core data representation. 

To read the file, we:
1. use our toolkit function file.read. 
2. Then we use the built-in JavaScript function JSON.parse to decode the text data to the CDR. 

The following is a new function to import a JSON file to the core data representation. We read the file content using our function `file.read` and then parse the JSON data using `JSON.parse`.

```js
// toolkit-nodejs/usage/importJsonFile.js
"use strict";

const importJsonFile = require('../importJsonFile.js');

importJsonFile("./data/earthquakes.json")
  .then(data => {
    console.log(data);
  })
  .catch(err => {
    console.error("An error occurred.");
    console.error(err.stack);
  });

```

![alt text](https://i.imgur.com/DoFb2Rb.png "Importing data from earthquakes.json")

> Importing data from earthquakes.json

#### Second function to add to the toolkit

```js
// toolkit-nodejs/importJsonFile.js
'use strict';

const file = require('./file.js');

// Helper function to import a JSON file.

function importJsonFile(filePath) {
  return file.read(filePath).then(textFileData => {
    return JSON.parse(textFileData);
  });
}

module.exports = importJsonFile;

```

![alt text](https://i.imgur.com/o8zL7p7.png "A function to import a JSON text file (toolkit/importJsonFile.js)")

> A function to import a JSON text file (toolkit/importJsonFile.js)

![alt text](https://i.imgur.com/rAM0yO9.png "Importing a JSON text file to the CDR")

> Importing a JSON text file to the CDR
> Above shows how to use our new function to import earthquakes.json.
You can run this code, and the decoded data prints it to the console so that we can visually verify that the data was parsed correctly.

### Parsing JSON Data From A REST API

Importing JSON data from a REST API is similar to importing it from a text file. We need
to change where the data is loaded from. Instead of using the file.read function, we
can use our request-promise to load the data from a REST API.

The following shows a new function for our toolkit that imports JSON data from a REST API.

```js
// toolkit-nodejs/usage/importJsonFromRestApi.js
'use strict';

// Require our "importJsonFromRestApi" toolkit function.
const importJsonFromRestApi = require('../importJsonFromRestApi.js');

const url =
  'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_month.geojson';

// Use our toolkit function to import data from the REST API.
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

```

![alt text](https://i.imgur.com/bbo681O.png "toolkit-nodejs/usage/importJsonFromRestApi")

> toolkit-nodejs/usage/importJsonFromRestApi

#### Third function to add to the toolkit

```js
// toolkit-nodejs/importJsonFromRestApi.js
'use strict';

const request = require('request-promise');

function importJsonFromRestApi(url) {
  return request.get(url).then(response => {
    return JSON.parse(response);
  });
}

module.exports = importJsonFromRestApi;

```

![alt text](https://i.imgur.com/XKgorqs.png "Importing JSON data from a REST API (toolkit-nodejs/importJsonFromRestApi.js)")

> Importing JSON data from a REST API (toolkit-nodejs/importJsonFromRestApi.js)

The above code shows how to call `importJsonFromRestApi` to import data from the example
REST API. Rather than loading the data from a file, it loads it from the REST API.

> The incoming data is reorganized to fit our idea of the CDR. The incoming JSON data isn’t structured exactly how we’d like it to be to fit, so we rewrite on the fly into a tabular format.

## Parsing CSV Text Data

The CSV (comma-separated values) format is a simple format that directly represents tabular data and is a more compact representation than JSON

> CSV is commonly used in the data science community.

The tools to parse CSV files aren't included in Javascript. We need to install a third-party npm package to help us out with that.

## Parsing A CSV Text File - Papa Parse

A CSV file is a plain old text file: each line of the file is a row of data. Each row is then divided into fields that are separated by commas, hence the name of the data format.

> Before we attempt to import our data file, it’s a good idea to open the file in a text editor and visually verify that the data is what we think it is. There’s no point trying to work with a data file that’s corrupted or has other problems, and we can easily and quickly check for this before we start coding. This won’t catch all conceivable issues, but you might be surprised how many data issues you can spot by first doing a simple visual check.

Let’s import our CSV file to the core data representation. This is a bit more difficult
than with JSON, but only because we must install the third-party library Papa Parse to
do the job of parsing the CSV data. Unlike JSON, the CSV format doesn’t directly line
up with the CDR, so it needs to be restructured during the import process.

1. Start by reading the CSV text file into memory
2. Use Papa Parse to decode the text data to the CDR.

![alt text](https://i.imgur.com/I8T2eaF.png "Importing a CSV text file to the CDR")

> Importing a CSV text file to the CDR


![alt text](https://i.imgur.com/itmMtiS.png "Shows earthquakes.csv loaded in VSCode")

> Shows earthquakes.csv loaded in VSCode

#### Fourth function to add to the toolkit

The following code is our next toolkit function; this one imports a CSV file to the
core data representation. We use our toolkit function `file.read` to load the file
into memory; then we parse the CSV data using `papa.parse`.

```js
// toolkit-nodejs/importCsvFile.js
'use strict';

const papa = require('papaparse');
const file = require('./file.js');

// Helper function to import a CSV file.

function importCsvFile(filePath) {
  return file.read(filePath).then(textFileData => {
    const result = papa.parse(textFileData, {
      header: true,
      dynamicTyping: true
    });
    return result.data;
  });
}

module.exports = importCsvFile;
```

![alt text](https://i.imgur.com/itmMtiS.png "A function to import a CSV text file (toolkit/importCsvFile.js)")

![alt text](https://i.imgur.com/IwKU0P8.png "A function to import a CSV text file (toolkit/importCsvFile.js)")

> A function to import a CSV text file (toolkit/importCsvFile.js)

Note the options used with Papa Parse.

> The `header` option makes Papa Parse recognize the first line of the CSV file as the header line that specifies the column names for the tabular data.
> The `dynamicTyping` option enables Papa Parse’s automatic type conversion. Unlike JSON, CSV has no special support for data types. Every field in CSV is just a string value, but Papa Parse will figure out the actual data types for us. Papa parse has the capability for selecting a type for each field value. Depending on what type Papa Parse sees for each value, this can be very convenient when it works. Sometimes Papa Parse chooses the wrong type.

```js
// toolkit-nodejs/usage/importCsvFile.js
"use strict";

const importCsvFile = require('../importCsvFile.js');

importCsvFile("./data/earthquakes.csv")
  .then(data => {
    console.log(data);
  })
  .catch(err => {
    console.error("An error occurred.");
    console.error(err.stack);
  });
```

![alt text](https://i.imgur.com/8GpmtKh.png "Importing data from earthquakes.csv with our new toolkit function")

> Importing data from earthquakes.csv with our new toolkit function
