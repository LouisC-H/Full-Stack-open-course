const { test, after, beforeEach, describe } = require('node:test')
const assert = require('node:assert')
const supertest = require('supertest')
const mongoose = require('mongoose')

const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')

describe('Pre-populated blog database', () => {
  beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(helper.initialBlogs)
  })

  describe('GET all blogs', () => {
    test('all blogs are returned, and in the expected format', async () => {
      const response = await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)

      assert.strictEqual(response.body.length, helper.initialBlogs.length)
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

      test('adding a blog without likes successfully creates one with default 0', async () => {
        const newBlog = {
          title: 'Turns out people still make blogs?',
          author: 'Sir Prized',
          url: 'http://aintthatcrazy.html'
        }

        await api
          .post('/api/blogs')
          .send(newBlog)

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
    describe('sad path', () => {
      test('adding a blog without a title returns a 400 status code', async () => {
        const newBlog = {
          author: 'Sir Prized',
          url: 'http://aintthatcrazy.html',
          likes: 999
        }

        await api
          .post('/api/blogs')
          .send(newBlog)
          .expect(400)
      })

      test('adding a blog without a url returns a 400 status code', async () => {
        const newBlog = {
          title: 'Turns out people still make blogs?',
          author: 'Sir Prized',
          likes: 999
        }

        await api
          .post('/api/blogs')
          .send(newBlog)
          .expect(400)
      })
    })
  })
  describe('DELETE an existing blog', () => {
    describe('Happy path', () => {
      test('Delete an existing blog'), async () => {
        const blogsAtStart = await helper.blogsInDb()
        const blogToDelete = blogsAtStart[0]

        await api
          .delete(`/api/blogs/${blogToDelete.id}`)
          .expect(204)

        const blogsAtEnd = await helper.blogsInDb()

        assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length - 1)

        const title = blogsAtEnd.map(r => r.title)
        assert(!title.includes(blogToDelete.title))
      }
    })
    describe('Sad path', () => {
      test('Fail to delete a blog using a nonsense id'), async () => {

        await api
          .delete('/api/blogs/680105b31583a6fbb550ebd5')
          .expect(204)

        const blogsAtEnd = await helper.blogsInDb()
        assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length)
      }
    })
  })
})

after(async () => {
  await mongoose.connection.close()
})