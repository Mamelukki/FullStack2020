import React from 'react'

const UserTable = ({ users }) => {

  return(
    <table style={{ textAlign: 'left' }}>
      <tbody>
        <tr>
          <th></th>
          <th>blogs created</th>
        </tr>
        {users.map(user => 
        <tr key={user.id}>
          <td>{user.name}</td>
          <td>{user.blogs.length}</td>
        </tr>
        )}
      </tbody>
    </table>
  )
}

export default UserTable
