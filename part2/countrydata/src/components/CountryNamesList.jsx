const CountriesList = ({countries, nameFilter, countryFoundHandler, countryNotFoundHandler, countryDetails}) => {  
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
      console.log(nameFilter);
      return countryName
    }
    return matchingName
  }, null
  )
  
  console.log('exactMatch: ', exactMatch);
  
  
  // Check whether a single county has now been identified
  if (filteredCountries.length === 1 && !countryDetails || exactMatch && !countryDetails) {
    countryFoundHandler(exactMatch)
  } else if (filteredCountries.length != 1 && countryDetails && !exactMatch) {
    countryNotFoundHandler()
  }

  // Check what to render depending on the number of countries found
  if (filteredCountries.length <= 1) {
    return null
  } else if (filteredCountries.length >= 10) {
    return(
      <p>
        Too many matches, please make your query more specific
      </p> 
    )
  } else {
    console.log(filteredCountries);
    
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