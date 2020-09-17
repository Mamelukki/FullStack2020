import React, { useState, useEffect } from 'react'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import Person from './components/Person'
import Notification from './components/Notification'
import personService from './services/persons'

const App = () => {
  const [ persons, setPersons] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ showFiltered, setShowFiltered ] = useState('')
  const [ message, setMessage ] = useState(null)
  const [ messageType, setMessageType ] = useState(null)
 
  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const handlePersonChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setShowFiltered(event.target.value)
    console.log(showFiltered.toLowerCase())
  } 

  const removePerson = id => {
    const person = persons.find(p => p.id === id)
    if (window.confirm(`Delete ${person.name}?`)) {
      personService
        .remove(id)
          .then(response => {
          setPersons(persons.filter(person => person.id !== id))
        })
        setMessage(`Deleted ${person.name} from the phonebook`)
        setMessageType('success')
        setTimeout(() => {
          setMessage(null)
          setMessageType(null)
        }, 5000)
    }
  }

  const personsToShow = persons.filter(person => person.name.toLowerCase().includes(showFiltered.toLowerCase()))

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber
    }
    
    // filter the array based on the wanted name
    // if the name is not found from the array, the list length is 0
    const filteredPersons = persons.filter(person => person.name.toLowerCase() === personObject.name.toLowerCase())

    if (filteredPersons.length === 0) {
      personService
        .create(personObject)
          .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))

          setMessage(`Added ${newName} into the phonebook`)
          setMessageType('success')
          setTimeout(() => {
            setMessage(null)
            setMessageType(null)
          }, 5000)
        })
        .catch(error => {
          setMessage(error.response.data.error)
          setMessageType('error')
          setTimeout(() => {
            setMessage(null)
            setMessageType(null)
          }, 5000)
        })
    } else {
      if (window.confirm(`${personObject.name} is already added to phonebook, replace the old number with a new one?`)) {
        const person = persons.find(p => p.name === newName)
        const changedPerson = { ...person, number: newNumber }

        personService
          .update(person.id, changedPerson)
            .then(returnedPerson => {
            setPersons(persons.map(person => person.id !== returnedPerson.id ? person : returnedPerson))
            
            setMessage(`Changed the number of ${newName} to ${newNumber}`)
            setMessageType('success')
            setTimeout(() => {
              setMessage(null)
              setMessageType(null)
            }, 5000)
          })
          .catch(error => {
            setMessage(`Information of ${person.name} has already been removed from the server`)
            setMessageType('error')
            setTimeout(() => {
              setMessage(null)
              setMessageType(null)
            }, 5000)
          })
      }
    }
    setNewName('')
    setNewNumber('')
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} type={messageType}/>
      <Filter showFiltered={showFiltered} handleFilterChange={handleFilterChange} />
      <h2>Add a new</h2>
      <PersonForm addPerson={addPerson} newName={newName} handlePersonChange={handlePersonChange} newNumber={newNumber} handleNumberChange={handleNumberChange} />
      <h2>Numbers</h2>
      {personsToShow.map((person, i) => 
        <Person key={i} person={person} removePerson={() => removePerson(person.id)} />)
      }
    </div>
  )
}

export default App