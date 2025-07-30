import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { logUserOut } from "../reducers/userReducer";

const LoggedInStatus = () => {
  const dispatch = useDispatch()
  const userSelector = useSelector(state => state.user);

  const handleLogout = () => {
    window.localStorage.removeItem("loggedInBlogsAppUser");
    dispatch(logUserOut());
  };

  return (
    <p>
      {userSelector.user.name} logged-in
      <button onClick={() => handleLogout()}>logout</button>
    </p>
  );
};

export default LoggedInStatus;
