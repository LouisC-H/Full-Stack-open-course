import { useState } from 'react'

const Blog = ({ blog, updateBlog }) => {
  const [seeMore, setSeeMore] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const toggleViewMore = () => {setSeeMore(!seeMore)}

  const addLike = () => {
    event.preventDefault()
    updateBlog(
      blog.id,
      {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes + 1,
      user: blog.user,
    })
  }

  const VMLabel = seeMore
  ? 'hide' : 'view'

  if (!seeMore) {
    return (
      <div style={blogStyle}>
        {blog.title} {blog.author}
        <button onClick={toggleViewMore}>{VMLabel}</button>
      </div>
    )} else {
      return (
      <div style={blogStyle}>
        <div>
          {blog.title} {blog.author}
          <button onClick={toggleViewMore}>{VMLabel}</button>
        </div>
        <div>{blog.url}</div>
        <div>
          Likes: {blog.likes}
          <button onClick={addLike}>like</button>
        </div>
        <div>{blog.user.name}</div>
      </div>
      )
    }
}

export default Blog