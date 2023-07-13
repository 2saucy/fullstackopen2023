import React, { useState } from 'react'

const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filter, setFilter ] = useState('')

  const handleChangeName = (event) => {
    setNewName(event.target.value)
  }

  const handleChangeNumber = (event) => {
    setNewNumber(event.target.value)
  }

  const handleChangeFilter = (event) => {
    setFilter(event.target.value)
  }

  const handleClick = (event) => {
    event.preventDefault();

    const newPerson = {
      name: newName,
      number: newNumber,
    };

    const exist = persons.some(person => person.name === newPerson.name);
    if(exist){
      alert(`${newPerson.name} is already added to the phonebook`)
    }else{
      setPersons(persons.concat(newPerson))
      setNewName('')
      setNewNumber('')
    }
  }

  return (
    <div>
      <h1>Phonebook</h1>

      <div>filter shown with <input type='text' onChange={handleChangeFilter} value={filter} /> </div>
      
      <h2>add a new</h2>  
      <form>
        <div>name: <input type='text' onChange={handleChangeName} value={newName} /></div>
        <div>number: <input type='text' onChange={handleChangeNumber} value={newNumber}/></div>
        <div><button type="submit" onClick={handleClick}>add</button></div>
      </form>

      <h2>Numbers</h2>
      {
        filter ? (
          <ul>
            {
              persons
                .filter(person => person.name.toLowerCase().startsWith(filter.toLowerCase()))
                .map(person => <li key={person.name}>{person.name} {person.number}</li>)
            }
          </ul>
        ) : (
          <ul>
            {
              persons
                .map(person => <li key={person.name}>{person.name} {person.number}</li>)
            }
          </ul>
        )
      }

    </div>
  )
}

export default App