import React, { useState, useEffect } from "react";
import "../Assets/css/login.css";
import { useHistory } from "react-router-dom";
import isLogin from "../auth";
const Login = () => {
  const url = process.env.REACT_APP_URL;
  let history = useHistory();
  useEffect(() => {
    if (isLogin()) {
      history.push("/Home");
    } else {
      localStorage.clear();
    }
  }, []);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: email, password: password }),
    };
    const res = await fetch(url + "auth/login", requestOptions);
    if (res.ok) {
      const data = await res.json();
      if (data.error) {
        console.log("error");
      } else {
        localStorage.setItem("token", data.token);
        localStorage.setItem("username", data.name);
        localStorage.setItem("email", data.email);
        history.push("/Home");
      }
    }
  };
  return (
    <div className="l-form">
      <form className="form" onSubmit={handleSubmit}>
        <h1 className="form__title">LogIn</h1>
        <div className="form__div">
          <input
            value={email}
            type="text"
            className="form__input"
            placeholder=" "
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <label for="" className="form__label">
            Email
          </label>
        </div>

        <div className="form__div">
          <input
            type="password"
            value={password}
            className="form__input"
            placeholder=" "
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <label for="" className="form__label">
            Password
          </label>
        </div>

        <input type="submit" className="form__button" value="Sign In" />
        <br />
        <a href="/register">Register</a>
      </form>
    </div>
  );
};

export default Login;
