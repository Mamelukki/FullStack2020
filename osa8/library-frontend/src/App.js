import React, { useState } from 'react'
import { useQuery, useApolloClient } from '@apollo/client'

import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import Recommendations from './components/Recommendations'

import { ALL_AUTHORS, ALL_BOOKS, CURRENT_USER } from './queries'
import LoginForm from './components/LoginForm'

const Notify = ({errorMessage}) => {  
  if ( !errorMessage ) {    
    return null  
  }  
  return (    
    <div style={{color: 'red'}}>      
      {errorMessage}    
    </div>  
  )
}

const App = () => {
  const authorsResult = useQuery(ALL_AUTHORS)
  const booksResult = useQuery(ALL_BOOKS)
  const userResult = useQuery(CURRENT_USER)
  const [page, setPage] = useState('authors')
  const [errorMessage, setErrorMessage] = useState(null)
  const [token, setToken] = useState(null)
  const client = useApolloClient()

  const logout = () => {    
    setToken(null)    
    localStorage.clear()    
    client.resetStore()  
  }

  if (authorsResult.loading || booksResult.loading)  {
    return <div>loading...</div>
  }

  const notify = (message) => {    
    setErrorMessage(message)    
    setTimeout(() => {      
      setErrorMessage(null)    
    }, 10000)  
  }

  if (!token) {
    return (
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('login')}>login</button>

        <Notify errorMessage={errorMessage} />

        <LoginForm
          show={page === 'login'}
          setToken={setToken}
          setError={notify}
        />

        <Authors
          show={page === 'authors'}
          authors={authorsResult.data.allAuthors}
          setError={notify}
        />

        <Books
          show={page === 'books'}
          books={booksResult.data.allBooks}
        />
      </div>
    )
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('add')}>add book</button>
        <button onClick={() => setPage('recommend')}>recommend</button>
        <button onClick={() => logout()}>logout</button>
      </div>
      
      <Notify errorMessage={errorMessage} />

      <Authors
        show={page === 'authors'}
        authors={authorsResult.data.allAuthors}
        setError={notify}
        token={token}
      />

      <Books
        show={page === 'books'}
        books={booksResult.data.allBooks}
      />

      <NewBook
        show={page === 'add'}
        setError={notify}
      />

      <Recommendations 
        show={page === 'recommend'}
        books={booksResult.data.allBooks}
        user={userResult.data.me}
      />

    </div>
  )
}

export default App