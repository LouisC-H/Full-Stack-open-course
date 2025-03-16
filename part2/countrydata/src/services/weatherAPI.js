import axios from 'axios'

const baseUrl = 'https://api.openweathermap.org/data/3.0/onecall?lat='
const apiKey = import.meta.env.VITE_SOME_KEY

const findCapitalWeather = ([latitude, longitude]) => {
  const request = axios.get(baseUrl + latitude + '&lon=' + longitude + '&units=metric&exclude=minutely,hourly,daily,alerts&appid=' + apiKey)  
  return request.then(response => response.data)
}

export default { findCapitalWeather }