import loginService from '../services/login'
import blogService from '../services/blogs'
import { addNotification } from '../reducers/notificationReducer'

const loginReducer = (state = null, action) => {
  switch (action.type) {
    case 'SET_USER':
      return action.data
    case 'LOGOUT':
      return null
    default:
      return state
  }
}

export const login = (username, password) => {
  return async dispatch => {
    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)

      dispatch({
        type: 'SET_USER',
        data: user
      })
      dispatch(addNotification('Login successful', 'success', 5))
    } catch (error) {
      dispatch(addNotification('Wrong username or password', 'error', 5))
    }
  }
}

export const logout = () => {
  return async dispatch => {
    window.localStorage.removeItem('loggedBlogappUser')
    blogService.setToken(null)
    dispatch({
      type: 'LOGOUT'
    })
  }
}

export const setUser = () => {
  return async dispatch => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      blogService.setToken(user.token)

      dispatch({
        type: 'SET_USER',
        data: user
      })
    }
  }
}

export default loginReducer