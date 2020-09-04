import React, { useState } from 'react'

const App = () => {
  const [ persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [showFiltered, setShowFiltered] = useState('')

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

  const personsToShow = persons.filter(person => person.name.toLowerCase().includes(showFiltered.toLowerCase()))

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber,
      id: persons.length + 1
    }
    
    // filter the array based on the wanted name
    // if the name is not found from the array, the list length is 0
    const filteredPersons = persons.filter(person => person.name === personObject.name)

    if (filteredPersons.length === 0) {
      setPersons(persons.concat(personObject))
    } else {
      window.alert(`${personObject.name} is already added to phonebook`)
    }
    setNewName('')
    setNewNumber('')
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        filter shown with: 
        <input 
          value={showFiltered}
          onChange={handleFilterChange}
        />
      </div>
      <h2>Add a new</h2>
      <form onSubmit={addPerson}>
        <div>
          name: 
          <input 
            value={newName}
            onChange={handlePersonChange}
          />
        </div>
        <div>
        <div>
          number: 
          <input 
            value={newNumber}
            onChange={handleNumberChange}
          />
        </div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {personsToShow.map((person, i) => 
          <p key={i}> {person.name} {person.number} </p>
        )}
    </div>
  )

}

export default App