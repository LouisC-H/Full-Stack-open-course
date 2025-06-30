import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogService'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import LoggedInStatus from './components/LoggedInStatus'
import NewBlogForm from './components/NewBlogForm'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [notifMessage, setNotifMessage] = useState(null)
  const [isError, setIsError] = useState(false)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedInBlogsAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const sendNotification = (message, isError) => {
    setNotifMessage(message)
    setIsError(isError)
    setTimeout(() => {
      setNotifMessage(null)
    }, 5000)
  }

  const blogFormRef = useRef()

  const addBlog = (newBlog) => {
    blogFormRef.current.toggleVisibility()
    blogService
      .create(newBlog)
      .then(returnedBlog  => {
        setBlogs(blogs.concat(returnedBlog))
      })
  }

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <Notification message={notifMessage} isError={isError}/>
        <LoginForm setUser={setUser} sendNotification={sendNotification}/>
      </div>
    )
  }

  return (
    <div>
      <h2>Blogs</h2>
      <Notification message={notifMessage} isError={isError}/>
      <LoggedInStatus user={user} setUser={setUser}/>
      <Togglable buttonLabel="new blog" ref={blogFormRef}>
        <h3>Create new blog</h3>
        <NewBlogForm user={user} createBlog={addBlog} sendNotification={sendNotification}/>
      </Togglable>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App