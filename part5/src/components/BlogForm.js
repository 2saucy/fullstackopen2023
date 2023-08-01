import { useState } from 'react'
import PropTypes from 'prop-types'

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    createBlog(title, author, url)
    setTitle('')
    setAuthor('')
    setUrl('')
  }
  const handleChangeTitle = (event) => {
    setTitle(event.target.value)
  }
  const handleChangeAuthor = (event) => {
    setAuthor(event.target.value)
  }
  const handleChangeUrl = (event) => {
    setUrl(event.target.value)
  }

  return(
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label>title:</label>
          <input type="text" onChange={handleChangeTitle} value={title} />
        </div>
        <div>
          <label>author:</label>
          <input type="text" onChange={handleChangeAuthor} value={author} />
        </div>
        <div>
          <label>url:</label>
          <input type="text" onChange={handleChangeUrl} value={url} />
        </div>
        <button>create</button>
      </form>
    </div>
  )
}

BlogForm.propTypes = {
  createBlog: PropTypes.func.isRequired
}

export default BlogForm