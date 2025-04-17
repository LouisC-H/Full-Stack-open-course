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
    assert(Object.prototype.hasOwnProperty.call(blog, 'id'))
  })
})

test('a valid blog can be added ', async () => {
  const newBlog = {
    title: 'Turns out people still make blogs?',
    author: 'Sir Prized',
    url: 'http://aintthatcrazy.html',
    likes: 999
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogsAfterPost = await helper.blogsInDb()
  assert.strictEqual(blogsAfterPost.length, helper.initialBlogs.length + 1)

  // Also check that the contents has made it into the new collection of saved blogs
  const titles = blogsAfterPost.map(n => n.title)
  assert(titles.includes('Turns out people still make blogs?'))
  const authors = blogsAfterPost.map(n => n.author)
  assert(authors.includes('Sir Prized'))
  const urls = blogsAfterPost.map(n => n.url)
  assert(urls.includes('http://aintthatcrazy.html'))
  const likes = blogsAfterPost.map(n => n.likes)
  assert(likes.includes(999))
})

after(async () => {
  await mongoose.connection.close()
})