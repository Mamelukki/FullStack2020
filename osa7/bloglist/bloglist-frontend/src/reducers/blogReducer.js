import blogService from '../services/blogs'

const byLikes = (a, b) => b.likes - a.likes

const blogReducer = (state = [], action) => {
  switch (action.type) {
    case 'ADD_BLOG':
      return [...state, action.data]
    case 'INIT_BLOGS':
      return action.data.sort(byLikes)
    case 'ADD_LIKE':
      return state.map(blog =>
        blog.id !== action.data.id ? blog : action.data
      ).sort(byLikes)
    case 'REMOVE_BLOG':
      return state.filter(b => b.id !== action.data)
    default:
      return state
  }
}

export const newBlog = (content) => {
  return async dispatch => {
      const  newBlog = await blogService.create(content)
      dispatch({
          type: 'ADD_BLOG',
          data: newBlog
      })
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
      const likedBlog = { ...blog, likes: blog.likes + 1 }
      const updatedBlog = await blogService.update(likedBlog)
      dispatch({
        type: 'ADD_LIKE',
        data: updatedBlog
      })
    }
}

export const deleteBlog = (id) => {
  return async dispatch => {
    await blogService.remove(id)
    dispatch({
      type: 'REMOVE_BLOG',
      data: id
    })
  }
}
  
export default blogReducer