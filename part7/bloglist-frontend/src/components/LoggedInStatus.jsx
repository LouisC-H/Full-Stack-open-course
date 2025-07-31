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
    <div>
      <p>
        {userSelector.user.name} logged-in
      </p>
      <button onClick={() => handleLogout()}>logout</button>
    </div>
  );
};

export default LoggedInStatus;
