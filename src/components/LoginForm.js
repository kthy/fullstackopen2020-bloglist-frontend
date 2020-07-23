import React from 'react'

const LoginForm = ({ login, usernameValue, onUsernameChange, passwordValue, onPasswordChange }) => {
  return (
    <div>
      <h2>Log in to application</h2>
      <form onSubmit={login}>
        <div>
          username: <input value={usernameValue} onChange={onUsernameChange} />
        </div>
        <div>
          password: <input value={passwordValue} onChange={onPasswordChange} type='password' />
        </div>
        <div>
          <button type='submit'>login</button>
        </div>
      </form>
    </div>
  )
}

export default LoginForm
