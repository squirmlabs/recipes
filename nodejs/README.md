# Build out toolkit

Tools that you need to move data from place to place.

| Type   | Data Source | Data Format | Tools                     | Methods                      |
|--------|-------------|-------------|---------------------------|------------------------------|
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

[img]https://i.imgur.com/F1TZg1c.png[/img]

![alt text](https://i.imgur.com/F1TZg1c.png "A data pipeline with stages that communicate through the core data representation")

> A data pipeline with stages that communicate through the core data representation