import { useState } from 'react'
import Conditional from './Conditional'
import PropTypes from 'prop-types'

const Blog = ({ blog, updateBlog, deleteBlog, user }) => {
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

  const deleteClicked = () => {
    event.preventDefault()
    deleteBlog(blog)
  }

  const sameUser = blog.user.name === user.name && blog.user.username === user.username

  const VMLabel = seeMore
    ? 'hide' : 'view'

  if (!seeMore) {
    return (
      <div style={blogStyle} data-testid='blog'>
        <div className="baseInfo">
          {blog.title} {blog.author}
          <button onClick={toggleViewMore}>{VMLabel}</button>
        </div>
      </div>
    )} else {
    return (
      <div style={blogStyle} data-testid='blog'>
        <div className="baseInfo">
          {blog.title} {blog.author}
          <button onClick={toggleViewMore}>{VMLabel}</button>
        </div>
        <div className="url">{blog.url}</div>
        <div className="likes">
          Likes: {blog.likes}
          <button onClick={addLike}>like</button>
        </div>
        <div className="username">{blog.user.name}</div>
        <Conditional boolean={sameUser}>
          <button onClick={deleteClicked}>remove</button>
        </Conditional>
      </div>
    )
  }
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  updateBlog: PropTypes.func.isRequired,
  deleteBlog: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired
}

export default Blog