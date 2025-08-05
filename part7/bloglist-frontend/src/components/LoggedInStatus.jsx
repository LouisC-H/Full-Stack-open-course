import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { logUserOut } from "../reducers/userReducer";
import { Button } from "react-bootstrap";

const LoggedInStatus = () => {
  const dispatch = useDispatch();
  const userSelector = useSelector((state) => state.user);

  const handleLogout = () => {
    window.localStorage.removeItem("loggedInBlogsAppUser");
    dispatch(logUserOut());
  };

  return (
    <div style={{ marginLeft: "5px" }}>
      {userSelector.user.name} logged-in
      <Button
        style={{ marginLeft: "16px" }}
        variant="outline-light"
        size="sm"
        onClick={() => handleLogout()}
      >
        logout
      </Button>
    </div>
  );
};

export default LoggedInStatus;
