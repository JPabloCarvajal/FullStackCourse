import { useState, useEffect } from 'react'
import axios from 'axios'

const App = () => {
  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState("")

  useEffect(() => {
    console.log('fetching countries')
    axios
      .get(`https://studies.cs.helsinki.fi/restcountries/api/all`)
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  const filteredCountries = countries.filter(country =>
    country.name.common.toLowerCase().includes(filter.toLowerCase())
  )

  const handleFilterChanges = (event) => {
    setFilter(event.target.value)
  }

  return (
    <div>
      <form>
        find countries:
        <input value={filter} onChange={handleFilterChanges} />
      </form>
      <Countries countries={filteredCountries} />
    </div>
  )
}

const Countries = ({ countries }) => {
  const [selectedCountry, setSelectedCountry] = useState(null)

  if (countries.length > 10) {
    return <p>Too many matches, specify another filter</p>
  } 
  else if (countries.length > 1 && countries.length <= 10) {
    return (
      <ul>
        {countries.map(country =>
          <li key={country.name.common}>
            {country.name.common}
            <button onClick={() => setSelectedCountry(country)}>
              show
            </button>
          </li>
        )}
        {selectedCountry && <CountryDetails country={selectedCountry} />}
      </ul>
    )
  } 
  else if (countries.length === 1) {
    return <CountryDetails country={countries[0]} />
  } 
  else {
    return <p>No matches</p>
  }
}

const CountryDetails = ({ country }) => {
  return (
    <div>
      <h2>{country.name.common}</h2>
      <p>Capital: {country.capital}</p>
      <p>Area: {country.area} km²</p>
      <h4>Languages:</h4>
      <ul>
        {Object.values(country.languages).map(lang =>
          <li key={lang}>{lang}</li>
        )}
      </ul>
      <img src={country.flags.png} alt={`Flag of ${country.name.common}`} width="150" />
    </div>
  )
}

export default App
