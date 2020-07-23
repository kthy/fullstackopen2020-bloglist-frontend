import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Togglable from './Togglable'

describe('<Togglable />', () => {
  let component

  beforeEach(() => {
    component = render(
      <Togglable hideLabel='hide' showLabel='show...'>
        <div className='testDiv' />
      </Togglable>
    )
  })

  test('renders its children', () => {
    expect(
      component.container.querySelector('.testDiv')
    ).not.toBeNull()
  })

  test('its children are not visible initially', () => {
    const div = component.container.querySelector('.togglableContent')
    expect(div).not.toBeVisible()
  })

  test('its children are visible after clicking the button', () => {
    const button = component.getByText('show...')
    fireEvent.click(button)

    const div = component.container.querySelector('.togglableContent')
    expect(div).toBeVisible()
  })

})
