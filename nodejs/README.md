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
