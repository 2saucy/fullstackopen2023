const Filter = ({ handleChangeFilter, filter }) => {
    return(
        <div>
            <span>filter shown with</span> 
            <input type='text' onChange={handleChangeFilter} value={filter} /> 
        </div>
    )
}

export default Filter