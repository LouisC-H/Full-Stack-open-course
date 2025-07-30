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

const App = () => {
  const dispatch = useDispatch()
  const blogsSelector = useSelector(state => state.blogs);
  const [user, setUser] = useState(null);

  useEffect(() => {
    dispatch(initialiseBlogs())
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedInBlogsAppUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const blogFormRef = useRef();

  const populateUser = async (blog) => {
    // If the blog has a user but it's only an ID rather than a populated object, fetch the user details
    if (blog.user && !blog.user.name) {
      const returnedUser = await userService.getUser(blog.user);
      blog.user = returnedUser;
      return blog;
    } else {
      return blog;
    }
  };

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <Notification/>
        <LoginForm setUser={setUser} />
      </div>
    );
  }

  return (
    <div>
      <h2>Blogs</h2>
      <Notification/>
      <LoggedInStatus user={user} setUser={setUser} />
      <Togglable buttonLabel="create new blog" ref={blogFormRef}>
        <h3>Create new blog</h3>
        <NewBlogForm
          user={user}
        />
      </Togglable>
      {blogsSelector.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          user={user}
        />
      ))}
    </div>
  );
};

export default App;
