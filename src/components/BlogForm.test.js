import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import BlogForm from './BlogForm'

describe('<BlogForm />', () => {

  test('the form calls the event handler it received as props with the right details when a new blog is called', () => {
    let author, title, url

    const testSubmit = (_, blogObj) => {
      expect(blogObj.author).toBe(author.value)
      expect(blogObj.title).toBe(title.value)
      expect(blogObj.url).toBe(url.value)
      return false
    }

    const component = render(
      <BlogForm submitFunc={testSubmit} />
    )

    const form = component.container.querySelector('form')
    author = component.container.querySelector('#blogFormAuthor')
    title = component.container.querySelector('#blogFormTitle')
    url = component.container.querySelector('#blogFormUrl')

    fireEvent.change(author, {
      target: { value: 'Edsger W. Dijkstra' }
    })
    fireEvent.change(title, {
      target: { value: 'Go To Statement Considered Harmful' }
    })
    fireEvent.change(url, {
      target: { value: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html' }
    })
    fireEvent.submit(form)
  })
})
