import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState(null)
  const [messageType, setMessageType] = useState(null)

  const blogFormRef = React.createRef()

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const setNotification = (message, type) => {
    setMessage(message)
    setMessageType(type)
    setTimeout(() => {
      setMessage(null)
      setMessageType(null)
    }, 5000)
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
      blogService.setToken(user.token)
      const newBlog = await blogService.create(blog)
      blogFormRef.current.toggleVisibility()
      setBlogs(blogs.concat(newBlog))
      setNotification(`A new blog ${blog.title} by ${blog.author} added`, 'success')
    } catch(error) {
      setNotification(`An error occurred while adding a blog. The cause: ${error.message}`, 'error')
    }
  }

  const addLike = async (id) => {
    const blogToUpdate = blogs.find(n => n.id === id)

    const editedBlog = {
      ...blogToUpdate,
      likes: blogToUpdate.likes + 1,
      user: blogToUpdate.user.id
    }

    try {
      await blogService.update(editedBlog)
      setBlogs(blogs.map(blog => blog.id !== id ? blog : { ...blogToUpdate, likes: blogToUpdate.likes + 1 }))
      setNotification(`1 like added to the blog ${blogToUpdate.title} by ${blogToUpdate.author}`, 'success')
    } catch(error) {
      setNotification(`An error occurred while giving a like. The cause: ${error.message}`, 'error')
    }
  }

  const removeBlog = async (id) => {
    const blogToRemove = blogs.find(n => n.id === id)
    const confirm = window.confirm(`Remove blog ${blogToRemove.title} by ${blogToRemove.author}?`)
    if (confirm) {
      try {
        blogService.setToken(user.token)
        await blogService.remove(id)
        setBlogs(blogs.filter(b => b.id !== id))
        setNotification(`Removed blog ${blogToRemove.title} by ${blogToRemove.author}`, 'success')
      } catch(error) {
        setNotification(`An error occurred while removing a blog. The cause: ${error.message}`, 'error')
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
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      setUsername('')
      setPassword('')
      setUser(user)
      setNotification('Login successful', 'success')
    } catch (exception) {
      setNotification('Wrong username or password', 'error')
      setUsername('')
      setPassword('')
    }
  }

  const handleLogout = async (event) => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
  }

  return (
    <div>
      <Notification message={message} type={messageType} />
      {user === null ?
        <div>
          {loginForm()}
        </div> :
        <div>
          <h2>Blogs</h2>
          <p>{user.name} logged in <button type="submit" onClick={handleLogout}>logout</button></p>
          {blogForm()}
          {blogs.sort((a, b) => b.likes - a.likes).map(blog =>
            <Blog key={blog.id} blog={blog} addLike={() => addLike(blog.id)} removeBlog={() => removeBlog(blog.id)} />
          )}
        </div>
      }
    </div>
  )
}

export default App