const Form = ({ newName, newNumber, handleChangeName, handleChangeNumber, handleClick }) => {
    return(
        <form>
            <div>name: <input type='text' onChange={handleChangeName} value={newName} /></div>
            <div>number: <input type='text' onChange={handleChangeNumber} value={newNumber}/></div>
            <div><button type="submit" onClick={handleClick}>add</button></div>
        </form>
    )
}

export default Form