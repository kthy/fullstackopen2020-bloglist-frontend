import React from 'react'

const BlogForm = ({ submit, titleValue, onTitleChange, authorValue, onAuthorChange, urlValue, onUrlChange }) => {
  return (
    <div>
      <h2>Create new entry</h2>
      <form onSubmit={submit}>
        <div>
          title: <input value={titleValue} onChange={onTitleChange} />
        </div>
        <div>
          author: <input value={authorValue} onChange={onAuthorChange} />
        </div>
        <div>
          url: <input value={urlValue} onChange={onUrlChange} />
        </div>
        <div>
          <button type="submit">save</button>
        </div>
      </form>
    </div>
  )
}

export default BlogForm
