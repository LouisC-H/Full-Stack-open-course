import { useSelector } from "react-redux";
import { Alert } from "react-bootstrap";

const Notification = ({ message, isError }) => {
  const notification = useSelector((state) => state.notification);

  if (!notification) {
    return null;
  }

  if (notification.isError) {
    return <Alert variant="danger">{notification.message}</Alert>;
  }

  return <Alert variant="success">{notification.message}</Alert>;
};

export default Notification;
