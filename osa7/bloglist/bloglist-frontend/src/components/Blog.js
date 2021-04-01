import React, { useState } from 'react'
import { addLike, deleteBlog, addComment } from '../reducers/blogReducer'
import { useDispatch } from 'react-redux'
import { useParams } from "react-router-dom"
import {
  useHistory
} from 'react-router-dom'

const Blog = ({ blogs }) => {
  const id = useParams().id
  const blog = blogs.find(blog => blog.id === id)
  const [comment, setComment] = useState('')
  const dispatch = useDispatch()
  const history = useHistory()

  const removeBlog = (id) => {
    const blogToRemove = blogs.find(n => n.id === id)
    const confirm = window.confirm(`Remove blog ${blogToRemove.title} by ${blogToRemove.author}?`)

    if (confirm) {
      dispatch(deleteBlog(id)).then(result => {
        if (result === 'removeSucceeded') {
          history.push('/blogs')
        }
      })
    }
  }

  const handleCommentChange = (event) => {
    setComment(event.target.value)
  }

  const addNewComment = (event) => {
    event.preventDefault()
    dispatch(addComment(blog, comment))
    setComment('')
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
      <h2>Comments</h2>
      <form onSubmit={addNewComment}>
      <div>
        <input
          id='comment'
          value={comment}
          onChange={handleCommentChange}
        />
        <button id='comment-button' type="submit">add comment</button>
      </div>
      </form>
      <ul>
        {blog.comments.map(comment => 
          <li key={comment.id}>{comment.comment}</li>  
        )}
      </ul>
    </div>
  )
}

export default Blog
