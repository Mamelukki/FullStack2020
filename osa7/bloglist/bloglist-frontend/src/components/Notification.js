import React from 'react'

const Notification = ({ notification }) => {
  if(notification.message === null || notification.message === undefined) {
    return null
  }

  if (notification.type === 'error') {
    return (
      <div className="error">
        {notification.message}
      </div>
    )
  }

  return (
    <div className="success">
      {notification.message}
    </div>
  )
}

export default Notification