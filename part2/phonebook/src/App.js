import React, { useState, useEffect } from 'react'
import Display from './components/Display'
import Filter from './components/Filter'
import Form from './components/Form'
import axios from 'axios'

const App = () => {
  const [ persons, setPersons ] = useState([])
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

  useEffect(() => {
    axios
    .get('http://localhost:3001/persons')
    .then(response => {
      const data = response.data
      setPersons(data)
    }) 
  },[])

  return (
    <div>
      <h1>Phonebook</h1>
      <Filter handleChangeFilter={handleChangeFilter} filter={filter} />
      <h2>add a new</h2>  
      <Form newName={newName} newNumber={newNumber} handleChangeName={handleChangeName} handleChangeNumber={handleChangeNumber} handleClick={handleClick} />
      <h2>Numbers</h2>
      <Display filter={filter} persons={persons} />
    </div>
  )
}

export default App