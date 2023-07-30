const jwt = require('jsonwebtoken')
const config = require('../utils/config')
const logger = require('../utils/logger')
const User = require('../models/user')

const handleErrors = (err, req, res, next) => {
  logger.error(err.message)
  if (err.name === 'CastError') {
    return res.status(400).send({ error: 'malformatted id' })
  } else if (err.name === 'ValidationError') {
    if (err.message.includes('username')) {
      if (err.message.includes('unique')) {
        res.status(409).json({ error: 'username is already in use.' })
      }
      if (err.message.includes('allowed length')) {
        res.status(400).json({ error: 'username must be at least 3 digits long.' })
      }
    }
  } else if (err.name === 'JsonWebTokenError') {
    return res.status(400).json({ error: err.message })
  }
  next(err)
}

const tokenExtractor = (req, res, next) => {
  const authorization = req.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    req.token = authorization.substring(7)
  }
  next()
}

const userExtractor = async (req, res, next) => {
  if (req.token) {
    const decodedToken = jwt.verify(req.token, config.SECRET)
    req.user = !decodedToken ? null : await User.findById(decodedToken.id)
  } else {
    req.user = null
  }
  next()
}

module.exports = {
  handleErrors,
  tokenExtractor,
  userExtractor
}
