# Mutations

Mutations are also essential because they help us to modify our data. Let's implement a mutation and update a contact by passing the ID and the fields we want to change.

We need to add our mutation definition and create the function to update our contact; our code should look like this:

```js
const schema = buildSchema(`
  type Query {
    contact(id: Int!): Contact
    contacts(name: String): [Contact]
    hello: String
  }
  
  type Mutation {
    updateContact (
      id: Int!,
      name: String!,
      phone: String!,
      email: String!
    ) : Contact
  }

  type Contact {
    id: Int
    name: String
    phone: String
    email: String
  }
`);
```

### Methods

```js

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
  },
  updateContact: ({ id, name, phone, email }) => {
    contacts.forEach(contact => {
      if (contact.id === id) {
        // Updating only the fields that has new values...
        contact.name = name || contact.name;
        contact.phone = phone || contact.phone;
        contact.email = email || contact.email;
      }
    });

    return contacts.filter(contact => contact.id === id)[0];
  },

  hello: () => {
    return 'Hello world!';
  }
};
```

```js

// Root has the methods we will execute to get the data
const root = {
  contact: methods.getContact,
  contacts: methods.getContacts,
  updateContact: methods.updateContact,
  hello: methods.hello
};
```