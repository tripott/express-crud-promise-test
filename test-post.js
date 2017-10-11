const request = require('supertest') // perform http tests
const { omit, compose, prop } = require('ramda') // ramda is neat

module.exports = (app, t, path, requestBody, pk) => {
  // use our express app to POST (add) a document (requestBody) to the db
  //  so we to test some things...
  // expect status code of 201 (resource was added/created)
  // expect json to returned in the response
  // expect the response body to have an id value that matches the pk parameter
  // if everything goes great well resolve our promise, else we'll reject.

  return new Promise((resolve, reject) => {
    request(app)
      .post(path)
      .send(requestBody)
      .expect(201)
      .then(httpResponseFromCouch => {
        t.equals(
          httpResponseFromCouch.body.id,
          pk,
          `POST ${path} PK value passed`
        )
        t.equals(
          httpResponseFromCouch.body.ok,
          true,
          `POST ${path} "ok" value passed`
        )
        resolve(httpResponseFromCouch.body)
      })
      .catch(err => reject(err))
  })
}
