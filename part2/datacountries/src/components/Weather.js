import axios from 'axios'
import { useEffect, useState } from 'react'

const Weather = ({ country }) => {

    const [weather, setWeather] = useState();

    useEffect(() => {
        const apikey= process.env.REACT_APP_API_KEY
        axios
            .get(`http://api.weatherstack.com/current?access_key=${apikey}&query=${country.name.common}`)
            .then(res => {
                const {data} = res
                setWeather(data)
            })
    },[])

    if(!weather){
        return
    }
    else{
        return(
            <div>
                <h2>Weather in {weather.location.name}</h2>
                <p><b>temperature</b> {weather.current.temperature} Celsius</p>
                <img src={weather.current.weather_icons[0]} alt="Weather Icon" />
                <p><b>wind</b> {weather.current.wind_speed} mph direction {weather.current.wind_dir}</p>
            </div>
        )
    }
}

export default Weather