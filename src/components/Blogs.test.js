import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blogs from './Blogs'

describe('<Blogs />', () => {

  test('if a like button is clicked twice, the event handler the component received as props is called twice', () => {
    const mockUser = 'Anonymous Coward'
    const mockDel = jest.fn()
    const mockLike = jest.fn()
    const blogs = [
      {
        id: '5f18b821a05f3a14401b4780',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        user: { username: mockUser },
        likes: 5
      }, {
        id: '5f18b821a05f3a14401b4781',
        title: 'Culinary arts and Computer Science',
        author: 'Donald E. Knuth',
        url: 'https://www-cs-faculty.stanford.edu/~knuth/papers/food-and-cs.pdf',
        user: { username: 'Captain Ahab' },
        likes: 12
      }
    ]
    const component = render(
      <Blogs blogs={blogs} currentUser={mockUser} del={mockDel} like={mockLike} />
    )

    const likeButton = component.getAllByText('+1')[0]
    fireEvent.click(likeButton)
    fireEvent.click(likeButton)

    const delButton = component.getByText('delete')
    fireEvent.click(delButton)

    expect(mockDel.mock.calls).toHaveLength(1)
  })
})
