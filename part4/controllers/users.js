const usersRouter = require('express').Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')

usersRouter.get('/', async (req, res) => {
  const users = await User.find({}).populate('blogs', { title: 1, url: 1, author: 1 })
  res.status(200).json(users)
})

usersRouter.post('/', async (req, res) => {
  const { username, name, password } = req.body

  if (!username || !password) {
    return res.status(422).json({ error: 'username or password is missing.' })
  } else if (password.length < 3) {
    return res.status(400).json({ error: 'password must be at least 3 digits long.' })
  }

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)
  const newUser = new User({
    username,
    name,
    passwordHash
  })
  const savedUser = await newUser.save()
  res.status(201).json(savedUser)
})

module.exports = usersRouter
