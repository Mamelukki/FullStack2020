import React, { useState } from 'react'
import Select from 'react-select'
import { useMutation } from '@apollo/client'
import { EDIT_BIRTH_YEAR, ALL_AUTHORS } from '../queries'

const Authors = ({ show, setError, authors, token }) => {
  const [name, setName] = useState('')
  const [born, setBorn] = useState('')
  const [ changeBirthYear ] = useMutation(EDIT_BIRTH_YEAR, {
    refetchQueries: [ { query: ALL_AUTHORS } ],
    onError: (error) => {      
      setError(error.graphQLErrors[0].message)    
    }
  })

  if (!show) {
    return null
  }

  const options = authors.map(author => ({ value: author.name, label: author.name }))

  const submit = async (event) => {
    event.preventDefault()

    changeBirthYear({ variables: { name, born: Number(born) }})
    
    setBorn('')
  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              born
            </th>
            <th>
              books
            </th>
          </tr>
          {authors.map(a =>
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          )}
        </tbody>
      </table>
      {!token ? null :
      <div>
        <h2>set birth year</h2>
        <form onSubmit={submit}>
          <div>
            <Select 
              options={options} 
              onChange={(event) => setName(event.value)}
            />
          </div>
          <div>
            born
            <input
              type='number'
              value={born}
              onChange={({ target }) => setBorn(target.value)}
            />
          </div>
          <button type='submit'>update author</button>
        </form>
      </div>
      }
    </div>
  )
}

export default Authors