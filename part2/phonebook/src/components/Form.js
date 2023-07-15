const Form = ({ persons, setNewName, setNewNumber, newName, newNumber, handleChangeName, handleChangeNumber, addPerson, updateNumber }) => {

    const handleSubmit = (event) => {
        event.preventDefault()

        const personObject = persons.find(person => person.name === newName)

        if(!personObject){
            addPerson()
        }
        else{
            if(personObject.number !== newNumber && window.confirm(`${newName} is already added to phonebook, replace the old number with new one?`)){
                updateNumber(personObject.id, personObject.name, newNumber)
            }
        }
        
        setNewName('')
        setNewNumber('')
    }

    return(
        <form>
            <div>name: <input type='text' onChange={handleChangeName} value={newName} /></div>
            <div>number: <input type='text' onChange={handleChangeNumber} value={newNumber}/></div>
            <div><button type="submit" onClick={handleSubmit}>add</button></div>
        </form>
    )
}

export default Form