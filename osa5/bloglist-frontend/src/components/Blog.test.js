import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

test('renders blog title and author', () => {
  const blog = {
    title: 'Testiblogi',
    author: 'Testaaja',
    url: 'testiblogi.fi',
    likes: 1
  }

  const component = render(
    <Blog blog={blog} />
  )

  expect(component.container).toHaveTextContent(
    'Testiblogi Testaaja'
  )

  expect(component.container).not.toHaveTextContent('testiblogi.fi')
  expect(component.container).not.toHaveTextContent('likes 1')
})

test('clicking the view button shows the url and likes of a blog', async () => {
  const blog = {
    title: 'Toinen blogi',
    author: 'Bloggaaja',
    url: 'testiblogi2.fi',
    likes: 3,
    user: {
      username: 'Matti',
      name: 'Luukkainen'
    }
  }

  const component = render(
    <Blog blog={blog} />
  )

  const button = component.getByText('view')
  fireEvent.click(button)

  expect(component.container).toHaveTextContent(
    'testiblogi2.fi'
  )

  expect(component.container).toHaveTextContent(
    'likes 3'
  )
})
