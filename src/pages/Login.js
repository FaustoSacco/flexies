import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/login.css";

function Login() {
  const navigate = useNavigate();

  function handleSubmit() {
    navigate("/dashboard");
  }

  return (
    <div id="login">
      <h1>Login</h1>
      <div id="login-form" onSubmit={() => false}>
        <div className="field">
          <label className="form-label" htmlFor="email">
            Email
          </label>
          <input
            className="form-input email"
            type="email"
            name="email"
            id="email"
          />
        </div>

        <div className="field">
          <label className="form-label" htmlFor="password">
            Password
          </label>
          <input className="form-input password" value="" type="password" />
        </div>

        <button onClick={handleSubmit}>Submit</button>
      </div>
    </div>
  );
}

export default Login;
