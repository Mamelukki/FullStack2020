import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
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
