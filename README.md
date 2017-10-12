# Express CRUD Promise Test

A simple promise-based testing suite for ExpressJS based APIs and [CouchDB](http://couchdb.apache.org/) in the backend.  `express-crud-promise-test` relies on [tape](https://www.npmjs.com/package/tape), [supertest](https://www.npmjs.com/package/supertest), and [ramda](https://www.npmjs.com/package/ramda) as its dependencies.  

Tests routes that support the following http verbs:

 - `POST`
 - `GET`
 - `UPDATE` (Coming Soon!)
 - `DELETE`

## Getting Started

```
$ npm install express-crud-promise-test --save-dev
```

## Examples

### Test Home Route

Use `testGetHome()` to verify the home `\` route is functioning.  Commonly used to ensure the api is available.  Accepts an ExpressJS application as its only parameter.  Returns a promise containing the HTTP response.

```
const { testGetHome } = require('express-crud-promise-test')
const app = require('../app.js')
testGetHome(app)
  .then(res => console.log(res))
  .catch(err => console.log(err))
```

### GROUP CRUD TEST

Tests the create, read, update, and delete (CRUD) capabilities on an api route.  Use `testGroupCRUD()` to test `GET`, `POST`, `PUT`, and `DELETE` HTTP verbs.  

`testGroupCRUD()` accepts the following parameters:

- `app` - ExpressJS application as its only parameter.
- `testName` - The name of your CRUD Test. Example: 'BOOKS CRUD TEST'
- `path` - The path/route defined within your ExpressJS route middleware.  Example: `/books`
- `postRequestBody` - The resource to add/POST to the database.
- `pk` - The CouchDB document primary key (`_id`) value to equality test after the resource is created in CouchDB. Example: `book_brave_new_world`.  `pk` value is used for the route value when testing the `GET` and `DELETE` for the resource.  Example:  `GET /books/book_brave_new_world`

In the example below, the home route is tested followed by CRUD testing the `/books` and `/authors` route.

```
const { testGetHome, testGroupCRUD } = require('express-crud-promise-test')
const app = require('../app.js')

const postRequestBody = {
  title: 'A Brave New World',
  author: 'author_aldous_huxley',
  type: 'book',
  publisher: 'Penguin Books',
  ISBN: '12947281',
  genre: 'Fiction',
  description:
    "Brave New World is a novel written in 1931 by Aldous Huxley, and published in 1932. Set in London in the year AD 2540 (632 A.F.—'After Ford'—in the book), the novel anticipates developments in reproductive technology, sleep-learning, psychological manipulation, and classical conditioning that are combined to make a profound change in society.",
  rating: 95,
  prices: [
    { type: 'paperback', price: 9.99 },
    { type: 'hardback', price: 19.99 },
    { type: 'audio', price: 19.99 },
    { type: 'kindle', price: 12.99 }
  ]
}

const postAuthorRequestBody = {
  name: 'Aldous Huxley',
  placeOfBirth: 'London',
  birthDate: '1932-05-01',
  type: 'author'
}

testGetHome(app)
  .then(response =>
    testGroupCRUD(
      app,
      'BOOKS CRUD TEST',
      '/books',
      postRequestBody,
      'book_brave_new_world'
    )
  )
  .then(body =>
    testGroupCRUD(
      app,
      'AUTHORS CRUD TEST',
      '/authors',
      postAuthorRequestBody,
      'author_aldous_huxley'
    )
  )
  .then(body => console.log('Success', body))
  .catch(err => console.log('error', err))

```

## TODO:  testPost() example
## TODO:  testGet() example
## TODO:  testDelete() example
