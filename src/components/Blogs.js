import React from 'react'
import PropTypes from 'prop-types'
import Blog from './Blog'
import Button from './Button'

const Blogs = ({ blogs, currentUser, del, like }) => {
  const showDelButton = blog => (blog.user && blog.user.username === currentUser)

  return (
    <ul>
      {blogs.map(blog => {
        return(
          <li key={blog.id}>
            <Blog blog={blog} />
            <Button whenClicked={() => like(blog)} label="+1" />
            {showDelButton(blog) ? <Button whenClicked={() => del(blog)} label="delete" /> : null}
          </li>
        )
      })}
    </ul>
  )
}

Blogs.propTypes = {
  blogs: PropTypes.arrayOf(PropTypes.object).isRequired,
  currentUser: PropTypes.string.isRequired,
  del: PropTypes.func.isRequired,
  like: PropTypes.func.isRequired,
}

export default Blogs
