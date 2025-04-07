const express = require('express')
const mongoose = require('mongoose')
const config = require('./utils/config')
const logger = require('./utils/logger')
const blogRouter = require('./controllers/blogs')
const middleware = require('./utils/middleware')

const app = express()

const mongoUrl = config.MONGODB_URI

logger.info('connecting to', mongoUrl)

mongoose.connect(mongoUrl)

app.use(express.static('dist'))
app.use(express.json())
app.use(middleware.requestLogger)

app.use('/api/blogs', blogRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

const PORT = config.PORT || 3003
app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`)
})