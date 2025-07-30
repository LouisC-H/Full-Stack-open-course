import { useState } from "react";
import loginService from "../services/loginService";
import blogService from "../services/blogService";
import PropTypes from "prop-types";

const LoginForm = ({ setUser, sendNotification }) => {
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
      setUser(user);
      blogService.setToken(user.token);
      setUsername("");
      setPassword("");
    } catch (exception) {
      sendNotification("Wrong credentials", true);
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input
          data-testid="username"
          value={username}
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          type="password"
          data-testid="password"
          value={password}
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>
  );
};

LoginForm.propTypes = {
  setUser: PropTypes.func.isRequired,
  sendNotification: PropTypes.func.isRequired,
};

export default LoginForm;
