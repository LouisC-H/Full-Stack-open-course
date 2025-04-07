require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const blogRouter = require('./controllers/blogs')

const app = express()


const mongoUrl = process.env.MONGODB_URI

console.log('connecting to', mongoUrl)

mongoose.connect(mongoUrl)

app.use(express.json())
app.use('/api/blogs', blogRouter)

const PORT = process.env.PORT || 3003
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})