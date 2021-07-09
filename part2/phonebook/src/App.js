import React, { useState } from 'react'
import { Phonebook } from './components/Phonebook'
import { PersonForm } from './components/PersonForm'
import { Filter } from './components/Filter'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])
  const [name, setName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [newFilter, setFilter] = useState('');
  console.log('newFilter :>> ', newFilter);
  const addPerson = (event) => {
    event.preventDefault();
    if (persons.find(e => e.name === name)) {
      window.alert(`${name} is already added to phonebook`);
    } else {
      const person = {
        name: name,
        number: newNumber
      }
      setPersons(persons.concat(person));
      setName('');
      setNewNumber("");
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

  const personToShow = !newFilter
    ? persons
    : persons.filter(person => {
      return person.name.toLowerCase().includes(newFilter.toLowerCase()) ? true
        : false
    });
  console.log(personToShow);

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
        <Phonebook key={i} person={personShow} />
      )}
    </div>
  )
}



export default App