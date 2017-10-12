const request = require('supertest') // perform http tests
const { path, prop } = require('ramda')

module.exports = (app, t, routePath, requestBody, pk) => {
  // use our express app to POST (add) a document (requestBody) to the db
  //  so we to test some things...
  // expect status code of 201 (resource was added/created)
  // expect json to returned in the response
  // expect the response body to have an id value that matches the pk parameter
  // if everything goes great well resolve our promise, else we'll reject.

  return new Promise((resolve, reject) => {
    request(app)
      .post(routePath)
      .send(requestBody)
      .expect(201)
      .then(httpResponseFromCouch => {
        t.equals(
          prop('statusCode', httpResponseFromCouch),
          201,
          `POST ${routePath} received status code: ${prop(
            'statusCode',
            httpResponseFromCouch
          )}`
        )
        t.equals(
          path(['body', 'id'], httpResponseFromCouch),
          pk,
          `POST ${routePath} PK value passed`
        )
        t.equals(
          path(['body', 'ok'], httpResponseFromCouch),
          true,
          `POST ${routePath} "ok" value passed`
        )

        resolve(prop('body', httpResponseFromCouch))
      })
      .catch(err => reject(err))
  })
}
