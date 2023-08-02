import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
//import { prettyDOM } from '@testing-library/dom'
import Blog from './Blog'

describe('<Blog />', () => {
  let component

  const likeBlog = jest.fn()
  const removeBlog = jest.fn()
  const user = { name: 'user first name' }
  const blog = {
    title: 'renders content test',
    author: '2saucy',
    url: 'url',
    likes: '0'
  }

  beforeEach(() => {
    component = render(
      <Blog blog={blog} user={user} likeBlog={likeBlog} removeBlog={removeBlog} />
    )
  })

  test('renders content', () => {
    // method 1
    expect(component.container).toHaveTextContent('renders content test')

    // method 2
    const element = component.getByText('renders content test 2saucy')
    expect(element).toBeDefined()

    // method 3
    const div = component.container.querySelector('.blog')
    expect(div).toHaveTextContent('renders content test')


    //const span = component.container.querySelector('span')
    //console.log(prettyDOM(span))

  })
  test('shows by default title and author but not the url and likes', () => {
    const div = component.container.querySelector('.blog')
    expect(div).toHaveTextContent('renders content test')
    expect(div).toHaveTextContent('2saucy')
    expect(div).not.toHaveTextContent('url')
    expect(div).not.toHaveTextContent('0')
  })
  test('the url and the likes are shown when the view button is pressed', () => {
    const viewBtn = component.container.querySelector('button')
    fireEvent.click(viewBtn)
    const div = component.container.querySelector('.blog')
    expect(div).toHaveTextContent('url')
    expect(div).toHaveTextContent('0')
  })
  test('clicking the like button two twice will call the handle twice', () => {
    const viewBtn = component.getByText('view')
    fireEvent.click(viewBtn)
    const likeBtn = component.getByText('like')
    fireEvent.click(likeBtn)
    fireEvent.click(likeBtn)
    expect(likeBlog.mock.calls).toHaveLength(2)
  })
})

