const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (req, res) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1, id: 1 })
  res.status(200).json(blogs)
})

blogsRouter.get('/:id', async (req, res) => {
  const id = req.params.id
  const blog = await Blog.findById(id)
  res.status(200).json(blog)
})

blogsRouter.post('/', async (req, res) => {
  const { token, user, body } = req

  if (!body.title || !body.url) {
    return res.status(400).send({ error: 'content can not be empty.' })
  } else if (!token) {
    return res.status(401).send({ error: 'token is missing or invalid.' })
  }

  const newBlog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes ?? 0,
    user: user._id
  })

  const savedBlog = await newBlog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  res.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', async (req, res) => {
  const id = req.params.id
  const blog = await Blog.findById(id)

  if (!blog) {
    return res.status(404).json({ error: 'blog does\'t exist or the id is invalid.' })
  } else if (!req.token) {
    return res.status(401).send({ error: 'token is missing or invalid.' })
  }

  if (blog.user.toString() === req.user._id.toString()) {
    await Blog.findByIdAndRemove(id)
    return res.status(204).end()
  } else {
    return res.status(401).json({ error: 'you don\'t have permissions to do that.' })
  }
})

blogsRouter.put('/:id', async (req, res) => {
  const id = req.params.id
  const body = req.body

  const blogUpdate = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes ?? 0
  }

  const data = await Blog.findByIdAndUpdate({ _id: id }, blogUpdate, { new: true })
  res.status(200).json(data)
})

module.exports = blogsRouter
