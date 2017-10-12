const tape = require('tape')
const request = require('supertest')
const { prop } = require('ramda')

module.exports = app => {
  return new Promise((resolve, reject) => {
    tape('TESTING GET /', t => {
      request(app)
        .get('/')
        .expect(200)
        .then(res => {
          t.plan(1)
          t.equals(
            prop('statusCode', res),
            200,
            `GET / received status code: ${prop('statusCode', res)}`
          )
          t.end()
          resolve(res)
        })
        .catch(err => {
          reject(err)
        })
    })
  })
}
