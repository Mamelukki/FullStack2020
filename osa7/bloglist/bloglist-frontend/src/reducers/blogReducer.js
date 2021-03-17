import blogService from '../services/blogs'

const blogReducer = (state = [], action) => {
  switch (action.type) {
    case 'ADD_BLOG':
      return [...state, action.data]
    case 'INIT_BLOGS':
      return action.data
    default:
      return state
  }
}

export const newBlog = (content) => {
    console.log(content)
  return async dispatch => {
      const  newBlog = await blogService.create(content)
      console.log(newBlog)
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
  
export default blogReducer