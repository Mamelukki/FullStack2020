import loginService from '../services/login'
import blogService from '../services/blogs'

const userReducer = (state = null, action) => {
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
    const user = await loginService.login({ username, password })
    window.localStorage.setItem(
      'loggedBlogappUser', JSON.stringify(user)
    )

    dispatch({
        type: 'SET_USER',
        data: user
    })
  }  
}

export const logout = () => {
  return async dispatch => {
    window.localStorage.removeItem('loggedBlogappUser')
    dispatch({
      type: 'LOGOUT'
    })
  }
}

export const initializeUser = () => {
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
  
  
export default userReducer