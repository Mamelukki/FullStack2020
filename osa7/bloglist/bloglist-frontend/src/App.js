import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import { addNotification } from './reducers/notificationReducer'
import { initializeUser, login, logout } from './reducers/userReducer'
import { newBlog, initializeBlogs, addLike, deleteBlog } from './reducers/blogReducer'
import { useDispatch, useSelector } from 'react-redux'

const App = () => {
  const dispatch = useDispatch()
  const blogs = useSelector(state => state.blogs)
  const user = useSelector(state => state.user)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const blogFormRef = React.createRef()

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [])

  useEffect(() => {
    dispatch(initializeUser())
  }, [])

  const setNotification = (message, time) => {
    dispatch(addNotification(message, time))
  }

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
    try {
      dispatch(newBlog(blog))
      blogFormRef.current.toggleVisibility()
      setNotification(`A new blog ${blog.title} by ${blog.author} added`, 5)
    } catch(error) {
      setNotification(`An error occurred while adding a blog. The cause: ${error.message}`, 5)
    }
  }

  const addLikeToBlog = async (blog) => {
    try {
      dispatch(addLike(blog))
      setNotification(`1 like added to the blog ${blog.title} by ${blog.author}`, 5)
    } catch(error) {
      setNotification(`An error occurred while giving a like. The cause: ${error.message}`, 5)
    }
  }

  const removeBlog = async (id) => {
    const blogToRemove = blogs.find(n => n.id === id)
    const confirm = window.confirm(`Remove blog ${blogToRemove.title} by ${blogToRemove.author}?`)
    
    if (confirm) {
      try {
        dispatch(deleteBlog(id))
        setNotification(`Removed blog ${blogToRemove.title} by ${blogToRemove.author}`, 5)
      } catch(error) {
        setNotification(`An error occurred while removing a blog. The cause: ${error.message}`, 5)
      }
    }
  }

  const blogForm = () => {
    return(
      <Togglable buttonLabel='new blog' ref={blogFormRef}>
        <BlogForm createBlog={addBlog} />
      </Togglable>
    )
  }

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      dispatch(login(username, password))
      setNotification('Login successful', 5)
    } catch (exception) {
      setNotification('Wrong username or password', 5)
    }
  }

  const handleLogout = async (event) => {
    dispatch(logout())
  }

  return (
    <div>
      <Notification />
      {user === null ?
        <div>
          {loginForm()}
        </div> :
        <div>
          <h2>Blogs</h2>
          <p>{user.name} logged in <button type="submit" onClick={handleLogout}>logout</button></p>
          {blogForm()}
          {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} addLike={() => addLikeToBlog(blog)} removeBlog={() => removeBlog(blog.id)} />
          )}
        </div>
      }
    </div>
  )
}

export default App