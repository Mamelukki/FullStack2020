import React, { useState, useEffect } from 'react'
import axios from 'axios'

const App = () => {
  const [countries, setCountries] = useState([])
  const [searchedCountry, setSearchedCountry] = useState('')
  const [currentWeather, setCurrentWeather] = useState([])
  const [capital, setCapital] = useState()

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  useEffect(() => {
    const api_key = process.env.REACT_APP_API_KEY
    const country = countries.filter(country => country.name.toLowerCase().includes(searchedCountry.toLowerCase()))
    
    if (country !== undefined && country.length === 1) {
      setCapital(country[0].capital)
    }

    if(capital !== undefined) {
    axios
      .get(`http://api.weatherstack.com/current?access_key=${api_key}&query=${capital}`)
      .then(response => {
        setCurrentWeather(response.data.current)
    })
  }
  }, [capital, countries, searchedCountry])

  

  const handleCountryChange = (event) => {
    event.preventDefault()
    setSearchedCountry(event.target.value)
    const country = countries.filter(country => country.name.toLowerCase().includes(event.target.value.toLowerCase()))
    if (country !== undefined && country.length === 1) {
      setCapital(country[0].capital)
    }
  }

  const handleShowClick = (event) => {
    setSearchedCountry(event.target.id)
  }

  const countriesToShow = countries.filter(country => country.name.toLowerCase().includes(searchedCountry.toLowerCase()))

  const renderCountries = () => {
    if (countriesToShow.length > 10) {
      return (
        <div>Too many matches, specify another filter</div>
      )
    }

    if (countriesToShow.length > 1) {
      return ( 
        countriesToShow.map(country => 
          <div key={country.name}>{country.name} <button id={country.name} onClick={handleShowClick} >show</button> </div>
        )
      )
    }

    return (
      countriesToShow.map(country => 
        <div key={country.name}>
          <h1>{country.name}</h1>
          <div>capital {country.capital}</div>
          <div>population {country.population}</div>
          <h2>Languages</h2>
          {country.languages.map(language => <li key={language.name}>{language.name}</li>)}
          <br></br>
          {<img src={country.flag} alt={`The flag of ${country.name}`} width="25%" height="25%" />}
          {currentWeather !== undefined ?  
            <div>
              <h2>Weather in {country.capital} </h2>
            <div>
              <b>temperature:</b> {currentWeather.temperature} celsius
            </div>
            <div>
              {<img src={currentWeather.weather_icons} alt={`The weather icon of ${country.capital}`} width="10%" height="10%" />}
            </div>
            <div>
              <b>wind:</b> {currentWeather.wind_speed} mph direction {currentWeather.wind_dir}
            </div> 
          </div> : null}
        </div>
      )
    )
  }

  return (
    <div>
      Find countries 
      <input
        value={searchedCountry}
        onChange={handleCountryChange}
      />
      {renderCountries()}
    </div>
  )
}

export default App
