import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import "../Assets/css/add.css";
import isLogin from "../auth";
import AppBar from "./AppBar";
const Home = () => {
  const url = process.env.REACT_APP_URL;

  let history = useHistory();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState("");

  useEffect(() => {
    console.log(isLogin());
    if (!isLogin()) {
      localStorage.clear();
      history.push("/");
    }
  }, []);

  const handleSubmit = async () => {
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      body: JSON.stringify({
        title: title,
        description: description,
        tags: tags,
      }),
    };
    const res = await fetch(url + "note/addnote", requestOptions);
    if (res.ok) {
      const data = await res.json();
      if (data.error) {} 
      else {
        history.push("/home");
      }
    }
  };
  return (
    <>
      <AppBar></AppBar>
      <div className="page-wrapper bg-dark p-t-100 p-b-50">
        <div className="wrapper wrapper--w900">
          <div className="card card-6">
            <div className="card-heading">
              <h2 className="title">Add Note</h2>
            </div>
            <div className="card-body">
              <div className="form-row">
                <div className="name">Title</div>
                <div className="value">
                  <input
                    className="input--style-6"
                    type="text"
                    name="full_name"
                    value={title}
                    onChange={(e) => {
                      setTitle(e.target.value);
                    }}
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="name">Description</div>
                <div className="value">
                  <textarea
                    className="input--style-6"
                    name=""
                    id=""
                    value={description}
                    onChange={(e) => {
                      setDescription(e.target.value);
                    }}
                  ></textarea>
                </div>
              </div>
              <div className="form-row">
                <div className="name">Tags</div>
                <div className="value">
                  <textarea
                    className="input--style-6"
                    value={tags}
                    onChange={(e) => {
                      setTags(e.target.value);
                    }}
                  ></textarea>
                </div>
              </div>
            </div>
            <div className="card-footer">
              <button className="btn btn--radius-2 btn--blue-2"  onClick={handleSubmit}>
                Add
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
