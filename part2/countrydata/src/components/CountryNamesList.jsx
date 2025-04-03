const CountriesList = ({countries, nameFilter, countryFoundHandler, countryNotFoundHandler, hasFoundCountry}) => {  
  
  // Remove countries whose names don't correspond to the filter
  var filteredCountries = countries.reduce((filteredList, countryName) => {
      if (countryName.toLowerCase().includes(nameFilter.toLowerCase())){
        filteredList.push(countryName)
      }      
      return filteredList
    }, []
  )

  var exactMatch = countries.reduce((matchingName, countryName) => {
    if (countryName.toLowerCase() === nameFilter.toLowerCase()){
      return countryName
    }
    return matchingName
  }, null
  )  
  
  // If we haven't yet found a single country to display
  if (!hasFoundCountry) {
    // If we've narrowed it down to one country or we exactly match a country's name, set it as found
    if (exactMatch) {
      countryFoundHandler(exactMatch)
    } else if (filteredCountries.length === 1) {
      countryFoundHandler(filteredCountries[0])
    }
  } else {
    // If we've already narrowed it down to a single country, monitor to find when that is no longer the case
    if (filteredCountries.length != 1 && !exactMatch) {
      countryNotFoundHandler()
    }
  }

  // Check what to render depending on the number of countries found
  if (filteredCountries.length <= 1 || hasFoundCountry) {
    return null
  } else if (filteredCountries.length >= 10) {
    return(
      <p>
        Too many matches, please make your query more specific
      </p> 
    )
  } else {    
    return (
      filteredCountries.map(countryName => 
        <p key={countryName}>
          {countryName}
          <button onClick={() => countryFoundHandler(countryName)}>show</button>
        </p> 
      )
    )
  }
}

export default CountriesList