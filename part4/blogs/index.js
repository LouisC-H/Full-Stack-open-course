const express = require('express')
const mongoose = require('mongoose')
const config = require('./utils/config')
const blogRouter = require('./controllers/blogs')

const app = express()

const mongoUrl = config.MONGODB_URI

console.log('connecting to', mongoUrl)

mongoose.connect(mongoUrl)

app.use(express.json())
app.use('/api/blogs', blogRouter)

const PORT = config.PORT || 3003
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})