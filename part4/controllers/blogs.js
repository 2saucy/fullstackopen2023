const Blog = require('../models/blog')

const getAll = async () => {
    const data = await Blog.find({})
    return data
}

const create = async (blog) => {
    const newBlog = new Blog(blog)
    const data = await newBlog.save()
    return data
}

module.exports = { getAll, create }