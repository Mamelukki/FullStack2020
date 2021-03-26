import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import User from './components/User'
import UserTable from './components/UserTable'
import { setUser, login, logout } from './reducers/loginReducer'
import { initializeUsers } from './reducers/userReducer'
import { newBlog, initializeBlogs, addLike, deleteBlog } from './reducers/blogReducer'
import { useDispatch, useSelector } from 'react-redux'
import {
  BrowserRouter as Router,
  Switch, Route
} from 'react-router-dom'

const App = () => {
  const dispatch = useDispatch()
  const blogs = useSelector(state => state.blogs)
  const notification = useSelector(state => state.notification)
  const currentUser = useSelector(state => state.currentUser)
  const users = useSelector(state => state.users)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const blogFormRef = React.createRef()

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  useEffect(() => {
    dispatch(setUser())
  }, [dispatch])

  useEffect(() => {
    dispatch(initializeUsers())
  }, [dispatch])

  const loginForm = () => (
    <div>
      <LoginForm
        username={username}
        password={password}
        handleUsernameChange={({ target }) => setUsername(target.value)}
        handlePasswordChange={({ target }) => setPassword(target.value)}
        handleSubmit={handleLogin}
      />
    </div>
  )

  const addBlog = async (blog) => {
    dispatch(newBlog(blog))
    blogFormRef.current.toggleVisibility()
  }

  const addLikeToBlog = async (blog) => {
    dispatch(addLike(blog))
  }

  const removeBlog = async (id) => {
    const blogToRemove = blogs.find(n => n.id === id)
    const confirm = window.confirm(`Remove blog ${blogToRemove.title} by ${blogToRemove.author}?`)

    if (confirm) {
      dispatch(deleteBlog(id))
    }
  }

  const blogForm = () => {
    return (
      <Togglable buttonLabel='new blog' ref={blogFormRef}>
        <BlogForm createBlog={addBlog} />
      </Togglable>
    )
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    dispatch(login(username, password))
    setUsername('')
    setPassword('')
  }

  const handleLogout = async (event) => {
    dispatch(logout())
    setUsername('')
    setPassword('')
  }

  const loginView = () => {
    return (
      <div>
        {currentUser === null ?
          <div>
            {loginForm()}
          </div> :
          <div>
            <p>{currentUser.name} logged in <button type="submit" onClick={handleLogout}>logout</button></p>
          </div>
        }
      </div>
    )
  }

  return (
    <Router>
      <div>
        <h2>Blogs</h2>
        <Notification notification={notification} />
        <Switch>
          <Route path="/users/:id">
            {loginView()}
            <User users={users} />
          </Route>
          <Route path="/">
            {loginView()}
            <div>
              {blogForm()}
              {blogs.map(blog =>
                <Blog key={blog.id} blog={blog} addLike={() => addLikeToBlog(blog)} removeBlog={() => removeBlog(blog.id)} />
              )}
            </div>
            <UserTable users={users} />
          </Route>
        </Switch>
      </div>
    </Router>
  )
}

export default App