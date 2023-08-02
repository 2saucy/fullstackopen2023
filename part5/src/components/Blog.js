import { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, user, likeBlog, removeBlog }) => {
  const [isVisible, setIsVisible] = useState({
    btnLabel: 'view',
    visible: false
  })

  const changeVisibility = () => {
    if(isVisible.visible){
      setIsVisible({
        btnLabel: 'view',
        visible: false
      })
    }else{
      setIsVisible({
        btnLabel: 'hide',
        visible: true
      })
    }
  }
  const handleLikes = () => {
    likeBlog(blog.id, {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes + 1
    })
  }
  const handleRemove = () => {
    removeBlog(blog.id)
  }

  return(
    <div className="blog">
      <span className='blog__title-author'>{blog.title} {blog.author}</span>
      <button onClick={changeVisibility}>{isVisible.btnLabel}</button>
      {
        !isVisible.visible ? null : (
          <>
            <p className='blog__url'>{blog.url}</p>
            <span className='blog__likes'>{blog.likes}</span> <button className='like-button' onClick={handleLikes}>like</button>
            <p className='blog__username'>{user.name}</p>
            {
              user.username !== blog.user.username ? null : <button onClick={handleRemove}>remove</button>
            }
          </>
        )
      }
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  likeBlog: PropTypes.func.isRequired,
  removeBlog: PropTypes.func.isRequired
}

export default Blog