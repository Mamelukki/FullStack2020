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
import { Navbar, Nav, Button } from 'react-bootstrap'
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
      <Togglable buttonLabel='New blog' ref={blogFormRef}>
        <BlogForm createBlog={addBlog} />
      </Togglable>
    )
  }

  const handleLogout = async (event) => {
    dispatch(logout())
  }

  return (
    <Router>
      <div className='container'>
        <Navbar bg="secondary" variant="dark">
          <Navbar.Brand href='/blogs'>BLOG APP</Navbar.Brand>
          <Navbar.Toggle />
          <Nav.Link style={{ color: 'white' }} href='/blogs'>Blogs</Nav.Link>
          <Nav.Link style={{ color: 'white' }} href='/users'>Users</Nav.Link>
          <Navbar.Collapse className="justify-content-end">
            <Navbar.Text>
              {currentUser ? <em style={{ alignment: 'right' }}>{currentUser.name} logged in <Button variant='light' type='submit' onClick={handleLogout}>Logout</Button></em> : <Nav.Link href='/login'>Login</Nav.Link>}
            </Navbar.Text>
          </Navbar.Collapse>
        </Navbar>
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