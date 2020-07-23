import React from 'react'
import PropTypes from 'prop-types'
import Togglable from './Togglable'

const Blog = ({ blog }) => (
  <>
    <span className='blogTitle'>{blog.title}</span> (<span className='blogAuthor'>{blog.author}</span>)
    <Togglable hideLabel='hide' showLabel='view'>
      <div className='blogDetails'>
        <span className='blogLikes'>Likes: {blog.likes}</span><br />
        <span className='blogUrl'>Url: <a target='_blank' rel='noopener noreferrer' href={blog.url}>{blog.url}</a></span>
      </div>
    </Togglable>
  </>
)

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
}

export default Blog
