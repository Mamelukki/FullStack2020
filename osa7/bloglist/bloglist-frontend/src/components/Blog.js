import React from 'react'
import { addLike, deleteBlog } from '../reducers/blogReducer'
import { useDispatch } from 'react-redux'
import { useParams } from "react-router-dom"

const Blog = ({ blogs }) => {
  const id = useParams().id
  const blog = blogs.find(blog => blog.id === id)

  const dispatch = useDispatch()

  const removeBlog = (id) => {
    const blogToRemove = blogs.find(n => n.id === id)
    const confirm = window.confirm(`Remove blog ${blogToRemove.title} by ${blogToRemove.author}?`)

    if (confirm) {
      dispatch(deleteBlog(id))
    }
  }

  if (!blog) {
    return null
  }

  return (
    <div>
      <h2>{blog.title} {blog.author}</h2>
      <a href={blog.url}>{blog.url}</a>
      <div>likes {blog.likes} <button id='like-button' onClick={() => dispatch(addLike(blog))}>like</button></div>
      <div>added by {blog.user.name}</div>
      <div><button id='remove-button' onClick={() => removeBlog(blog.id)}>remove</button></div>
    </div>
  )
}

export default Blog
