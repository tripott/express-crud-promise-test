const request = require('supertest') // perform http tests
const { omit, compose, prop } = require('ramda')

module.exports = (app, t, path, compareResource) => {
  return new Promise((resolve, reject) => {
    request(app)
      .get(path)
      .expect(200)
      .then(doc => {
        t.plan(2)
        t.equals(
          doc.statusCode,
          200,
          `GET ${path} received status code: ${doc.statusCode}`
        )
        const omittedResource = compose(omit(['_rev']), prop('body'))(doc)
        t.same(
          compareResource,
          omittedResource,
          `GET ${path} received expected resource`
        )

        resolve(prop('body', doc))
      })
      .catch(err => reject(err))
  })
}
