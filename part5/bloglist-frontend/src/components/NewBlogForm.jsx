import { useState, useEffect } from 'react'
import blogService from '../services/blogService'

const NewBlogForm = ({user, blogs, setBlogs, sendNotification}) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setURL] = useState('')

  const handleTitleChange = (event) => {setTitle(event.target.value)}
  const handleAuthorChange = (event) => {setAuthor(event.target.value)}
  const handleURLChange = (event) => {setURL(event.target.value)}

  const addBlog = (event) => {
    console.log('blogs : ', blogs);
    event.preventDefault()
    const newBlog = {
      title: title,
      author: author,
      url: url,
      user: user,
    }
    blogService
      .create(newBlog)
      .then(returnedBlog  => {
        sendNotification(`New blog /"${title}/" added.`, false)
        setBlogs(blogs.concat(returnedBlog))
        setTitle('')
        setAuthor('')
        setURL('')
      })
  }

  return (
  <form onSubmit={addBlog}>
    <p>
      Title: 
      <input
        value={title}
        onChange={handleTitleChange}
    />
    </p>
    <p>
      Author: 
      <input
        value={author}
        onChange={handleAuthorChange}
      />
    </p>
    <p>
      URL: 
      <input
        value={url}
        onChange={handleURLChange}
      />
    </p>
    <p>
      <button type="submit">save</button>
      </p>
  </form> 
  )
}

export default NewBlogForm