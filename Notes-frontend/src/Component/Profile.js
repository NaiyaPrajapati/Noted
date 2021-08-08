import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import App from "../App";
import "../Assets/css/add.css";
import isLogin from "../auth";
import AppBar from "./AppBar";

const Profile = () => {
  const url = process.env.REACT_APP_URL;

  let history = useHistory();

  useEffect(() => {
    console.log(isLogin());
    if (!isLogin()) {
      localStorage.clear();
      history.push("/");
    }
  }, []);

  return (
    <>
      <AppBar></AppBar>
      <div className="page-wrapper bg-dark p-t-100 p-b-50">
        <div className="wrapper wrapper--w900">
          <div className="card card-6">
            <div className="card-heading">
              <h2 className="title">Profile</h2>
            </div>
            <div className="card-body">
              <div className="form-row">
                <div className="name">Name</div>
                <div className="value">
                  <input
                    className="input--style-6"
                    type="text"
                    name="full_name"
                    value={localStorage.getItem("username")}
                  />
                </div>
              </div>
            </div>
            <div className="card-body">
              <div className="form-row">
                <div className="name">Email</div>
                <div className="value">
                  <input
                    className="input--style-6"
                    type="text"
                    name="full_name"
                    value={localStorage.getItem("email")}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
