import React, { useState } from 'react'
import { addLike, deleteBlog, addComment } from '../reducers/blogReducer'
import { useDispatch } from 'react-redux'
import { useParams } from "react-router-dom"
import { Button, Form } from 'react-bootstrap'
import {
  useHistory, Link
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
      <Link to={blog.url}>{blog.url}</Link>
      <div>Likes {blog.likes} <Button id='like-button' onClick={() => dispatch(addLike(blog))}>Like</Button></div>
      <div>Added by {blog.user.name}</div>
      <div><Button variant='danger' id='remove-button' onClick={() => removeBlog(blog.id)}>Remove</Button></div>
      <br></br>
      <h2>Comments</h2>
      <Form onSubmit={addNewComment}>
        <Form.Control
          type='text'
          id='comment'
          value={comment}
          onChange={handleCommentChange}
        />
        <Button id='comment-button' type="submit">Add comment</Button>
      </Form>
      <br></br>
      <ul>
        {blog.comments.map(comment => 
          <li key={comment.id}>{comment.comment}</li>  
        )}
      </ul>
    </div>
  )
}

export default Blog
