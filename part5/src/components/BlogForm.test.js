import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import BlogForm from './BlogForm'

describe('<BlogForm />', () => {

  let component

  const createBlog = jest.fn()

  beforeEach(() => {
    component = render(
      <BlogForm createBlog={createBlog} />
    )
  })

  test('Blog form updates parent state and calls onSubmit', () => {
    const inputTitle = component.container.querySelector('#title')
    const inputAuthor = component.container.querySelector('#author')
    const inputUrl = component.container.querySelector('#url')
    const form = component.container.querySelector('form')

    fireEvent.change(inputTitle, {
      target: { value: 'testing title input' }
    })
    fireEvent.change(inputAuthor, {
      target: { value: 'testing author input' }
    })
    fireEvent.change(inputUrl, {
      target: { value: 'testing url input' }
    })
    fireEvent.submit(form)

    expect(createBlog.mock.calls).toHaveLength(1)
    expect(createBlog.mock.calls[0][0]).toBe('testing title input')
    expect(createBlog.mock.calls[0][1]).toBe('testing author input')
    expect(createBlog.mock.calls[0][2]).toBe('testing url input')
  })
})
