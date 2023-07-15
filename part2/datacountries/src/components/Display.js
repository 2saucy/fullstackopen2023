import Country from "./Country"
import Show from "./Show"

const Display = ({ countries, filter }) => {

    const filteredCountries = countries.filter(country => country.name.common.toLowerCase().startsWith(filter.toLowerCase()))

    if(filteredCountries.length > 10){
        return <p>Too many matches, specify another filter</p>
    } 
    else if (filteredCountries.length <= 10 && filteredCountries.length > 1){
        return(
            <div>
                {
                    filteredCountries.map(country => (
                        <div key={country.name.common}>
                            <span>{country.name.common}</span>
                            <Show country={country}/>
                        </div>
                    ))
                }
            </div>
        )
    } 
    else if (filteredCountries.length === 1){
        return <Country country={filteredCountries[0]} />
    }
    else{
        return <p>No results</p>
    }

}

export default Display