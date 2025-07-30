import { useState, useEffect, useRef } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogService";
import userService from "./services/userService";
import LoginForm from "./components/LoginForm";
import Notification from "./components/Notification";
import LoggedInStatus from "./components/LoggedInStatus";
import NewBlogForm from "./components/NewBlogForm";
import Togglable from "./components/Togglable";

import { useDispatch, useSelector } from "react-redux";
import { setNotification } from "./reducers/notificationReducer";
import { initialiseBlogs, createBlog } from "./reducers/blogReducer";
import { logUserIn } from "./reducers/userReducer";

const App = () => {
  const dispatch = useDispatch()
  const blogsSelector = useSelector(state => state.blogs);
  const userSelector = useSelector(state => state.user);

  useEffect(() => {
    dispatch(initialiseBlogs())
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedInBlogsAppUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      dispatch(logUserIn(user));
    }
  }, []);

  const blogFormRef = useRef();

  if (!userSelector) {
    return (
      <div>
        <h2>Log in to application</h2>
        <Notification/>
        <LoginForm/>
      </div>
    );
  }

  return (
    <div>
      <h2>Blogs</h2>
      <Notification/>
      <LoggedInStatus/>
      <Togglable buttonLabel="create new blog" ref={blogFormRef}>
        <h3>Create new blog</h3>
        <NewBlogForm
          user={userSelector.user}
        />
      </Togglable>
      {blogsSelector.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          user={userSelector.user}
        />
      ))}
    </div>
  );
};

export default App;
