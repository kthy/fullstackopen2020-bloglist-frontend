import React from 'react'
const Blog = ({ blog }) => (
  <div>
    <strong>{blog.title}</strong> (<em>{blog.author}</em>)
  </div>
)

export default Blog
