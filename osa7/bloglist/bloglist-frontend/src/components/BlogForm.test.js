import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import BlogForm from './BlogForm'

describe('blogForm', () => {
  test('', () => {
    const createBlog = jest.fn()

    const component = render(
      <BlogForm createBlog={createBlog} />
    )

    const newBlog = {
      title: 'Testiblogi',
      author: 'Testaaja',
      url: 'testiblogi.fi',
    }

    const form = component.container.querySelector('#blogForm')
    const author = component.container.querySelector('#author')
    const title = component.container.querySelector('#title')
    const url = component.container.querySelector('#url')

    fireEvent.change(author, {
      target: { value: newBlog.author }
    })
    fireEvent.change(title, {
      target: { value: newBlog.title }
    })
    fireEvent.change(url, {
      target: { value: newBlog.url }
    })
    fireEvent.submit(form)

    expect(createBlog.mock.calls.length).toBe(1)
    expect(createBlog.mock.calls[0][0]).toEqual(newBlog)
  })
})