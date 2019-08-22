# Create a GraphQL server

> Setup directory and initialize a new `package.json`

```bash
mkdir contacts
cd contacts
npm init --yes
npm add express graphql express-graphql babel-preset-env
npm install -g babel-cli
```

## Setup babel to use ES6 syntax in Node.js

```json
{
  "presets": ["env"]
}
```

## Setup Express Server

```js
import express from 'express';

// Server environment variables
const PORT = process.env.PORT || 3000;

const app = express();

app.listen(PORT, () => console.log(`Running server on port ${PORT}`));
```

```bash
babel-node index.js
```

## Setup GraphQL Server

> Include `express-graphql` library to import the `buildSchema` from `graphql`.

```js
import express from 'express';

// GraphQL modules
import expressGraphQL from 'express-graphql';
import { buildSchema } from 'graphql';

// Server environment variables
const PORT = process.env.PORT || 3000;

// Express Application
const app = express();

// Creating our GraphQL Schema
const schema = buildSchema(`
  type Query {
    message: String
  }
`);

// Root has the methods we will execute to get the data
const root = {
  message: () => 'First message'
};

// GraphQL middleware
app.use(
  '/graphql',
  expressGraphQL({
    schema,
    rootValue: root,
    graphiql: true // This enables the GraphQL browser's IDE
  })
);

// Running our server
app.listen(PORT, () => console.log(`Running server on port ${PORT}`));
```

## Setup Fake data for contacts

Create file `contacts.json`

```json
{
  "contacts": [
    {
      "id": 1,
      "name": "Adrian Aguirre",
      "phone": "",
      "email": "squirmlabs@gmail.com"
    },
    {
      "id": 2,
      "name": "Cristina",
      "phone": "331-251-5673",
      "email": "cristina@gmail.com"
    },
    {
      "id": 3,
      "name": "John Smith",
      "phone": "415-307-4382",
      "email": "john.smith@gmail.com"
    },
    {
      "id": 4,
      "name": "John Brown",
      "phone": "281-323-4146",
      "email": "john.brown@gmail.com"
    }
  ]
}

```

## Add methods to retrieve data

```js
import express from 'express';

// GraphQL modules
import expressGraphQL from 'express-graphql';
import { buildSchema } from 'graphql';

// Contacts Data
import { contacts } from './data/contacts';

// Server environment variables
const PORT = process.env.PORT || 3000;

// Express Application
const app = express();

// Creating our GraphQL Schema
const schema = buildSchema(`
  type Query {
    contact(id: Int!): Contact
    contacts(name: String): [Contact]
  }
  
  type Contact {
    id: Int
    name: String
    phone: String
    email: String
  }
`);

// Data methods
const methods = {
  getContact: args => {
    const { id } = args;
    return contacts.filter(contact => contact.id === id)[0];
  },

  getContacts: args => {
    const { name = false } = args;
    // If we don't get a name we return all contacts
    if (!name) {
      return contacts;
    }
    // Returning contacts with same name...
    return contacts.filter(contact => contact.name.includes(name));
  }
};

// Root has the methods we will execute to get the data
const root = {
  message: () => 'First message'
};

// GraphQL middleware
app.use(
  '/graphql',
  expressGraphQL({
    schema,
    rootValue: root,
    graphiql: true // This enables the GraphQL browser's IDE
  })
);

// Running our server
app.listen(PORT, () => console.log(`Running server on port ${PORT}`));
```

