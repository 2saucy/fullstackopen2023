import axios from "axios"
import { useState, useEffect } from "react"

export const useCountry = (name) => {
  const [country, setCountry] = useState(null)

  useEffect(() => {
    if (!name) {
      return
    }

    axios.get(`https://studies.cs.helsinki.fi/restcountries/api/name/${name}`)
      .then(response => {
        const newCountry = {
          found: true,
          data: {
            name: response.data.name.common,
            capital: response.data.capital[0],
            population: response.data.population,
            flag: response.data.flags.svg
          }
        }

        setCountry(newCountry)
      })
      .catch((err) => {
        const error = err.response.data.error
        if (error === "not found") {
          const newCountry = {
            found: false,
            data: {}
          }

          setCountry(newCountry)
        } else {
          console.error(error)
        }
      })
  }, [name])

  return country
}