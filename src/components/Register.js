import React, { useState } from "react";
import { registerUser } from "../utils/api";

// X unauthorized users SHOULD be able to sign up.

const Register = ({ token, setToken }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [registered, setRegistered] = useState(false)

  const handleChangeUser = (event) => {
    setUsername(event.target.value);
  };

  const handleChangePassword = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const registeredToken = await registerUser(username, password)
    setToken(registeredToken)
    setRegistered(true)
    console.log(username, password);
    console.log(token)
  };


  return (
    <>
      {registered ?
        <>
          <h1 id="signedup">Thanks for Signing up!</h1>
        </>
        :
        <>
          <h1 id="register">Sign up</h1>
          <div id="signup-form">
            <form id="register-form" onSubmit={handleSubmit}>
              <label>Username
                <input
                  type="text" name="username" value={username}
                  onChange={handleChangeUser} required />
              </label>
              <label>Password
                <input
                  type="password" name="password" value={password} 
                  onChange={handleChangePassword} required />
              </label>
              <button className="signup" type="submit">Sign up</button>
            </form>
          </div>
        </>
      }
    </>
  )
};

export default Register;