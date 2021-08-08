import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "./AppBar";
import Card from "./Card";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
});

const Home = () => {
  const url = process.env.REACT_APP_URL;
  const classes = useStyles();
  const [data, setData] = useState([]);
  var cards = [];
  useEffect(async () => {
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    };
    const res = await fetch(url + "note/getallnotes", requestOptions);
    if (res.ok) {
      const data = await res.json();
      if (data.error) {
      } else {
        setData(data.notes);
      }
    }
  }, []);

  const getFromTags = async (tag) => {
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    };
    const res = await fetch(
      url + "note/getnotesbytag/" + tag.toLowerCase(),
      requestOptions
    );
    if (res.ok) {
      const data = await res.json();
      if (data.error) {
      } else {
        setData(data.notes);
      }
    }
  };

  let history = useHistory();
  const handleClick = (id) => {
    history.push("/edit/" + id);
  };

  data.forEach((element) => {
    cards.push(
      <Card
        title={element.title}
        description={element.description}
        root={classes.root}
        style={{ padding: "10px", margin: "10px", width: "300px" }}
        tags={element.tags}
        handleClick={handleClick}
        id={element._id}
        getFromTags={getFromTags}
        key={element._id}
      />
    );
  });
  var tag_count = {};
  data.forEach((element) => {
    element.tags.forEach((tag) => {
      if (tag_count[tag]) {
        tag_count[tag] += 1;
      } else {
        tag_count[tag] = 1;
      }
    });
  });
  localStorage.setItem("counts", JSON.stringify(tag_count));
  return (
    <>
      <AppBar getFromTags={getFromTags} />
      <br />
      <div style={{ display: "flex" }}>{cards}</div>
    </>
  );
};

export default Home;
