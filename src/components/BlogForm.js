import React, { useState } from 'react'
import PropTypes from 'prop-types'

const BlogForm = ({ submitFunc }) => {
  const [ author, setAuthor ] = useState('')
  const [ title, setTitle ] = useState('')
  const [ url, setUrl ] = useState('')

  const onSubmit = async (event) => {
    event.preventDefault()
    const blogObj = { author, title, url }
    const blogAdded = await submitFunc(event, blogObj)
    if (blogAdded) {
      setAuthor('')
      setTitle('')
      setUrl('')
    }
  }

  return (
    <div>
      <h2>Create new entry</h2>
      <form onSubmit={onSubmit}>
        <div>
          title: <input id='blogFormTitle' autoComplete='off' value={title} onChange={(event) => setTitle(event.target.value)} />
        </div>
        <div>
          author: <input id='blogFormAuthor' autoComplete='off' value={author} onChange={(event) => setAuthor(event.target.value)} />
        </div>
        <div>
          url: <input id='blogFormUrl' autoComplete='off' value={url} onChange={(event) => setUrl(event.target.value)} />
        </div>
        <div>
          <button type='submit'>save</button>
        </div>
      </form>
    </div>
  )
}

BlogForm.propTypes = {
  submitFunc: PropTypes.func.isRequired,
}

export default BlogForm
