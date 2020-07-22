import React from 'react'

const Notification = ({ message, isError }) => {
  if (!message) {
    return null
  }

  const baseStyle = {
    padding: 12,
    border: '2px solid black',
    fontSize: 16
  }

  const errorStyle = {
    ...baseStyle,
    color: 'red',
    fontWeight: 'bold'
  }

  const normalStyle = {
    ...baseStyle,
    color: 'green',
    fontStyle: 'italic'
  }

  return (
    <div style={isError ? errorStyle : normalStyle}>
      {message}
    </div>
  )
}

export default Notification
