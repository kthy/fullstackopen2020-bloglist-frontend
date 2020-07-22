import React, { useEffect, useRef, useState } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import User from './components/User'
import blogService from './services/blogs'
import loginService from './services/login'

const tokenKey = 'validatedBloglistUser'

const App = () => {
  const [ blogs, setBlogs ] = useState([])
  const [ password, setPassword ] = useState('')
  const [ user, setUser ] = useState(null)
  const [ username, setUsername ] = useState('')

  const [ notificationMessage, setNotificationMessage ] = useState('')
  const [ notificationIsError, setNotificationIsError ] = useState(false)

  const blogFormRef = useRef()

  useEffect(() => {
    async function getBlogs() {
      const blogs = await blogService.getAll()
      setBlogs(blogs)
    }
    getBlogs()
  }, [])

  useEffect(() => {
    const userJSON = window.localStorage.getItem(tokenKey)
    if (userJSON) {
      const usr = JSON.parse(userJSON)
      setUser(usr)
      blogService.setToken(usr.token)
    }
  }, [])

  const setNotification = (msg, isError=false) => {
    setNotificationIsError(isError)
    setNotificationMessage(msg)
    setTimeout(() => setNotificationMessage(null), 5000)
  }

  const addBlog = async (event, blogObj) => {
    event.preventDefault()
    try {
      const blog = await blogService.create(blogObj)
      blogFormRef.current.toggleVisibility()
      setBlogs(blogs.concat(blog))
      setNotification(`Added ${blog.title} by ${blog.author}`)
      return true
    } catch (exception) {
      setNotification(exception.response.data.error, true)
      return false
    }
  }

  const login = async (event) => {
    event.preventDefault()
    try {
      const usr = await loginService.login({ username, password })
      window.localStorage.setItem(tokenKey, JSON.stringify(usr))
      blogService.setToken(usr.token)
      setUser(usr)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setNotification(exception.response.data.error, true)
    }
  }

  const logout = () => {
    window.localStorage.removeItem(tokenKey)
    blogService.clearToken()
    setUser(null)
  }

  const handlePasswordChange = (event) => setPassword(event.target.value)
  const handleUsernameChange = (event) => setUsername(event.target.value)

  const pageContent = user === null
    ? (
      <LoginForm
        login={login}
        usernameValue={username}
        onUsernameChange={handleUsernameChange}
        passwordValue={password}
        onPasswordChange={handlePasswordChange} />
    )
    : (
      <div>
        <h2>Blogs</h2>
        <User user={user} logout={logout} />
        <Togglable buttonLabel='add blog entry' ref={blogFormRef}>
          <BlogForm submitFunc={addBlog} />
        </Togglable>
        <ul>
          {blogs.map(blog => <li key={blog.id}><Blog blog={blog} /></li>)}
        </ul>
      </div>
    )

  return (
    <div>
      <Notification message={notificationMessage} isError={notificationIsError} />
      {pageContent}
    </div>
  )
}

export default App
