const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
  {
    title: 'First class tests',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
    likes: 10
  },
  {
    title: 'TDD harms architecture',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
    likes: 0
  },
]

const newBlog = {
  title: 'Go To Statement Considered Harmful',
  author: 'Edsger W. Dijkstra',
  url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
  likes: 5
}

const newBlogWithNoLikes = {
  title: 'Canonical string reduction',
  author: 'Edsger W. Dijkstra',
  url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html'
}

const newBlogWithNoTitleOrUrl = {
  author: 'Edsger W. Dijkstra'
}

const newUserWithNoUsername = {
  username: '',
  name: 'randomUser',
  password: 'salainen',
}

const newUserWithTooShortUsername = {
  username: 'Ra',
  name: 'randomUser',
  password: 'salainen',
}

const newUserWithNoPassword = {
  username: 'RandomUser',
  name: 'randomUser',
  password: '',
}

const newUserWithTooShortPassword = {
  username: 'RandomUser',
  name: 'randomUser',
  password: 'sa',
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(user => user.toJSON())
}

module.exports = {
  initialBlogs, newBlog, newBlogWithNoLikes, newBlogWithNoTitleOrUrl, newUserWithNoUsername, newUserWithTooShortUsername, newUserWithNoPassword, newUserWithTooShortPassword, blogsInDb, usersInDb
}