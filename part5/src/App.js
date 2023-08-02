import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'
import './App.css'

const App = () => {
  const blogFormRef = useRef()
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState({
    message: null,
    error: false
  })

  useEffect(() => {
    blogService
      .getAll()
      .then(blogs => {
        const sortedBlogs = blogs.sort((blogA, blogB) => blogB.likes - blogA.likes)
        setBlogs(sortedBlogs)
      })
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON){
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const login = async (username, password) => {
    try{
      const user = await loginService.login({ username, password })
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      console.log(user)
      setUser(user)
    }catch (err) {
      const message = err.response.data.error
      setNotification({ message: message, error: true })
    }
    clearNotification()
  }

  const createBlog = (title, author, url) => {
    try{
      const newBlog = {
        title,
        author,
        url
      }
      blogService
        .create(newBlog)
        .then(blog => {
          setBlogs(blogs.concat(blog))
          setNotification({ message: `a new blog ${blog.title} by ${blog.author} added`, error: false })
        })
    }catch(err){
      const message = err.response.data.error
      setNotification({ message: message, error: true })
    }
    blogFormRef.current.toggleVisibility()
    clearNotification()
  }

  const likeBlog = (id, blogUpdate) => {
    try{
      blogService
        .update(id, blogUpdate)
        .then(blog => {
          const blogsUpdate = blogs.map(b => {
            if(b.id === blog.id){
              return blog
            }
            else{
              return b
            }
          })
          const sortedBlogs = blogsUpdate.sort((blogA, blogB) => blogB.likes - blogA.likes)
          setBlogs(sortedBlogs)
        })
    }catch(err){
      const message = err.response.data.error
      setNotification({ message: message, error: true })
    }
    clearNotification()
  }

  const removeBlog = (id) => {
    try{
      blogService
        .remove(id)
        .then(() => {
          const blogsUpdate = blogs.filter(blog => blog.id !== id)
          setBlogs(blogsUpdate)
          setNotification({ message: 'the blog was successfully removed', error: false })
        })
    }catch(err){
      const message = err.response.data.error
      setNotification({ message: message, error: true })
    }
    clearNotification()
  }

  const logout = () => {
    window.localStorage.clear()
    setUser(null)
  }

  const clearNotification = () => {
    setTimeout(() => {
      setNotification({
        message: null,
        error: false
      })
    }, 3000)
  }



  if (user === null){
    return (
      <div>
        <Notification notification={notification}/>
        <LoginForm login={login} />
      </div>
    )
  }
  else{
    return(
      <div>
        <h2>blogs</h2>
        <Notification notification={notification}/>
        <p>{user.name} logged in <button onClick={logout}>logout</button></p>
        <Togglable buttonLabel={'new blog'} ref={blogFormRef}>
          <BlogForm createBlog={createBlog} />
        </Togglable>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} user={user} likeBlog={likeBlog} removeBlog={removeBlog} />
        )}
      </div>
    )
  }
}

export default App