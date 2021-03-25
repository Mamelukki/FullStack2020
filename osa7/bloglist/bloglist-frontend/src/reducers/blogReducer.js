import blogService from '../services/blogs'
import { addNotification } from '../reducers/notificationReducer'
import { initializeUsers } from '../reducers/userReducer'

const byLikes = (a, b) => b.likes - a.likes

const blogReducer = (state = [], action) => {
  switch (action.type) {
    case 'ADD_BLOG':
      return [...state, action.data].sort(byLikes)
    case 'INIT_BLOGS':
      return action.data.sort(byLikes)
    case 'ADD_LIKE':
      const id = action.data.id
      const blogToChange = state.find(b => b.id === id)
      const changedBlog = {
        ...blogToChange,
        likes: blogToChange.likes + 1
      }
      return state.map(blog =>
        blog.id !== id ? blog : changedBlog
      ).sort(byLikes)
    case 'REMOVE_BLOG':
      return state.filter(b => b.id !== action.data)
    default:
      return state
  }
}

export const newBlog = (blog) => {
  return async dispatch => {
    try {
      const newBlog = await blogService.create(blog)
      dispatch({
        type: 'ADD_BLOG',
        data: newBlog
      })
      dispatch(addNotification(`A new blog ${blog.title} by ${blog.author} added`, 'success', 5))
      dispatch(initializeUsers())
    } catch (error) {
      dispatch(addNotification(`An error occurred while adding a blog. The cause: ${error.message}`, 'error', 5))
    }
  }
}

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch({
      type: 'INIT_BLOGS',
      data: blogs
    })
  }
}

export const addLike = (blog) => {
  return async dispatch => {
    try {
      const likedBlog = { ...blog, likes: blog.likes + 1 }
      const updatedBlog = await blogService.update(likedBlog)
      dispatch({
        type: 'ADD_LIKE',
        data: updatedBlog
      })
      dispatch(addNotification(`1 like added to the blog ${blog.title} by ${blog.author}`, 'success', 5))
    } catch (error) {
      dispatch(addNotification(`An error occurred while giving a like. The cause: ${error.message}`, 'error', 5))
    }
  }
}

export const deleteBlog = (id) => {
  return async dispatch => {
    try {
      const blogs = await blogService.getAll()
      const blogToRemove = blogs.find(n => n.id === id)
      await blogService.remove(id)
      dispatch({
        type: 'REMOVE_BLOG',
        data: id
      })
      dispatch(addNotification(`Removed blog ${blogToRemove.title} by ${blogToRemove.author}`, 'success', 5))
      dispatch(initializeUsers())
    } catch (error) {
      dispatch(addNotification(`An error occurred while removing a blog. The cause: ${error.message}`, 'error', 5))
    }
  }
}


export default blogReducer