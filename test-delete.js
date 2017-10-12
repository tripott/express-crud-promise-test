const request = require('supertest') // perform http tests
const { prop } = require('ramda')

module.exports = (app, t, path, pk) => {
  return new Promise((resolve, reject) => {
    request(app)
      .delete(path)
      .expect(200)
      .then(response => {
        const deletedResponse = prop('body', response)
        t.equals(
          prop('id', deletedResponse),
          pk,
          `DELETE ${path} expected PK value passed`
        )
        t.equals(
          prop('ok', deletedResponse),
          true,
          `DELETE ${path} expected "ok" value passed`
        )
        resolve(deletedResponse)
      })
      .catch(err => reject(err))
  })
}
