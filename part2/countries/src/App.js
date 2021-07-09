import React, {useState, useEffect } from 'react'
import axios from 'axios';

function App() {
  const [input, setInput] = useState("");
  const [countries, setCountries] = useState("");
  useEffect(() => {
    axios
      .get(`https://restcountries.eu/rest/v2/name/${input}`) 
      .then((response) => {
        console.log('response :>> ', response);
        setCountries(response.data)
      })
  }, [input])

  const handleSearch = (event) => {
    setInput(event.target.value);
  }
const handleClick = (event) => {
  setInput(event.target.value);
}
  return (
    <div className="App">
     find countries 
     <input value={input} onChange={handleSearch}></input>
     <div>
      <Countries countries={countries} handleClick={handleClick}/>
     </div>
    </div>
  );
}

const Countries = ({countries, handleClick}) => {
  //console.log('countries :>> ', countries);
  if(!countries){
    return(<div></div>)
  }
  if(countries.length > 10) {
    return (
      <div>
        Too many matches, specify another filter
      </div>
    )
  }else if (countries.length > 1) {
    const divs = countries.map((e) => 
      <div> {e.name} 
      <button value={e.name} onClick={handleClick}>show</button>
      </div>)

    return (
      <div>
       {divs}
      </div>
     )
  }else if(countries.length === 1){
    console.log('countries[0] :>> ', countries[0]);
    return (
      <DisplayCountry country={countries[0]}/>
    )
  }
}
export default App;

const DisplayCountry = ({country}) => {
  console.log('country :>> ', country);
  return(
    <div>
    <h1>{country.name}</h1>
    <p>capital {country.capital}</p>
    <p>population {country.population}</p>
    <h2>languages</h2>
    {country.languages.map((e) => 
      <div> {e.name} </div>
    )}
    <img alt='flag' src={country.flag} width='400'></img>
  </div>

  )
}