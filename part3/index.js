const express = require("express")
const morgan = require("morgan")
const cors = require("cors")
const mongoose = require('mongoose')
const app = express()
const Person = require('./models/Person')

app.use(express.json())
app.use(cors())
app.use(morgan(":method :url :status :res[content-length] - :response-time ms :request-body"))

morgan.token("request-body", (req, res) =>  { 
    return JSON.stringify(req.body)
})

app.get("/", (req, res) => {
    res.send("Welcome to Phonebook API")
})

app.get("/api/persons", (req, res, next) => {
    Person
        .find({})
        .then(result => res.json(result))
        .catch(err => next(err))
})

app.get("/api/persons/:id", (req, res, next) => {
    const id = req.params.id
    Person
        .findById(id)
        .then(result => {
            if(result){
                res.json(result)
            }
            else{
                res.status(404).end()
            }
        })
        .catch(err => next(err))
})

app.delete("/api/persons/:id", (req, res, next) => {
    const id = req.params.id
    Person
        .findByIdAndRemove(id)
        .then(result => res.status(204).json(result))
        .catch(err => next(err))
})

app.put("/api/persons/:id", (req, res, next) => {
    const id = req.params.id
    const body = req.body

    if (!body.name || !body.number) {
        return res.status(400).json({ 
            error: 'content missing' 
        })
    }

    const updatedPerson = {
        name: body.name,
        number: body.number
    }

    Person
        .findByIdAndUpdate(id, updatedPerson, { new: true })
        .then((result) => res.json(result))
        .catch(err => next(err))
})

app.post("/api/persons", (req, res, next) => {
    const body = req.body

    if (!body.name || !body.number) {
        return res.status(400).json({ 
            error: 'content missing' 
        })
    }

    const newPerson = new Person({
        name: body.name,
        number: body.number
    })

    newPerson
        .save()
        .then((result) => res.json(result))
        .catch(err => next(err))

})

app.get("/info", async (req, res) => {
    const currentDate = new Date()
    const persons = await Person.find({})
    res.send(`Phonebook has info for ${persons.length} people <br> ${currentDate}`)
})

const unknownEndpoint = (req, res) => {
    res.status(404).send({ error: "unknown endpoint" })
}

app.use(unknownEndpoint)

const errorHandler = (error, req, res, next) => {
    console.log(error.message)

    if(error.name === 'CastError'){
        return res.status(400).send({ error: "malformated id" })
    }

    next(error)
}

app.use(errorHandler)

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running in port ${PORT}.`)
})