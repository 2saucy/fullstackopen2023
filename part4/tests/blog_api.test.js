/* eslint-env jest */

const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const User = require('../models/user')
const bcrypt = require('bcrypt')

const initialBlogs = [
  {
    title: 'Discovering the Cosmos: Journey through the Universe',
    author: 'Gabriel',
    url: 'https://www.gabriel-test.com',
    likes: 1
  },
  {
    title: 'The Impact of AI in Modern Society',
    author: 'Hanna',
    url: 'https://www.hanna-test.com',
    likes: 2
  },
  {
    title: 'Embracing Environmental Sustainability: Caring for Our Planet',
    author: 'Dante',
    url: 'https://www.dante-test.com',
    likes: 3
  }
]

const createTestUser = async () => {
  await User.deleteMany({})
  const passwordHash = await bcrypt.hash('1234', 10)
  const user = new User({
    username: 'test',
    name: 'test',
    passwordHash,
    blogs: []
  })
  await user.save()
}

const createTestBlogs = async () => {
  await Blog.deleteMany({})
  const users = await User.find({})
  const user = users[0]

  // note: forEach doesn't work well with async/await functions.
  for (const blog of initialBlogs) {
    blog.user = user._id
    const savedBlog = await new Blog(blog).save()
    user.blogs = user.blogs.concat(savedBlog._id)
  }
  await user.save()
}

const getToken = async (username, password) => {
  const res = await api
    .post('/api/login')
    .send({ username, password })
  const { token } = res.body
  return token
}

beforeEach(async () => {
  await createTestUser()
  await createTestBlogs()
})

describe('Old tests', () => {
  test('Blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })
  test('The unique identifier property is called id', async () => {
    const res = await api.get('/api/blogs').expect(200)
    const blogs = res.body
    expect(blogs[0].id).toBeDefined()
  })
  test('A valid blog can be added', async () => {
    const token = await getToken('test', '1234')

    const newBlog = {
      title: 'test',
      author: 'test',
      url: 'test',
      likes: 0
    }

    let res = await api.get('/api/blogs')
    const blogsAtStart = res.body

    await api.post('/api/blogs')
      .send(newBlog)
      .set('Authorization', `Bearer ${token}`)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    res = await api.get('/api/blogs')
    const blogsAtEnd = res.body

    expect(blogsAtEnd).toHaveLength(blogsAtStart.length + 1)
    expect(blogsAtEnd[blogsAtEnd.length - 1].title).toBe('test')
  })
  test('Likes property is missing from the request', async () => {
    const token = await getToken('test', '1234')

    const testBlog = {
      title: 'test',
      author: 'test',
      url: 'test'
    }

    let res = await api.get('/api/blogs')
    const blogsAtStart = res.body

    await api
      .post('/api/blogs')
      .send(testBlog)
      .set('Authorization', `Bearer ${token}`)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    res = await api.get('/api/blogs')
    const blogsAtEnd = res.body

    expect(blogsAtEnd).toHaveLength(blogsAtStart.length + 1)
    expect(blogsAtEnd[blogsAtEnd.length - 1].likes).toBe(0)
  })
  test('Various properties of the request are missing', async () => {
    const testBlog = {
      author: 'test',
      likes: 3
    }

    let res = await api.get('/api/blogs')
    const blogsAtStart = res.body

    await api
      .post('/api/blogs')
      .send(testBlog)
      .expect(400)

    res = await api.get('/api/blogs')
    const blogsAtEnd = res.body

    expect(blogsAtEnd).toHaveLength(blogsAtStart.length)
  })
})

describe('Create Blog', () => {
  test('Creates a blog successfully.', async () => {
    const token = await getToken('test', '1234')

    const newBlog = {
      title: 'test title',
      author: 'test author',
      url: 'test url'
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .set('Authorization', `Bearer ${token}`)
      .expect(201)
      .expect('Content-Type', /application\/json/)
  })
  test('Fails with 400 when not pass the title or url.', async () => {
    const token = await getToken('test', '1234')

    const newBlogWithoutTitle = {
      author: 'test author',
      url: 'test url'
    }
    let res = await api
      .post('/api/blogs')
      .send(newBlogWithoutTitle)
      .set('Authorization', `Bearer ${token}`)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(res.body.error).toBe('content can not be empty.')

    const newBlogWithoutUrl = {
      title: 'test title',
      author: 'test author'
    }
    res = await api
      .post('/api/blogs')
      .send(newBlogWithoutUrl)
      .set('Authorization', `Bearer ${token}`)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(res.body.error).toBe('content can not be empty.')
  })
  test('Fails with 401 when token is missing.', async () => {
    const newBlog = {
      title: 'test title',
      author: 'test author',
      url: 'test url'
    }
    const res = await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(401)
      .expect('Content-Type', /application\/json/)

    expect(res.body.error).toBe('token is missing or invalid.')
  })
})

describe('Delete Blog', () => {
  test('Deletes a blog successfully.', async () => {
    const token = await getToken('test', '1234')

    const blogsAtStart = await Blog.find({})
    const blog = blogsAtStart[0]

    await api
      .delete(`/api/blogs/${blog._id}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(204)

    const blogsAtEnd = await Blog.find({})
    expect(blogsAtEnd).toHaveLength(blogsAtStart.length - 1)
  })
  test('Fails with 404 when try to delete a non-existing blog.', async () => {
    const token = await getToken('test', '1234')
    const blogs = await Blog.find({})
    const blog = blogs[0]
    await api.delete(`/api/blogs/${blog._id}`).set('Authorization', `Bearer ${token}`)
    const res = await api
      .delete(`/api/blogs/${blog._id}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(404)
      .expect('Content-Type', /application\/json/)
    expect(res.body.error).toBe('blog does\'t exist or the id is invalid.')
  })
  test('Fails with 401 when token is missing.', async () => {
    const blogs = await Blog.find({})
    const blog = blogs[0]

    const res = await api
      .delete(`/api/blogs/${blog._id}`)
      .expect(401)
      .expect('Content-Type', /application\/json/)

    expect(res.body.error).toBe('token is missing or invalid.')
  })
  test('Fails with 401 when user token is unauthorized.', async () => {
    const passwordHash = await bcrypt.hash('asdasd', 10)
    const newUser = new User({
      username: 'test2',
      name: 'test2',
      passwordHash,
      blogs: []
    })
    await newUser.save()

    const token = await getToken('test2', 'asdasd')

    const blogs = await Blog.find({})
    const blog = blogs[0]

    const res = await api
      .delete(`/api/blogs/${blog._id}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(401)
      .expect('Content-Type', /application\/json/)

    expect(res.body.error).toBe('you don\'t have permissions to do that.')
  })
})

describe('Create User', () => {
  test('Create a user successfully.', async () => {
    const newUser = {
      username: '2saucy',
      name: 'Juan',
      password: 'asd1234'
    }

    let res = await api.get('/api/users')
    const usersAtStart = res.body

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    res = await api.get('/api/users')
    const usersAtEnd = res.body

    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)
    expect(usersAtEnd[usersAtEnd.length - 1].username).toContain(newUser.username)
  })
  test('Fails with 409 when username already exist.', async () => {
    const newUser = {
      username: 'test', // test username already exist in db
      name: '....',
      password: '....'
    }

    let res = await api.get('/api/users')
    const usersAtStart = res.body

    res = await api
      .post('/api/users')
      .send(newUser)
      .expect(409)
      .expect('Content-Type', /application\/json/)

    expect(res.body.error).toBe('username is already in use.')

    res = await api.get('/api/users')
    const usersAtEnd = res.body

    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })
  test('Fails with 400 when password or username is below 3 digits.', async () => {
    let res = await api.get('/api/users')
    const usersAtStart = res.body

    let newUser = {
      username: '....',
      name: '....',
      password: 'a'
    }
    res = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)
    expect(res.body.error).toBe('password must be at least 3 digits long.')

    newUser = {
      username: 'a',
      name: '....',
      password: '....'
    }
    res = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)
    expect(res.body.error).toBe('username must be at least 3 digits long.')

    res = await api.get('/api/users')
    const usersAtEnd = res.body

    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })
  test('Fails with 422 when not pass the password or username.', async () => {
    let newUser = {
      username: '....',
      name: '....'
    }

    let res = await api.get('/api/users')
    const usersAtStart = res.body

    res = await api
      .post('/api/users')
      .send(newUser)
      .expect(422)
      .expect('Content-Type', /application\/json/)
    expect(res.body.error).toBe('username or password is missing.')

    newUser = {
      name: '....',
      password: '....'
    }

    res = await api
      .post('/api/users')
      .send(newUser)
      .expect(422)
      .expect('Content-Type', /application\/json/)

    expect(res.body.error).toBe('username or password is missing.')

    res = await api.get('/api/users')
    const usersAtEnd = res.body

    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })
})

afterAll(async () => {
  await mongoose.connection.close()
})
