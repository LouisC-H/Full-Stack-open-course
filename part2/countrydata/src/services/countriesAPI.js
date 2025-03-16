import axios from 'axios'

const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/'

const getAll = () => {
  const request = axios.get(baseUrl + 'api/all')  
  return request.then(response => response.data)
}

const find = (countryName) => {
  const request = axios.get(baseUrl + 'api/name/' + countryName)  
  return request.then(response => response.data)
}

export default { getAll, find }