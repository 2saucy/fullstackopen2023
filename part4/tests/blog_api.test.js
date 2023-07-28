/* eslint-env jest */

const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')

const initialBlogs = [
  {
    title: 'Blog 1',
    author: 'Author 1',
    url: 'Url 1',
    likes: 1
  },
  {
    title: 'Blog 2',
    author: 'Author 2',
    url: 'Url 2',
    likes: 2
  },
  {
    title: 'Blog 3',
    author: 'Author 3',
    url: 'Url 3',
    likes: 3
  }
]

// note: forEach doesn't work well with async/await functions.
beforeEach(async () => {
  await Blog.deleteMany({})
  for (const blog of initialBlogs) {
    const newBlog = new Blog(blog)
    await newBlog.save()
  }
})

test.skip('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test.skip('the unique identifier property is called id', async () => {
  const res = await api.get('/api/blogs').expect(200)
  expect(res.body[0].id).toBeDefined()
})

test.skip('a valid blog can be added', async () => {
  const blog = {
    title: 'test',
    author: 'test',
    url: 'test',
    likes: 0
  }

  let blogs = await api.get('/api/blogs')
  expect(blogs.body).toHaveLength(3)

  await api.post('/api/blogs')
    .send(blog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  blogs = await api.get('/api/blogs')
  expect(blogs.body).toHaveLength(4)
  expect({ title: blogs.body[3].title, author: blogs.body[3].author, url: blogs.body[3].url, likes: blogs.body[3].likes }).toEqual(blog)
})

test.skip('likes property is missing from the request', async () => {
  const blog = {
    title: 'test',
    author: 'test',
    url: 'test'
  }

  await api
    .post('/api/blogs')
    .send(blog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const { body } = await api.get('/api/blogs')
  expect(body[3].likes).toBe(0)
})

test.skip('various properties of the request are missing', async () => {
  const blog = {
    author: 'test',
    likes: 3
  }

  await api
    .post('/api/blogs')
    .send(blog)
    .expect(400)
})

afterAll(async () => {
  await mongoose.connection.close()
})
