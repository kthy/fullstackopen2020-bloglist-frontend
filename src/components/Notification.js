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

  const infoStyle = {
    ...baseStyle,
    color: 'green',
    fontStyle: 'italic'
  }

  return (
    <div className={isError ? 'error' : 'info'} style={isError ? errorStyle : infoStyle}>
      {message}
    </div>
  )
}

export default Notification
