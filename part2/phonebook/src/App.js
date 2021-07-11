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
  const [message, setMessage] = useState(null);

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
      window.confirm(`${name} is already added to phonebook,replace the old number with a new one?`);
      let id = persons.filter(e => e.name === name)[0].id;
      const person = {
        name: name,
        number: newNumber
      }
      axios
        .put(`http://localhost:3001/persons/${id}`, person)
        .then(response => {
          setPersons(persons.map(person => person.id !== id ? person : response.data));
          setName('');
          setNewNumber('');
          setMessage(
            `Updated ${person.name}`
          )
          setTimeout(() => {
            setMessage(null)
          }, 5000)
        })
        .catch(error => {
          setMessage(
            `${person.name} is already deleted from the database :(`
          )
          setTimeout(() => {
            setMessage(null)
          }, 5000)
          setName('');
          setNewNumber("");
          })
    } 
    else {
      const person = {
        name: name,
        number: newNumber
      }
      axios
        .post('http://localhost:3001/persons', person)
        .then(response => {
          setPersons(persons.concat(person));
          setName('');
          setNewNumber("");
          setMessage(
            `Added ${person.name}`
          )
          setTimeout(() => {
            setMessage(null)
          }, 5000)
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
  const handleDelButton = (event) => {
    if(window.confirm(`Delete ${event.target.value}?`)){
      axios
           .delete(`http://localhost:3001/persons/${event.target.dataset.mssg}`)
           .then(response => {
             console.log('response :>> ', response)
             setReloadPerson(true);

           })
           .catch(error => {
            setMessage(
              `${event.target.value} is already deleted from the database :(`
            )
            setTimeout(() => {
              setMessage(null)
            }, 5000)
            setName('');
            setNewNumber("");
            })  
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
      <Notification notification={message}/>
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

const Notification = ({notification}) => {
  if(notification === null){
    return null;
  }
  return(
    <div className="notification">
      {notification}
    </div>
  )
}

export default App