const express = require("express")
const morgan = require("morgan")
const cors = require("cors")
const mongoose = require('mongoose')
const app = express()
const Person = require('./models/Person')


const persons = [
    {
        name: "Joe",
        number: "00-00-000000"
    },
    {
        name: "Billy",
        number: "00-00-000000"
    }
]

app.use(cors())
app.use(express.json())
app.use(morgan(":method :url :status :res[content-length] - :response-time ms :request-body"))

morgan.token("request-body", (req, res) =>  { 
    return JSON.stringify(req.body)
})

app.get("/", (req, res) => {
    res.send("Welcome to Phonebook API")
})

app.get("/api/persons", (req, res) => {
    Person
        .find({})
        .then(person => res.json(person))
})

app.get("/api/persons/:id", (req, res) => {
    const id = req.params.id
    Person
        .findById(id)
        .then(person => res.json(person))
        .catch(err => res.json({ message: err.message }))

})

app.delete("/api/persons/:id", (req, res) => {
//      const id = Number(req.params.id)
//      const deletedPerson = persons.filter(person => person.id === id)
//      persons = persons.filter(person => person.id !== id)
//      res.json({ message: "the person was successfully removed", deletedPerson: deletedPerson})
})

app.post("/api/persons", (req, res) => {
    const body = req.body

    if (!body.name || !body.number) {
        return res.status(400).json({ 
            error: 'content missing' 
        })
    }

    const personObject = new Person({
        name: body.name,
        number: body.number
    })

    personObject
        .save()
        .then(() => {
            console.log(`added ${personObject.name} number ${personObject.number} to phonebook`)
            mongoose.connection.close()
        })

    res.json(personObject)
})

app.get("/info", (req, res) => {
    const currentDate = new Date()
    res.send(`Phonebook has info for ${persons.length} people <br> ${currentDate}`)
})

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running in port ${PORT}.`)
})