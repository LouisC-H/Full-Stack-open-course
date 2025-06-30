import { useState } from 'react'

const NewBlogForm = ({user, createBlog, sendNotification}) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setURL] = useState('')

  const handleTitleChange = (event) => {setTitle(event.target.value)}
  const handleAuthorChange = (event) => {setAuthor(event.target.value)}
  const handleURLChange = (event) => {setURL(event.target.value)}

  const addBlog = (event) => {
    event.preventDefault()
    createBlog({
      title: title,
      author: author,
      url: url,
      user: user,
    })
    sendNotification(`New blog "${title}" added.`, false)
    setTitle('')
    setAuthor('')
    setURL('')
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