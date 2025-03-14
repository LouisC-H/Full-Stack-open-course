import { useState, useEffect } from 'react'
import countriesAPI from './services/countriesAPI'
import CountriesList from './components/CountryNamesList'
import Filter from './components/Filter'
import CountryDetails from './components/CountryDetails'

const App = () => {
  const [countriesNames, setCountriesNames] = useState(null)
  const [countryDetails, setCountryDetails] = useState(null)
  const [nameFilter, setNameFilter] = useState('')
  
  const handleFilterChange = (event) => {setNameFilter(event.target.value)}
  const handleCountryFound = (countryName) => {
    setNameFilter(countryName)
    countriesAPI
          .find(countryName)
          .then(
            countryData => {
              setCountryDetails(countryData)
            }
          )
  }
  const handleCountryNotFound = () => {setCountryDetails(null)}
  
  // After first startup, trigger this code
  useEffect( () => {
    // Get all data from the country data API
    countriesAPI
      .getAll()
      .then(
        // Then, for each country, extract the common name and save it to a list
        countriesData => {
          setCountriesNames(countriesData.reduce(
            (namesList, country) => {
                namesList.push(country.name.common)
                return namesList
              }, []
            ) 
          )
        }
      )
  }, [])

  // On first startup, before the countries name list is initialised, don't return anything
  if (!countriesNames) {
    return null
  }

  return (
    <>
      <div>
        <Filter value={nameFilter} filterStateHandler={handleFilterChange} />
        <CountriesList 
          countries={countriesNames}
          nameFilter={nameFilter}
          countryFoundHandler={handleCountryFound}
          countryNotFoundHandler={handleCountryNotFound}
          countryDetails={countryDetails}
        />
        <CountryDetails
          countryDetails={countryDetails}
        />
      </div>
    </>
  )
}

export default App
