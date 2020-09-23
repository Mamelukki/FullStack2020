const listHelper = require('../utils/list_helper')

const emptyList = []

const listWithOneBlog = [
  {
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5
  }
]

const listWithMultipleBlogs = [
  {
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7
  },
  {
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5
  },
  {
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12
  },
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
  {
    title: 'Type wars',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    likes: 2
  }
]

const listWithBlogsWithEqualLikes = [
  {
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7
  },
  {
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 7
  },
  {
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 5
  }
]

test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})

describe('total likes', () => {
  test('of empty list is zero', () => {
    const result = listHelper.totalLikes(emptyList)
    expect(result).toBe(0)
  })

  test('when list has only one blog equals the likes of that', () => {
    const result = listHelper.totalLikes(listWithOneBlog)
    expect(result).toBe(5)
  })

  test('of a bigger list is calculated right', () => {
    const result = listHelper.totalLikes(listWithMultipleBlogs)
    expect(result).toBe(36)
  })
})

describe('favorite blog', () => {
  test('returns the blog with most likes', () => {
    const result = listHelper.favoriteBlog(listWithMultipleBlogs)

    const expectedResult = {
      'title': 'Canonical string reduction',
      'author': 'Edsger W. Dijkstra',
      'likes': 12
    }

    expect(result).toEqual(expectedResult)
  })

  test('returns null when list is empty', () => {
    const result = listHelper.favoriteBlog(emptyList)
    expect(result).toEqual(null)
  })

  test('returns the first blog with the most likes if multiple blogs have equal amout of likes', () => {
    const result = listHelper.favoriteBlog(listWithBlogsWithEqualLikes)

    const expectedResult = {
      'title': 'React patterns',
      'author': 'Michael Chan',
      'likes': 7
    }

    expect(result).toEqual(expectedResult)
  })
})

describe('most blogs', () => {
  test('returns null when list is empty', () => {
    const result = listHelper.mostBlogs(emptyList)
    expect(result).toEqual(null)
  })

  test('returns author with the most blogs and shows the number of blogs by that author', () => {
    const result = listHelper.mostBlogs(listWithMultipleBlogs)

    const expectedResult = {
      'author': 'Robert C. Martin',
      'blogs': 3
    }

    expect(result).toEqual(expectedResult)
  })
})

describe('most likes', () => {
  test('returns null when list is empty', () => {
    const result = listHelper.mostLikes(emptyList)
    expect(result).toEqual(null)
  })

  test('returns author with the most likes and shows the number of likes', () => {
    const result = listHelper.mostLikes(listWithMultipleBlogs)

    const expectedResult = {
      'author': 'Edsger W. Dijkstra',
      'likes': 17
    }

    expect(result).toEqual(expectedResult)
  })
})
