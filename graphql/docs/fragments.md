# Using Fragments

Fragments are used to share fields between `queries`, `mutations`, and `subscriptions`.

```gql

fragment contactFields on Contact {
  name
  phone
  email
}

query getContactsFragments($contactId1: Int!, $contactId2: Int!) {
  contact1: contact(id: $contactId1) {
    ...contactFields
  }
  contact2: contact(id: $contactId2) {
    ...contactFields
  }
}

```

As you can see, we define our fragment with the fields we want to get and then in both queries (contact1 and contact2), we re-use the same fragment (contactFields). In the query variables, we pass the values of the contacts we want to get data.