import React from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog }) => (
  <span>
    [{blog.likes}] <strong>{blog.title}</strong> (<em>{blog.author}</em>)
  </span>
)

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
}

export default Blog
