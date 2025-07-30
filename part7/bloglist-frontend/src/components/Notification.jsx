import { useSelector } from "react-redux";

const Notification = ({ message, isError }) => {
  const notificationStyle = {
    color: "green",
    background: "lightgrey",
    fontSize: 20,
    borderStyle: "solid",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  };

  const errorStyle = {
    color: "red",
    background: "lightgrey",
    fontSize: 20,
    borderStyle: "solid",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  };

  const notification = useSelector(state => state.notification)

  if (!notification) {
    return null;
  }

  if (notification.isError) {
    return (
      <div className="error" style={errorStyle}>
        {notification.message}
      </div>
    );
  }

  return (
    <div className="notification" style={notificationStyle}>
      {notification.message}
    </div>
  );
};

export default Notification;
