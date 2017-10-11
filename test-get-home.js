const tape = require('tape')
const request = require('supertest')
const { prop } = require('ramda')

module.exports = app => {
  return new Promise((resolve, reject) => {
    tape('TESTING GET /', t => {
      request(app)
        .get('/')
        .then(res => {
          t.plan(2)
          t.equals(prop('text', res), 'The librarian welcomes you, shhhh.')
          t.equals(prop('statusCode', res), 200)
          resolve(res.text)
        })
        .then(() => t.end())
        .catch(err => {
          reject(err)
        })
    })
  })
}
