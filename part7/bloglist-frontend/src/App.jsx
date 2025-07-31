import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { initialiseBlogs } from "./reducers/blogReducer";
import { logUserIn } from "./reducers/userReducer";
import { Routes, Route } from 'react-router-dom'

import LoginForm from "./components/LoginForm";
import Notification from "./components/Notification";
import LoggedInStatus from "./components/LoggedInStatus";
import MainPage from "./components/MainPage";
import Users from "./components/Users";

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
      <Routes>
        <Route  path="/" element={<MainPage/>}/>
        <Route  path="/users" element={<Users/>}/>
      </Routes>
    </div>
  );
};

export default App;
