import { useState } from 'react'

const Blog = ({ blog }) => {
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
    console.log(`Adding like to blog: ${blog.id}`);
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