import React from 'react'

const PersonForm = ({addPerson, newName, handlePersonChange, newNumber, handleNumberChange}) => {
    return (
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
    )
}

export default PersonForm