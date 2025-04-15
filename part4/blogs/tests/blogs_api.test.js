const { test, after, beforeEach } = require('node:test')
const assert = require('node:assert')
const supertest = require('supertest')
const mongoose = require('mongoose')

const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')

beforeEach(async () => {
  await Blog.deleteMany({})

  await Blog.insertMany(helper.initialBlogs)
})

test('all blogs are returned, and in the expected format', async () => {
  const response = await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)

  assert.strictEqual(response.body.length, helper.initialBlogs.length)
})

test('Each note has its own unique identifier named "id"', async () => {
  const response = await api
    .get('/api/blogs')

  response.body.forEach(blog => {
    console.log('blog : ', blog);
    assert(Object.prototype.hasOwnProperty.call(blog, 'id'))
  })
})

after(async () => {
  await mongoose.connection.close()
})