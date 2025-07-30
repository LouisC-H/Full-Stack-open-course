import { useState, useEffect, useRef } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogService";
import userService from "./services/userService";
import LoginForm from "./components/LoginForm";
import Notification from "./components/Notification";
import LoggedInStatus from "./components/LoggedInStatus";
import NewBlogForm from "./components/NewBlogForm";
import Togglable from "./components/Togglable";

import { useDispatch } from "react-redux";
import { setNotification } from "./reducers/notificationReducer";

const App = () => {
  const dispatch = useDispatch()
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);

  // Pass all methods that update the blogs list to this function
  const updateBlogs = (blogs) => {
    // Sort the blogs by likes in descending order
    blogs.sort((a, b) => b.likes - a.likes);
    setBlogs(blogs);
  };

  useEffect(() => {
    blogService.getAll().then((blogs) => updateBlogs(blogs));
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

  const addBlog = async (newBlog) => {
    blogFormRef.current.toggleVisibility();
    const createdBlog = await blogService.create(newBlog);
    const populatedBlog = await populateUser(createdBlog);
    updateBlogs(blogs.concat(populatedBlog));
  };

  const updateBlog = async (id, newBlog) => {
    // Send the updated blog to the backend via PUT request
    const returnedBlog = await blogService.update(id, newBlog);
    // Insert the fully populated user into the blog
    // This is necessary because blog object is returned with just the user ID
    const populatedBlog = await populateUser(returnedBlog);
    // Create a new list of blogs, swapping in the updated one, then save it to the page's state
    const newNewBlogsList = blogs.map((blog) =>
      blog.id === id ? populatedBlog : blog,
    );
    updateBlogs(newNewBlogsList);
  };

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

  const deleteBlog = async (blog) => {
    if (window.confirm(`Remove ${blog.title} ${blog.author} ?`)) {
      try {
        await blogService.remove(blog.id);
        // Create a new list of blogs, removing the deleted one, then save it to the page's state
        const newBlogsList = blogs.filter(
          (listItem) => listItem.id !== blog.id,
        );
        updateBlogs(newBlogsList);
        dispatch(setNotification(`Blog ${blog.title} by ${blog.author} removed`, false, 5));
      } catch (error) {
        dispatch(setNotification(`Error removing blog: ${error.response.data.error}`, true, 5));
      }
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
          createBlog={addBlog}
        />
      </Togglable>
      {blogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          updateBlog={updateBlog}
          deleteBlog={deleteBlog}
          user={user}
        />
      ))}
    </div>
  );
};

export default App;
