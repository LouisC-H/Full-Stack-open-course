const { test, after, before, beforeEach, describe } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)

const helper = require('./test_helper')

const Note = require('../models/note')
const User = require('../models/user')


before(async () => {
  await User.deleteMany({})
  await User.insertOne(helper.initialUser)
})

describe('when there are some notes saved initially', () => {
  beforeEach(async () => {
    await Note.deleteMany({})
    this.initialNotes = await helper.initialiseNotes()
    await Note.insertMany(this.initialNotes)
    await new Promise(resolve => setTimeout(resolve, 100))
  })

  test('notes are returned as json', async () => {
    await api
      .get('/api/notes')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('all notes are returned', async () => {
    const response = await api.get('/api/notes')

    assert.strictEqual(response.body.length, this.initialNotes.length)
  })

  test('a specific note is within the returned notes', async () => {
    const response = await api.get('/api/notes')
    const contents = response.body.map(r => r.content)
    assert(contents.includes('Browser can execute only JavaScript'))
  })

  describe('viewing a specific note', () => {

    test('succeeds with a valid id', async () => {
      const notesAtStart = await helper.notesInDb()

      const noteToView = notesAtStart[0]

      const resultNote = await api
        .get(`/api/notes/${noteToView.id}`)
        .expect(200)
        .expect('Content-Type', /application\/json/)

      assert.deepStrictEqual(resultNote.body, noteToView)
    })

    test('fails with statuscode 404 if note does not exist', async () => {
      const validNonexistingId = await helper.nonExistingId()

      await api
        .get(`/api/notes/${validNonexistingId}`)
        .expect(404)
    })

    test('fails with statuscode 400 id is invalid', async () => {
      const invalidId = '5a3d5da59070081a82a3445'

      await api
        .get(`/api/notes/${invalidId}`)
        .expect(400)
    })
  })

  describe('addition of a new note', () => {
    test('succeeds with valid data', async () => {
      const newNote = {
        content: 'async/await simplifies making async calls',
        important: true,
        userId: await helper.findUserId()
      }

      await api
        .post('/api/notes')
        .send(newNote)
        .expect(201)
        .expect('Content-Type', /application\/json/)

      const notesAtEnd = await helper.notesInDb()
      assert.strictEqual(notesAtEnd.length, this.initialNotes.length + 1)

      const contents = notesAtEnd.map(n => n.content)
      assert(contents.includes('async/await simplifies making async calls'))
    })

    test('fails with status code 400 if data invalid', async () => {
      const newNote = {
        important: true,
        userId: await helper.findUserId()
      }

      await api
        .post('/api/notes')
        .send(newNote)
        .expect(400)

      const notesAtEnd = await helper.notesInDb()

      assert.strictEqual(notesAtEnd.length, this.initialNotes.length)
    })
  })

  describe('deletion of a note', () => {
    test('succeeds with status code 204 if id is valid', async () => {
      const notesAtStart = await helper.notesInDb()
      const noteToDelete = notesAtStart[0]

      await api
        .delete(`/api/notes/${noteToDelete.id}`)
        .expect(204)

      const notesAtEnd = await helper.notesInDb()

      assert.strictEqual(notesAtEnd.length, this.initialNotes.length - 1)

      const contents = notesAtEnd.map(r => r.content)
      assert(!contents.includes(noteToDelete.content))
    })
  })

  test('Transform an existing blog into a new one, step by step', async () => {
    const newNote = {
      content: 'async/await simplifies making async calls',
      important: true,
      userId: await helper.findUserId()
    }

    const notesAtStart = await helper.notesInDb()
    const noteToReplace = notesAtStart[0]

    await api
      .put(`/api/notes/${noteToReplace.id}`)
      .send(newNote)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const notesAfterPost = await helper.notesInDb()
    assert.strictEqual(notesAfterPost.length, this.initialNotes.length)

    // Also check that the contents has made it into the new collection of saved notes, and that the old contents is gone
    const content = notesAfterPost.map(n => n.content)
    assert(content.includes(newNote.content))
    assert(!content.includes(noteToReplace.title))
  })
})

after(async () => {
  await mongoose.connection.close()
})