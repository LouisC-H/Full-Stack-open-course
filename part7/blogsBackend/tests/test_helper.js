const Blog = require('../models/blog')
const User = require('../models/user')

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(u => u.toJSON())
}

const findUserId = async () => {
  const usersList = await usersInDb()
  return usersList[0].id
}

module.exports = {
  blogsInDb, usersInDb, findUserId
}