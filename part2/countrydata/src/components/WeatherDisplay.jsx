import { useState, useEffect } from 'react'
import weatherAPI from '../services/weatherAPI'

const WeatherDisplay= ({countryDetails}) => {  

  const [capitalWeather, setCapitalWeather] = useState(null)
  
    useEffect( () => {
      weatherAPI
      .findCapitalWeather(capitalLatLon(countryDetails))
      .then(
        weatherData => {
          setCapitalWeather(weatherData)
        }
      )
    }, [countryDetails])

    const capitalLatLon = (countryDetails) => {
      return (countryDetails.capitalInfo.latlng)
    }

  if (!capitalWeather){
    return null
  }

  const iconURL = (weatherIcon) => {
    return 'https://openweathermap.org/img/wn/' + weatherIcon + '@2x.png'
  }
  

  return(
    <div>
      <h2>Weather in {countryDetails.capital}</h2>
      <p>Temperature {capitalWeather.current.temp}° Celsius</p>
      <img src={iconURL(capitalWeather.current.weather[0].icon)}  alt={capitalWeather.current.weather[0].description} width='64'></img>
      <p>Wind {capitalWeather.current.wind_speed}m/s </p>
    </div>
  )

}

export default WeatherDisplay