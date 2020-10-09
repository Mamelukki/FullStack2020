const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)
const bcrypt = require('bcrypt')
const User = require('../models/user')
const Blog = require('../models/blog')
mongoose.set('useFindAndModify', false)

describe('when there is initially some blogs saved', () => {
  beforeEach(async () => {
    await Blog.deleteMany({})
    let blogObjects = helper.initialBlogs.map(blog => new Blog(blog))
    const promiseArray = blogObjects.map(blog => blog.save())
    await Promise.all(promiseArray)
  })

  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('id field is defined', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body[1].id).toBeDefined()
  })
})

describe('addition of a blog', () => {
  let token = null

  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('salainen', 10)
    const user = new User({ username: 'mluukkai', passwordHash })

    await user.save()

    const loginUser = {
      username: 'mluukkai',
      password: 'salainen'
    }

    const response = await api
      .post('/api/login')
      .send(loginUser)

    token = response.body.token
  })

  test('new blog gets added to the database successfully if a valid token is given', async () => {
    const newBlog = helper.newBlog

    await api
      .post('/api/blogs')
      .set('Authorization', 'bearer ' + token)
      .send(newBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    expect (blogsAtEnd.length).toBe(helper.initialBlogs.length + 1)

    const titles = blogsAtEnd.map(b => b.title)

    expect(titles).toContain(newBlog.title)
  })

  test('new blog will not get added to the database if the token is invalid or missing', async () => {
    const blogsAtStart = await helper.blogsInDb()

    const newBlog = {
      title: 'Ei Tietokantaan lisättävä',
      author: 'Testikirjoittaja',
      url: 'testiosoite.fi',
      likes: 0
    }

    const token = ''

    await api
      .post('/api/blogs')
      .set('Authorization', 'bearer' + token)
      .send(newBlog)
      .expect(401)

    const blogsAtEnd = await helper.blogsInDb()
    expect (blogsAtEnd.length).toBe(blogsAtStart.length)

    const titles = blogsAtEnd.map(b => b.title)

    expect(titles).not.toContain(newBlog.title)
  })

  test('blog with undefined likes will get 0 likes when it is created', async () => {
    const newBlog = helper.newBlogWithNoLikes

    await api
      .post('/api/blogs')
      .set('Authorization', 'bearer ' + token)
      .send(newBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')

    const addedBlog = response.body.find(blog => blog.title === newBlog.title)

    expect(addedBlog.likes).toBe(0)
  })

  test('blog with no name or url will result in 400 bad request', async () => {
    const newBlog = helper.newBlogWithNoTitleOrUrl

    await api
      .post('/api/blogs')
      .set('Authorization', 'bearer ' + token)
      .send(newBlog)
      .expect(400)
  })
})

describe('deletion of a blog', () => {
  let token = null

  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('salainen', 10)
    const user = new User({ username: 'mluukkai', passwordHash })

    await user.save()

    const loginUser = {
      username: 'mluukkai',
      password: 'salainen'
    }

    const response = await api
      .post('/api/login')
      .send(loginUser)

    token = response.body.token
  })

  test('removes the blog from the database if the id is valid', async () => {
    const blogsAtStart = await helper.blogsInDb()

    const newBlog = {
      title: 'testiblogi',
      author: 'bloggaaja',
      url: 'www.testiblogi.fi',
      likes: 0
    }

    await api
      .post('/api/blogs')
      .set('Authorization', 'bearer ' + token)
      .send(newBlog)

    const blogsAfterAddingNewBlog = await helper.blogsInDb()
    const blogToDelete = blogsAfterAddingNewBlog[blogsAfterAddingNewBlog.length - 1]

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .set('Authorization', 'bearer ' + token)
      .expect(204)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd.length).toBe(blogsAtStart.length)

    const titles = blogsAtEnd.map(b => b.title)

    expect(titles).not.toContain(blogToDelete.title)
  })
})

describe('updating a blog', () => {
  let token = null

  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('salainen', 10)
    const user = new User({ username: 'mluukkai', passwordHash })

    await user.save()

    const loginUser = {
      username: 'mluukkai',
      password: 'salainen'
    }

    const response = await api
      .post('/api/login')
      .send(loginUser)

    token = response.body.token
  })

  test('changes the info of an existing blog correctly', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToEdit = blogsAtStart[0]

    const editedBlog = {
      ...blogToEdit, likes: 12
    }

    await api
      .put(`/api/blogs/${blogToEdit.id}`)
      .set('Authorization', 'bearer ' + token)
      .send(editedBlog)
      .expect(200)

    const blogsAtEnd = await helper.blogsInDb()
    const likes = blogsAtEnd[0].likes

    expect(likes).toEqual(12)
  })
})

describe('when there is initially one user at db', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({ username: 'root', passwordHash })

    await user.save()
  })

  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'mluukkai',
      name: 'Matti Luukkainen',
      password: 'salainen',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

    const usernames = usersAtEnd.map(u => u.username)
    expect(usernames).toContain(newUser.username)
  })

  test('creation fails with proper statuscode and message if username is missing', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = helper.newUserWithNoUsername

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('`username` is required')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })

  test('creation fails with proper statuscode and message if username is too short', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = helper.newUserWithTooShortUsername

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('is shorter than the minimum allowed length (3)')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })

  test('creation fails with proper statuscode and message if password is missing', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = helper.newUserWithNoPassword

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('password must be defined')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })

  test('creation fails with proper statuscode and message if password is too short', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = helper.newUserWithTooShortPassword

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('password must be at least 3 characters')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })

  test('creation fails with proper statuscode and message if username already taken', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'root',
      name: 'Superuser',
      password: 'salainen',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('`username` to be unique')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })
})

afterAll(() => {
  mongoose.connection.close()
})