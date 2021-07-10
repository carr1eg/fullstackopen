import React, { useState, useEffect} from 'react'
import { Phonebook } from './components/Phonebook'
import { PersonForm } from './components/PersonForm'
import { Filter } from './components/Filter'
import axios from 'axios';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [name, setName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [newFilter, setFilter] = useState('');
  const [reloadPerson, setReloadPerson] = useState(false);

  useEffect(() => {
    axios
    .get('http://localhost:3001/persons')
    .then((response) => {
      // console.log('response :>> ', response);
      setPersons(response.data)
      setReloadPerson(false);
    })
  }, [reloadPerson]);
  console.log('newFilter :>> ', newFilter);

  const addPerson = (event) => {
    event.preventDefault();
    if (persons.find(e => e.name === name)) {
      window.alert(`${name} is already added to phonebook`);
    } 
    else {
      const person = {
        name: name,
        number: newNumber
      }
      axios
        .post('http://localhost:3001/persons', person)
        .then(response => {
          console.log(response);
          setPersons(persons.concat(person));
          setName('');
          setNewNumber("");
        }
          )
    }
  }
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  }
  const handleNameChange = (event) => {
    setName(event.target.value);
  }
  const handleFilter = (event) => {
    setFilter(event.target.value);
  }
  const handleDelButton = (person) => {
    if(window.confirm(`Delete ${person.name}?`)){
console.log('person :>> ', person);
      axios
           .delete(`http://localhost:3001/persons/${person.id}`)
           .then(response => {
             console.log('response :>> ', response)
             setReloadPerson(true);

           })
           .catch(err => console.log(err))
  
}}

  const personToShow = !newFilter
    ? persons
    : persons.filter(person => {
        return person.name.toLowerCase().includes(newFilter.toLowerCase()) ? true
        : false
  });

return (
    <div>
      <h2>Phonebook</h2>
      <Filter handleFilter={handleFilter} newFilter={newFilter} />
      <h3>add a new</h3>
      <PersonForm addPerson={addPerson} name={name} handleNameChange={handleNameChange}
        newNumber={newNumber} handleNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      {/* <div>debug: {name}</div>
      <div>debug: {newNumber}</div>
      <div>debug: {newFilter}</div> */}
      {personToShow.map((personShow, i) =>
        <Phonebook key={i} person={personShow} handleDelButton={handleDelButton}/>
      )}
    </div>
  )
}



export default App