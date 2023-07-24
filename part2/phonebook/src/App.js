import React, { useState, useEffect } from 'react'
import PersonServices from './services/persons'
import Display from './components/Display'
import Filter from './components/Filter'
import Form from './components/Form'
import Notification from './components/Notification'



const App = () => {
  const [ persons, setPersons ] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filter, setFilter ] = useState('')
  const [ notification, setNotification ] = useState({
    message: '',
    error: false
  })

  const handleChangeName = (event) => {
    setNewName(event.target.value)
  }

  const handleChangeNumber = (event) => {
    setNewNumber(event.target.value)
  }

  const handleChangeFilter = (event) => {
    setFilter(event.target.value)
  }

  const clearNotification = () => {
    setTimeout(() => {
      setNotification({
        message: '',
        error: false
      })
    }, 5000)
  }

  const addPerson = () => {
    const personObject = {
      name: newName,
      number: newNumber,
    };

    PersonServices
      .create(personObject)
      .then(data => {
        setPersons(persons.concat(data))
        setNotification({
          message: `Added ${data.name}`,
          error: false
        })
      })
      .catch(err => {
        const message = err.response.data
        setNotification({
          message: message.error,
          error: true
        })
      })

    clearNotification()
  }

  const deletePerson = ( id ) => {
    PersonServices
      .remove(id)
      .then(data => {
        setPersons(prevPersons => prevPersons.filter((person) => person.id !== id))
      })
      .catch(err => {
        setNotification({
          message: err.message,
          error: true
        })
      })

    clearNotification()
  }

  const updateNumber = ( id, name, number ) => {
    const personObject = {
      name: name,
      number: number
    };

    PersonServices
      .update(id, personObject)
      .then(data => {
        const newPersons = persons.map(person => {
          if(person.id === id){
            return data
          }
          return person
        })
        setPersons(newPersons)
        setNotification({
          message: `Number updated`,
          error: false
        })
      })
      .catch(err => {
        setNotification({
          message: err.message,
          error: true
        })
      })
    
    clearNotification()
  }

  useEffect(() => {
    PersonServices
      .getAll()
      .then(data => {
        setPersons(data)
      })
      .catch(err => {
        setNotification({
          message: err.message,
          error: true
        })
      })

    clearNotification()
  },[])


  return (
    <div>
      <h1>Phonebook</h1>
      <Notification notification={notification}/>
      <Filter handleChangeFilter={handleChangeFilter} filter={filter} />
      <h2>add a new</h2>  
      <Form persons={persons} setNewName={setNewName} setNewNumber={setNewNumber} newName={newName} newNumber={newNumber} handleChangeName={handleChangeName} handleChangeNumber={handleChangeNumber} addPerson={addPerson} updateNumber={updateNumber} />
      <h2>Numbers</h2>
      <Display filter={filter} persons={persons} deletePerson={deletePerson} />
    </div>
  )
}

export default App
