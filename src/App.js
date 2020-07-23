import React, { useEffect, useRef, useState } from 'react'
import Blogs from './components/Blogs'
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
      blogs.sort((a, b) => b.likes - a.likes)
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

  const delBlog = async (blog) => {
    if (window.confirm(`Delete ${blog.title} by ${blog.author}?`)) {
      try {
        await blogService.del(blog.id)
        setBlogs(blogs.filter(b => b.id !== blog.id))
        setNotification(`Deleted ${blog.title} by ${blog.author}`)
      } catch (exception) {
        setNotification(exception.response.data.error, true)
      }
    }
  }

  const likeBlog = async (blog) => {
    try {
      const updatedBlog = await blogService.update({ ...blog, likes: blog.likes + 1 })
      setBlogs(blogs.filter(b => b.id !== blog.id).concat(updatedBlog).sort((a, b) => b.likes - a.likes))
    } catch (exception) {
      setNotification(exception.response.data.error, true)
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
        <Togglable hideLabel='cancel' showLabel='add blog entry' ref={blogFormRef}>
          <BlogForm submitFunc={addBlog} />
        </Togglable>
        <Blogs blogs={blogs} currentUser={user.username} del={delBlog} like={likeBlog} />
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
