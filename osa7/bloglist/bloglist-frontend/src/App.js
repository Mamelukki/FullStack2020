import React, { useEffect } from 'react'
import Blog from './components/Blog'
import BlogList from './components/BlogList'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import User from './components/User'
import UserTable from './components/UserTable'
import { setUser, logout } from './reducers/loginReducer'
import { initializeUsers } from './reducers/userReducer'
import { newBlog, initializeBlogs } from './reducers/blogReducer'
import { useDispatch, useSelector } from 'react-redux'
import {
  BrowserRouter as Router,
  Switch, Route, Link
} from 'react-router-dom'

const App = () => {
  const dispatch = useDispatch()
  const blogs = useSelector(state => state.blogs)
  const notification = useSelector(state => state.notification)
  const currentUser = useSelector(state => state.currentUser)
  const users = useSelector(state => state.users)

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
      <LoginForm />
    </div>
  )

  const addBlog = async (blog) => {
    dispatch(newBlog(blog))
    blogFormRef.current.toggleVisibility()
  }

  const blogForm = () => {
    return (
      <Togglable buttonLabel='new blog' ref={blogFormRef}>
        <BlogForm createBlog={addBlog} />
      </Togglable>
    )
  }

  const handleLogout = async (event) => {
    dispatch(logout())
  }

  const padding = {
    padding: 5
  }

  const backgroundColor = {
    backgroundColor: 'lightGrey',
    padding: '8px'
  }

  return (
    <Router>
      <div>
        <h2>Blog app</h2>
        <div style={backgroundColor}>
          <Link style={padding} to="/blogs">blogs</Link>
          <Link style={padding} to="/users">users</Link>
          {currentUser ? <em>{currentUser.name} logged in <button type="submit" onClick={handleLogout}>logout</button></em> : <Link style={padding} to="/login">login</Link>}
        </div>
        <Notification notification={notification} />
        <Switch>
          <Route path="/users/:id">
            <User users={users} />
          </Route>
          <Route path="/blogs/:id">
            <Blog blogs={blogs} />
          </Route>
          <Route path="/blogs">
            <h2>Blogs</h2>
            {blogForm()}
            <BlogList blogs={blogs} />
          </Route>
          <Route path="/users">
            <UserTable users={users} />
          </Route>
          <Route path="/login">
            {loginForm()}
          </Route>
          <Route path="/">
            <h2>Blogs</h2>
            <BlogList blogs={blogs} />
          </Route>
        </Switch>
      </div>
    </Router>
  )
}

export default App