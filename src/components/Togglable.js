import React, { useImperativeHandle, useState } from 'react'
import Button from './Button'

const Togglable = React.forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  useImperativeHandle(ref, () => {
    return {
      toggleVisibility
    }
  })

  return (
    <div>
      <div style={hideWhenVisible}>
        <Button label={props.showLabel} whenClicked={toggleVisibility} />
      </div>
      <div style={showWhenVisible} className='togglableContent'>
        {props.children}
        <Button label={props.hideLabel} whenClicked={toggleVisibility} />
      </div>
    </div>
  )
})

Togglable.displayName = 'Togglable'

export default Togglable
