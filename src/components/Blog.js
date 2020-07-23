import React from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog }) => (
  <span>
    [{blog.likes}] <a
      target="_blank" rel="noopener noreferrer"
      href={blog.url}><strong>{blog.title}</strong></a>&nbsp;
      (<em>{blog.author}</em>)&nbsp;
  </span>
)

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
}

export default Blog
