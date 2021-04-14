import React, { useState } from 'react'
import { login } from '../reducers/loginReducer'
import { useDispatch } from 'react-redux'
import {
  useHistory
} from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'

const LoginForm = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async (event) => {
    event.preventDefault()
    setUsername('')
    setPassword('')
    dispatch(login(username, password)).then(result => {
      if (result === 'succeededLogin') {
        history.push('/blogs')
      }
    })
  }

  return (
    <div>
      <h2>Login</h2>

      <Form onSubmit={handleLogin}>
        <Form.Group>
          <Form.Label>Username</Form.Label>
          <Form.Control
            type='text'
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
          <Form.Label>Username</Form.Label>
          <Form.Control
            type='password'
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
          <Button id='login-button' type="submit">Login</Button>
        </Form.Group>
      </Form>
    </div>
  )
}

export default LoginForm