const express = require("express")
const morgan = require("morgan")
const app = express()

const persons = [
    {
        name: "Arto Hellas",
        number: "040-123456",
        id: 1
    },
    {
      name: "Ada Lovelace",
      number: "39-44-5323523",
      id: 2
    },
    {
      name: "Dan Abramov",
      number: "12-43-234345",
      id: 3
    },
    {
      name: "Mary Poppendieck",
      number: "39-23-6423122",
      id: 4
    }
]

const generateId = () => {
    const maxId = persons.length > 0
      ? Math.max(...persons.map(p => p.id))
      : 0
    return maxId + 1
}

app.use(express.json())
app.use(morgan(":method :url :status :res[content-length] - :response-time ms :request-body"))

morgan.token("request-body", (req, res) =>  { 
    return JSON.stringify(req.body)
})


app.get("/", (req, res) => {
    res.send("Welcome to Phonebook API")
})

app.get("/api/persons", (req, res) => {
    res.json(persons)
})

app.get("/api/persons/:id", (req, res) => {
    const id = Number(req.params.id)
    const person = persons.filter(person => person.id === id)
    res.json(person)
})

app.delete("/api/persons/:id", (req, res) => {
    const id = Number(req.params.id)
    const newPersons = persons.filter(person => person.id !== id)
    res.json(newPersons)
})

app.post("/api/persons", (req, res) => {
    const body = req.body

    if (!body.name || !body.number) {
        return res.status(400).json({ 
            error: 'content missing' 
        })
    }
    else if(persons.find(person => person.name === body.name)){
        return res.status(401).json({ 
            error: 'name must be unique' 
        })
    }

    const personObject = {
        name: body.name,
        number: body.number,
        id: generateId()
    }
    const newPersons = persons.concat(personObject)
    res.json(newPersons)
})

app.get("/info", (req, res) => {
    const currentDate = new Date()
    res.send(`Phonebook has info for ${persons.length} people <br> ${currentDate}`)
})

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running in port ${PORT}.`)
})