import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/login.css";
import { validateAccount } from "../config/users";

function Login() {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  function handleSubmit() {
    if (validateAccount(values)) {
      navigate("/dashboard");
    } else {
      setError("No account exists for that account");
    }
  }

  function handleOnChange(event) {
    setError("");
    setValues({
      ...values,
      [event.target.id]: event.target.value,
    });
  }

  return (
    <div id="login">
      <h1>Hello Again</h1>

      <div className="title-1">
        <h3>
          <i>"Let's Swap"</i>
        </h3>
      </div>
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
            onChange={handleOnChange}
          />
        </div>

        <div className="field">
          <label className="form-label" htmlFor="password">
            Password
          </label>
          <input
            className="form-input password"
            onChange={handleOnChange}
            type="password"
            id="password"
          />
        </div>

        <button className="button-1" onClick={handleSubmit}>
          Login
        </button>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </div>
    </div>
  );
}

export default Login;
