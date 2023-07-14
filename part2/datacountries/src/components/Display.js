import Country from "./Country"

const Display = ({ countries, filter }) => {

    const filteredCountries = countries.filter(country => country.name.common.toLowerCase().startsWith(filter.toLowerCase()))

    if(filteredCountries.length > 10){
        return <p>Too many matches, specify another filter</p>
    } 
    else if (filteredCountries.length <= 10 && filteredCountries.length > 1){
        return(
            <ul>
                {
                    filteredCountries.map(country => (
                        <li key={country.name.common}>{country.name.common}</li>
                    ))
                }
            </ul>
        )
    } 
    else{
        return <Country country={filteredCountries[0]} />
    }

}

export default Display