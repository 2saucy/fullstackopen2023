const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (req, res) => {
  const data = await Blog.find({})
  res.json(data)
})

blogsRouter.post('/', async (req, res) => {
  const body = req.body

  if (!body.title || !body.url) {
    return res.status(400).send({
      message: 'Content can not be empty!'
    })
  }

  const newBlog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes ?? 0
  })

  const data = await newBlog.save()
  res.status(201).json(data)
})

module.exports = blogsRouter
