import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import "../Assets/css/add.css";
import AppBar from "./AppBar";

const Edit = (props) => {
  const url = process.env.REACT_APP_URL;

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const { id } = useParams();
  let history = useHistory();
  useEffect(async () => {
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    };
    const res = await fetch(url + "note/getnote/" + id, requestOptions);
    if (res.ok) {
      const data = await res.json();
      if (data.error) {
      } else {
        setTitle(data.notes.title);
        setDescription(data.notes.description);
      }
    }
  }, []);

  const handleSubmit = async () => {
    const requestOptions = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      body: JSON.stringify({
        title: title,
        description: description,
      }),
    };
    const res = await fetch(url + "note/editnote/" + id, requestOptions);
    if (res.ok) {
      const data = await res.json();
      if (data.error) {
      } else {
        history.push("/home");
      }
    }
  };

  const handleDelete = async () => {
    const requestOptions = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    };
    const res = await fetch(url + "note/deletenote/" + id, requestOptions);
    if (res.ok) {
      const data = await res.json();
      if (data.error) {
      } else {
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
              <h2 className="title">Edit Note</h2>
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
            </div>
            <div className="card-footer">
              <button
                className="btn btn--radius-2 btn--blue-2"
                type="submit"
                onClick={handleSubmit}
              >
                Edit
              </button>
              <button
                className="btn btn--radius-2 btn--blue-2"
                type="submit"
                onClick={handleDelete}
                style={{ marginLeft: "10px" }}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Edit;
