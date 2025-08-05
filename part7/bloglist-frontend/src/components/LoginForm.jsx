import { useState } from "react";
import loginService from "../services/loginService";
import blogService from "../services/blogService";
import { useDispatch } from "react-redux";
import { setNotification } from "../reducers/notificationReducer";
import { logUserIn } from "../reducers/userReducer";
import { Table, Form, Button } from "react-bootstrap";

const LoginForm = () => {
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({
        username,
        password,
      });
      window.localStorage.setItem("loggedInBlogsAppUser", JSON.stringify(user));
      dispatch(logUserIn(user));
      setUsername("");
      setPassword("");
    } catch (exception) {
      dispatch(setNotification("Wrong credentials", true, 5));
    }
  };

  return (
    <Form onSubmit={handleLogin}>
      <br />
      <Form.Group>
        <Form.Label>Username</Form.Label>
        <Form.Control
          type="text"
          name="username"
          placeholder="username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Password:</Form.Label>
        <Form.Control
          type="password"
          placeholder="password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </Form.Group>
      <br />
      <Button variant="primary" type="submit">
        login
      </Button>
    </Form>
  );
};

export default LoginForm;
