import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

describe('<Blog />', () => {
  let component

  beforeEach(() => {
    const blog = {
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5
    }
    component = render(
      <Blog blog={blog} />
    )
  })

  test('renders the author by default', () => {
    expect(
      component.container.querySelector('.blogAuthor')
    ).toBeVisible()
  })

  test('renders the title by default', () => {
    expect(
      component.container.querySelector('.blogTitle')
    ).toBeVisible()
  })

  test('does not render the details by default', () => {
    expect(
      component.container.querySelector('.blogDetails')
    ).not.toBeVisible()
    expect(
      component.container.querySelector('.blogLikes')
    ).not.toBeVisible()
    expect(
      component.container.querySelector('.blogUrl')
    ).not.toBeVisible()
  })

  test('renders details after the `view` button has been clicked', () => {
    const button = component.getByText('view')
    fireEvent.click(button)

    expect(
      component.container.querySelector('.blogDetails')
    ).toBeVisible()
    expect(
      component.container.querySelector('.blogLikes')
    ).toBeVisible()
    expect(
      component.container.querySelector('.blogUrl')
    ).toBeVisible()
  })

})
