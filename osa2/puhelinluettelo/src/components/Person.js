import React from 'react'

const Person = ({ person, removePerson }) => {
  return (
      <p> {person.name} {person.number} <button id={person.id} onClick={removePerson}>delete</button></p>
    )
}

export default Person