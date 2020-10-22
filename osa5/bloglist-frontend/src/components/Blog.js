import React, { useState } from 'react'

const Blog = ({ blog, addLike, removeBlog }) => {
  const [showDetails, setShowDetails] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  if (!showDetails) {
    return(
      <div style={blogStyle} className='blogWithoutDetails'>
        {blog.title} {blog.author} <button onClick={() => setShowDetails(true)}>view</button>
      </div>
    )
  }

  return(
    <div style={blogStyle} className='blogWithDetails'>
      <div>{blog.title} {blog.author} <button onClick={() => setShowDetails(false)}>hide</button></div>
      <div>{blog.url}</div>
      <div>likes {blog.likes} <button onClick={() => addLike(blog.id)}>like</button></div>
      <div>{blog.user.name}</div>
      <div><button onClick={() => removeBlog(blog.id)}>remove</button></div>
    </div>
  )
}

export default Blog
