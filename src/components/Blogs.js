import React from 'react'
import PropTypes from 'prop-types'
import Blog from './Blog'
import Button from './Button'

const Blogs = ({ blogs, del, currentUser }) => {
  const showDelButton = blog => (blog.user && blog.user.username === currentUser)

  return (
    <ul>
      {blogs.map(blog => {
        return(
          <li key={blog.id}>
            <Blog blog={blog} /> {showDelButton(blog) ? <Button whenClicked={() => del(blog)} label="delete" /> : null}
          </li>
        )
      })}
    </ul>
  )
}

Blogs.propTypes = {
  blogs: PropTypes.arrayOf(PropTypes.object).isRequired,
  del: PropTypes.func.isRequired,
  currentUser: PropTypes.string.isRequired,
}

export default Blogs
