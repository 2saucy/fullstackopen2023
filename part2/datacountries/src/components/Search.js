const Search = ({ filter, setFilter }) => {

    const handleChangeSearch = (event) => {
        setFilter(event.target.value)
    }

    return(
        <div>
            <span>Search countries: </span>
            <input onChange={handleChangeSearch} value={filter}></input>
        </div>
    )
}

export default Search