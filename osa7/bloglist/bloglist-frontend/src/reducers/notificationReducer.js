const initialState = {
  type: null, 
  message: null
}

const notificationReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'SET_NOTIFICATION':
        const newState = {
          type: action.messageType,
          message: action.message
        }
        return newState
      case 'REMOVE_NOTIFICATION':
        return initialState
      default:
        return state
    }
  }
    
  let timeoutId 
  
  export const addNotification = (message, messageType, time) => {
    return async dispatch => {
      dispatch({
        type: 'SET_NOTIFICATION',
        messageType,
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