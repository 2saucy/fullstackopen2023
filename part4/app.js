const express = require('express')
const cors = require('cors')
const app = express()
const blogController = require('./controllers/blogs') 

app.use(express.json())
app.use(cors())

app.get('/', (req, res) => {
    res.send('Blog API')
})
app.get('/api/blogs', (req, res) => {
    blogController
        .getAll()
        .then(result => {
            res.json(result)
        })
})
app.post('/api/blogs', (req, res) => {
    blogController
        .create(req.body)
        .then(result => {
            res.status(201).json(result)
        })
})

module.exports = app