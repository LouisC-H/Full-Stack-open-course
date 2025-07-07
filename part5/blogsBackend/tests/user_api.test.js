const { test, after, beforeEach, describe } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')

const app = require('../app')
const api = supertest(app)

const helper = require('./test_helper')
const userData = require('./usersData')

const User = require('../models/user')

describe('Pre-populated DB', () => {
  beforeEach(async () => {
    await User.deleteMany({})
    await api.post('/api/users').send(userData.initialUser)
    await api.post('/api/users').send(userData.initialUser2)
    await new Promise(resolve => setTimeout(resolve, 50))
  })

  describe('GET all users', () => {
    test('all users are returned, and in the expected format', async () => {
      const response = await api
        .get('/api/users')
        .expect(200)
        .expect('Content-Type', /application\/json/)

      assert.strictEqual(response.body.length, 2)
    })

    test('Each user has its own unique identifier named "id"', async () => {
      const response = await api
        .get('/api/users')

      response.body.forEach(user => {
        assert(Object.prototype.hasOwnProperty.call(user, 'id'))
      })
    })
  })

  describe('GET a specific user', () => {
    test('Find a specific user', async () => {
      const response = await api
        .get('/api/users')
        .expect(200)
        .expect('Content-Type', /application\/json/)

      const userToFind = response.body[1]

      const foundUserResponse = await api
        .get(`/api/users/${userToFind.id}`)
        .expect(200)
        .expect('Content-Type', /application\/json/)

      assert.deepStrictEqual(foundUserResponse.body, userToFind)
    })
  })

  describe('POST a new user user', () => {
    test('Happy path - creation succeeds with a fresh username', async () => {
      const usersAtStart = await helper.usersInDb()

      await api
        .post('/api/users')
        .send(userData.validUser)
        .expect(201)
        .expect('Content-Type', /application\/json/)

      const usersAtEnd = await helper.usersInDb()
      assert.strictEqual(usersAtEnd.length, usersAtStart.length + 1)

      const usernames = usersAtEnd.map(u => u.username)
      assert(usernames.includes(userData.validUser.username))
    })

    describe('Sad path', () => {
      test('creation fails with proper statuscode and message if username is already taken', async () => {
        const usersAtStart = await helper.usersInDb()

        const result = await api
          .post('/api/users')
          .send(userData.sameUsernameUser)
          .expect(400)
          .expect('Content-Type', /application\/json/)

        assert(result.body.error.includes('expected `username` to be unique'))

        const usersAtEnd = await helper.usersInDb()
        assert.strictEqual(usersAtEnd.length, usersAtStart.length)
      })

      test('creation fails with proper statuscode and message if username is too small', async () => {
        const usersAtStart = await helper.usersInDb()

        const result = await api
          .post('/api/users')
          .send(userData.smallUsernameUser)
          .expect(400)
          .expect('Content-Type', /application\/json/)

        assert(result.body.error.includes('Path `username` ('))
        assert(result.body.error.includes('is shorter than the minimum allowed length (3).'))

        const usersAtEnd = await helper.usersInDb()
        assert.strictEqual(usersAtEnd.length, usersAtStart.length)
      })

      test('creation fails with proper statuscode and message if password is too small', async () => {
        const usersAtStart = await helper.usersInDb()

        const result = await api
          .post('/api/users')
          .send(userData.smallPasswordUser)
          .expect(400)
          .expect('Content-Type', /application\/json/)

        assert(result.body.error.includes('Password is shorter than the minimum allowed length (3).'))

        const usersAtEnd = await helper.usersInDb()
        assert.strictEqual(usersAtEnd.length, usersAtStart.length)
      })
    })
  })

})

after(async () => {
  await mongoose.connection.close()
})