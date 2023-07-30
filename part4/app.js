require('express-async-errors')
const express = require('express')
const app = express()
const cors = require('cors')
const blogsRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const mongoose = require('mongoose')
const config = require('./utils/config')
const logger = require('./utils/logger')
const middleware = require('./utils/middlewares')

mongoose.connect(config.MONGODB_URI)
  .then(() => logger.info('You are now connected to MongoDB.'))
  .catch(error => logger.error('Error trying connect to MongoDB ', error.message))

app.use(cors())
app.use(express.json())
app.use(middleware.tokenExtractor)

app.use('/api/blogs', middleware.userExtractor, blogsRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)

app.use(middleware.handleErrors)

module.exports = app
