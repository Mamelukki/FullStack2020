const lodash = require('lodash');

const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((sum, blog) => sum + blog.likes, 0)
}

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) {
    return null
  }

  let favoriteBlog = blogs[0]

  for (let i = 0; i < blogs.length; i++) {
    if (blogs[i].likes > favoriteBlog.likes) {
      favoriteBlog = blogs[i]
    }
  }

  return {
    title: favoriteBlog.title,
    author: favoriteBlog.author,
    likes: favoriteBlog.likes
  }
}

const mostBlogs = (blogs) => {
  if (blogs.length === 0) {
    return null
  }

  // group the blogs array by author
  const blogsByAuthor = lodash.groupBy(blogs, 'author')

  // set the first object's values as the default values for both variables and go through
  // the rest of the array in the for loop and change the values if an author with more
  // blog posts is found
  let authorWithMostBlogs = Object.keys(blogsByAuthor)[0]
  let numberOfBlogs = Object.values(blogsByAuthor)[0].length

  for (let i = 0; i < Object.keys(blogsByAuthor).length; i++) {
    if (Object.values(blogsByAuthor)[i].length > blogsByAuthor[authorWithMostBlogs].values.length) {
      authorWithMostBlogs = Object.keys(blogsByAuthor)[i]
      numberOfBlogs = Object.values(blogsByAuthor)[i].length
    }
  }

  return {
    author: authorWithMostBlogs,
    blogs: numberOfBlogs
  }
}



module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs
}
