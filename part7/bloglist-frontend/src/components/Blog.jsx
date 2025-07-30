import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Conditional from "./Conditional";
import PropTypes from "prop-types";
import { likeBlog, deleteBlog } from "../reducers/blogReducer";

const Blog = ({ blog }) => {
  const dispatch = useDispatch()
  const userSelector = useSelector(state => state.user);
  const [seeMore, setSeeMore] = useState(false);

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  const toggleViewMore = () => {
    setSeeMore(!seeMore);
  };

  const addLike = () => {
    event.preventDefault();
    dispatch(likeBlog(blog))
  };

  const deleteClicked = () => {
    event.preventDefault();
    dispatch(deleteBlog(blog));
  };

  const sameUser =
    blog.user.name === userSelector.user.name && blog.user.username === userSelector.user.username;

  const VMLabel = seeMore ? "hide" : "view";

  if (!seeMore) {
    return (
      <div style={blogStyle} data-testid="blog">
        <div className="baseInfo">
          {blog.title} {blog.author}
          <button onClick={toggleViewMore}>{VMLabel}</button>
        </div>
      </div>
    );
  } else {
    return (
      <div style={blogStyle} data-testid="blog">
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
    );
  }
};

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
};

export default Blog;
