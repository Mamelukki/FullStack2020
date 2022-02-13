
import React, { useState } from 'react'

const Books = ({ show, books }) => {
  const [genre, setGenre] = useState('all genres')

  if (!show) {
    return null
  }

  const genres = books.map(book => book.genres).filter(genre => genre !== '')
  const uniqueGenres = [...new Set(genres.flat(1))].concat('all genres')

  const booksToShow = () => {
    if (genre === 'all genres') {
      return books
    } 
    return books.filter(book => book.genres.includes(genre))
  }

  return (
    <div>
      <h2>books</h2>
      {genre === 'all genres' ? null : <p>in genre <b>{genre}</b></p> }
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              author
            </th>
            <th>
              published
            </th>
          </tr>
          {booksToShow().map(a =>
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          )}
        </tbody>
      </table>
      <div>
        {uniqueGenres.map(genre => 
            <span key={genre}>
              <button onClick={() => setGenre(genre)}>{genre}</button>
            </span>
          )
        }
      </div>
    </div>
  )
}

export default Books