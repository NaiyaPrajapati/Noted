import React, { useState } from "react";
import "../Assets/css/login.css";
import { useHistory } from "react-router-dom";

const Register = () => {
  const url = process.env.REACT_APP_URL;
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  let history = useHistory();
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (name == "" || email == "" || password == "") {
    } else {
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name, email: email, password: password }),
      };
      const res = await fetch(url + "auth/register", requestOptions);
      if (res.ok) {
        const data = await res.json();
        if (data.error) {
        } else {
          localStorage.setItem("token", data.token);
          localStorage.setItem("username", data.name);
          localStorage.setItem("email", data.email);
          history.push("/Home");
        }
      }
    }
  };
  return (
    <div className="l-form">
      <form className="form" onSubmit={handleSubmit}>
        <h1 className="form__title">Register</h1>
        <div className="form__div">
          <input
            value={name}
            type="text"
            className="form__input"
            placeholder=" "
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
          <label for="" className="form__label">
            Name
          </label>
        </div>
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

        <input type="submit" className="form__button" value="Register" />
        <br />
        <a href="/">Login</a>
      </form>
    </div>
  );
};

export default Register;
