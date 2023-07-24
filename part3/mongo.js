const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('Please provide the password as an argument: node mongo.js <password>')
  process.exit(1)
}

const password = process.argv[2]

mongoose.connect(`mongodb+srv://guchooo:${password}@cluster0.suhx9ou.mongodb.net/phonebook-db?retryWrites=true&w=majority`)

const personSchema = new mongoose.Schema({
  name: String,
  number: String
})

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const Person = mongoose.model('Person', personSchema, 'persons')

if (process.argv.length === 4 || process.argv.length > 5) {
  console.log('Please provide the name and number as an argument: node mongo.js <password> "Tony R" 12-13-123456')
  process.exit(1)
} else if (process.argv.length === 5) {
  const person = new Person({
    name: process.argv[3],
    number: process.argv[4]
  })

  person
    .save()
    .then(() => {
      console.log(`added ${person.name} number ${person.number} to phonebook`)
      mongoose.connection.close()
    })
} else {
  Person.find({}).then(result => {
    console.log('phonebook')
    result.forEach(person => {
      console.log(person.name + ' ' + person.number)
    })
    mongoose.connection.close()
  })
}
