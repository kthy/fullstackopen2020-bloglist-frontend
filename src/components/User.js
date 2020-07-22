import React from 'react'
import loginService from '../services/login'
import Button from './Button'

const User = ({ user }) => {
  return (
    <p>
      {user.name} is logged in <Button whenClicked={loginService.logout} label="logout" />
    </p>
  )
}

export default User
