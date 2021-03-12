const notificationReducer = (state = null, action) => {
    switch (action.type) {
      case 'SET_NOTIFICATION':
        return action.message
      case 'REMOVE_NOTIFICATION':
        return null
      default:
        return state
    }
  }
    
  let timeoutId 
  
  export const addNotification = (message, time) => {
    return async dispatch => {
      dispatch({
        type: 'SET_NOTIFICATION',
        message
      })
  
      if (timeoutId) {
        clearTimeout(timeoutId)
      }
  
      timeoutId = setTimeout(() => {
        dispatch(removeNotification())
      }, time * 1000)
    }
  }
  
  export const removeNotification = () => {
    return {
      type: 'REMOVE_NOTIFICATION'
    }
  }
  
  export default notificationReducer