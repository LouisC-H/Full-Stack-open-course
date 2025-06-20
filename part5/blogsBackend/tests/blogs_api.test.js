const { test, after, beforeEach, before, describe } = require('node:test')
const assert = require('node:assert')
const supertest = require('supertest')
const mongoose = require('mongoose')

const app = require('../app')
const api = supertest(app)

const helper = require('./test_helper')
const userData = require('./usersData')
const blogsData = require('./blogsData')

const Blog = require('../models/blog')
const User = require('../models/user')


describe('Pre-populated blog database', () => {

  before(async () => {
    await User.deleteMany({})
    await api.post('/api/users').send(userData.initialUser)
  })

  beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(blogsData.initialBlogs)
    const response = await api
      .post('/api/login')
      .send(userData.iUserLogin)
    this.bearerToken = response.body.token
    await new Promise(resolve => setTimeout(resolve, 200))
  })

  describe('GET all blogs', () => {
    test('all blogs are returned, and in the expected format', async () => {
      const response = await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)

      assert.strictEqual(response.body.length, blogsData.initialBlogs.length)
    })

    test('Each blog has its own unique identifier named "id"', async () => {
      const response = await api
        .get('/api/blogs')

      response.body.forEach(blog => {
        assert(Object.prototype.hasOwnProperty.call(blog, 'id'))
      })
    })
  })

  describe('POST a new blog', () => {
    describe('Happy path', () => {
      test('A valid blog can be added ', async () => {
        await api
          .post('/api/blogs')
          .send(blogsData.newBlog)
          .set('Authorization', `Bearer ${this.bearerToken}`)
          .expect(201)
          .expect('Content-Type', /application\/json/)

        const blogsAfterPost = await helper.blogsInDb()
        assert.strictEqual(blogsAfterPost.length, blogsData.initialBlogs.length + 1)

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

      test('Adding a blog without likes successfully creates one with default 0', async () => {
        await api
          .post('/api/blogs')
          .send(blogsData.noLikes)
          .set('Authorization', `Bearer ${this.bearerToken}`)

        const blogsAfterPost = await helper.blogsInDb()

        // Check that the collection of saved blogs contains the new post as expected.
        const titles = blogsAfterPost.map(n => n.title)
        assert(titles.includes('Turns out people still make blogs?'))
        const authors = blogsAfterPost.map(n => n.author)
        assert(authors.includes('Sir Prized'))
        const urls = blogsAfterPost.map(n => n.url)
        assert(urls.includes('http://aintthatcrazy.html'))
        const likes = blogsAfterPost.map(n => n.likes)
        assert(likes.includes(0))
      })
    })
    describe('Sad path', () => {
      test('Adding a blog without a title returns a 400 status code', async () => {
        await api
          .post('/api/blogs')
          .send(blogsData.noTitle)
          .set('Authorization', `Bearer ${this.bearerToken}`)
          .expect(400)
      })

      test('Adding a blog without a url returns a 400 status code', async () => {
        await api
          .post('/api/blogs')
          .send(blogsData.noURL)
          .set('Authorization', `Bearer ${this.bearerToken}`)
          .expect(400)
      })

      test('Adding a blog without authorization returns a 401 status code', async () => {
        await api
          .post('/api/blogs')
          .send(blogsData.noURL)
          .expect(401)
      })
    })
  })

  describe('DELETE an existing blog', () => {
    describe('Happy path', () => {
      test('Delete an existing blog with a valid ID', async () => {
        // Post a blog from a known ID
        const postResponse = await api
          .post('/api/blogs')
          .send(blogsData.newBlog)
          .set('Authorization', `Bearer ${this.bearerToken}`)

        const idToDelete = postResponse.body.id

        // Delete that same blog
        await api
          .delete(`/api/blogs/${idToDelete}`)
          .set('Authorization', `Bearer ${this.bearerToken}`)
          .expect(204)

        const blogsAtEnd = await helper.blogsInDb()

        assert.strictEqual(blogsAtEnd.length, blogsData.initialBlogs.length)

        const titles = blogsAtEnd.map(r => r.title)
        assert(!titles.includes('Turns out people still make blogs?'))
      })
    })
    describe('Sad path', () => {
      test('Fail to delete a blog using a hardcoded random ID', async () => {
        await api
          .delete('/api/blogs/680105b31583a6fbb550ebd5')
          .set('Authorization', `Bearer ${this.bearerToken}`)
          .expect(204)

        const blogsAtEnd = await helper.blogsInDb()
        assert.strictEqual(blogsAtEnd.length, blogsData.initialBlogs.length)
      })

      test('Deleting a blog without authorization returns a 401 status code', async () => {
        // Post a blog from a known ID
        const postResponse = await api
          .post('/api/blogs')
          .send(blogsData.newBlog)
          .set('Authorization', `Bearer ${this.bearerToken}`)

        const idToDelete = postResponse.body.id

        // Delete that same blog
        await api
          .delete(`/api/blogs/${idToDelete}`)
          .expect(401)

        const blogsAtEnd = await helper.blogsInDb()
        assert.strictEqual(blogsAtEnd.length, blogsData.initialBlogs.length + 1)
      })
    })
  })
  describe('PUT - update an existing blog', () => {
    describe('Happy path', () => {
      test('Transform an existing blog into a new one, step by step', async () => {

        const blogsAtStart = await helper.blogsInDb()
        const blogToReplace = blogsAtStart[0]

        await api
          .put(`/api/blogs/${blogToReplace.id}`)
          .send(blogsData.newBlog)
          .expect(200)
          .expect('Content-Type', /application\/json/)

        const blogsAfterPost = await helper.blogsInDb()
        assert.strictEqual(blogsAfterPost.length, blogsData.initialBlogs.length)

        // Also check that the contents has made it into the new collection of saved blogs, and that the old contents is gone
        const titles = blogsAfterPost.map(n => n.title)
        assert(titles.includes(blogsData.newBlog.title))
        assert(!titles.includes(blogToReplace.title))

        const authors = blogsAfterPost.map(n => n.author)
        assert(authors.includes(blogsData.newBlog.author))
        assert(!titles.includes(blogToReplace.author))

        const urls = blogsAfterPost.map(n => n.url)
        assert(urls.includes(blogsData.newBlog.url))
        assert(!titles.includes(blogToReplace.url))

        const likes = blogsAfterPost.map(n => n.likes)
        assert(likes.includes(blogsData.newBlog.likes))
        assert(!titles.includes(blogToReplace.likes))
      })
    })
  })
})

after(async () => {
  await mongoose.connection.close()
})