import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { likeBlog, deleteBlog } from "../reducers/blogReducer";
import userService from "../services/userService";
import Conditional from "./Conditional";

const BlogDetails = ({blog}) => {
  const dispatch = useDispatch()
  const userSelector = useSelector(state => state.user);

  const addLike = () => {
    event.preventDefault();
    dispatch(likeBlog(blog))
  };

  const deleteBlog = () => {
    event.preventDefault();
    dispatch(deleteBlog(blog));
  };

  const sameUser =
    blog.user.name === userSelector.user.name && blog.user.username === userSelector.user.username;

  return (
    <div data-testid="blog">
      <div className="baseInfo">
        <h2> {blog.title} by {blog.author}</h2>
      </div>
      <div className="url"><a href={`${blog.url}`}>{blog.url}</a></div>
      <div className="likes">
        Likes: {blog.likes}
        <button onClick={addLike}>like</button>
      </div>
      <div className="username">Added by {blog.user.name}</div>
      <Conditional boolean={sameUser}>
        <button onClick={deleteBlog}>remove</button>
      </Conditional>
    </div>
  )
}

export default BlogDetails;