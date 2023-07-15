import Weather from "./Weather"

const Country = ({ country }) => {

    return(
        <div>
            <h1>{country.name.common}</h1>
            <p>capital {country.capital}</p>
            <p>population {country.population}</p>
            <h2>Spoken languages</h2>
            <ul>
                {
                    Object.keys(country.languages).map(lang => (
                        <li key={lang}>{country.languages[lang]}</li>
                    ))
                }
            </ul>
            <img src={country.flags.png} alt="Country Flag" />
            <Weather country={country} />
        </div>
    )
}

export default Country