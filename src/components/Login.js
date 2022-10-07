import React, { useState } from "react";
import { Link } from "react-router-dom";
import { loginUser } from "../utils/api";

// X unauthorized users SHOULD be able to sign in.

const Login = ({ token, setToken, username, setUsername }) => {
  const [password, setPassword] = useState('');
  const [loggedin, setLoggedin] = useState(false);

  const handleChangeUser = (event) => {
    setUsername(event.target.value);
  };

  const handleChangePassword = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const login = await loginUser(username, password)
    setToken(login);
    setUsername(username);
    localStorage.setItem('token', login.token)
    localStorage.setItem('username', username)

    if (login) {
      setLoggedin(true)
    }

  };

  return (
    <>
      {loggedin ? (
        <>
          <h1 id="loggedin">Welcome Back {username}!</h1>
        </>
      ) : (
        <>
          <h1 id="login">Login</h1>
          <div id="form-container">
            <form id="login-form" onSubmit={handleSubmit}>
              <label>Username:</label>
              <input type="text" name="username" value={username}
                onChange={handleChangeUser} required/>
              <label>Password:</label>
              <input type="password" name="password" value={password}
                onChange={handleChangePassword} required/>

              <button className="login-btn" type="submit">Log in</button>

              <Link id="link-btn" to="/">
                <button id="signup-btn" type="submit">Sign up</button>
              </Link>

            </form>
          </div>
        </>
      )}
    </>
  )
}

export default Login;