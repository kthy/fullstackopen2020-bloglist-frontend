import React from 'react'
import PropTypes from 'prop-types'
import Blog from './Blog'
import Button from './Button'

const Blogs = ({ blogs, currentUser, del, like }) => {
  const blogStyle = {
    paddingTop: 8,
    paddingRight: 4,
    paddingBottom: 4,
    paddingLeft: 8,
    border: 'solid',
    borderWidth: 1,
    marginTop: 4,
    marginBottom: 8
  }

  const showDelButton = blog => (blog.user && blog.user.username === currentUser)

  return (
    <>
      {blogs.map(blog => {
        return(
          <div key={blog.id} style={blogStyle}>
            <Blog blog={blog} />
            <Button label='+1' whenClicked={() => like(blog)} />
            {showDelButton(blog) ? <Button label='delete' whenClicked={() => del(blog)} /> : null}
          </div>
        )
      })}
    </>
  )
}

Blogs.propTypes = {
  blogs: PropTypes.arrayOf(PropTypes.object).isRequired,
  currentUser: PropTypes.string.isRequired,
  del: PropTypes.func.isRequired,
  like: PropTypes.func.isRequired,
}

export default Blogs
