import React from 'react'
import Button from './Button'

const User = ({ user, logout }) => {
  return (
    <p>
      {user.name} is logged in <Button label='logout' whenClicked={logout} />
    </p>
  )
}

export default User
