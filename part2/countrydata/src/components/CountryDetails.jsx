import LanguagesList from "./LanguagesList"

const CountryDetails= ({countryDetails}) => {  
  
  // Is there anything to render yet? IE have we chosen a country?
  if (!countryDetails){
    return null
  }

  return(
    <div>
      <h1>{countryDetails.name.common}</h1>
      <p>Capital {countryDetails.capital}</p>
      <p>Area {countryDetails.area}</p>
      <h2>Languages</h2>
      <LanguagesList languages={countryDetails.languages} />
      <img src={countryDetails.flags.svg} alt={countryDetails.flags.alt} width='256'></img>
    </div>
  )

}

export default CountryDetails