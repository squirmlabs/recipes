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

