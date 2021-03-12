import React, { useState } from 'react'
import PropTypes from 'prop-types'

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const addBlog = (event) => {
    event.preventDefault()
    createBlog({
      title: title,
      author: author,
      url: url
    })
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  const handleTitleChange = (event) => {
    setTitle(event.target.value)
  }

  const handleAuthorChange = (event) => {
    setAuthor(event.target.value)
  }

  const handleUrlChange = (event) => {
    setUrl(event.target.value)
  }

  return (
    <div>
      <h2>Create new</h2>
      <form onSubmit={addBlog} id='blogForm'>
        <div>
          title
          <input
            id='title'
            value={title}
            onChange={handleTitleChange}
          />
        </div>
        <div>
          author
          <input
            id='author'
            value={author}
            onChange={handleAuthorChange}
          />
        </div>
        <div>
          url
          <input
            id='url'
            value={url}
            onChange={handleUrlChange}
          />
        </div>
        <button id='create-button' type="submit">create</button>
      </form>
    </div>
  )
}

BlogForm.propTypes = {
  createBlog: PropTypes.func.isRequired
}

export default BlogForm