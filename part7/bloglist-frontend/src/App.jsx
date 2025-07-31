import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { initialiseBlogs } from "./reducers/blogReducer";
import { logUserIn } from "./reducers/userReducer";
import { Routes, Route, useMatch } from 'react-router-dom'

import LoginForm from "./components/LoginForm";
import Notification from "./components/Notification";
import MainPage from "./components/MainPage";
import Users from "./components/Users";
import UserDetails from "./components/UserDetails";
import BlogDetails from "./components/BlogDetails";
import NavigationMenu from "./components/NavigationMenu";

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
      const loggedInUser = JSON.parse(loggedUserJSON);
      dispatch(logUserIn(loggedInUser));
    }
  }, []);

  const userURLMatch = useMatch('/users/:id')
  const blogURLMatch = useMatch('/blogs/:id')

  if (!userSelector) {
    return (
      <div>
        <h2>Log in to application</h2>
        <Notification/>
        <LoginForm/>
      </div>
    );
  }

  let user = userURLMatch
    ? userSelector.userList.find(user => user.id === userURLMatch.params.id)
    : null

  let blog = blogURLMatch
    ? blogsSelector.find(blog => blog.id === blogURLMatch.params.id)
    : null

  return (
    <div>
      <NavigationMenu/>
      <h2>Blogs</h2>
      <Notification/>
      <Routes>
        <Route  path="/" element={<MainPage/>}/>
        <Route  path="/users" element={<Users/>}/>
        <Route  path="/users/:id" element={<UserDetails user={user}/>}/>
        <Route  path="/blogs/:id" element={<BlogDetails blog={blog}/>}/>
      </Routes>
    </div>
  );
};

export default App;
