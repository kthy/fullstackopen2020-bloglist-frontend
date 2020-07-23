import React from 'react'
import Button from './Button'

const User = ({ user, logout }) => {
  return (
    <p>
      {user.name} is logged in <Button whenClicked={logout} label='logout' />
    </p>
  )
}

export default User
