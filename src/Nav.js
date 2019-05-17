import React from "react";
import { Link } from "react-router-dom";
import { css } from "glamor";

export default class Nav extends React.Component {
  render() {
    return (
      <div {...css(styles.container)}>
        <h1 {...css(styles.heading)}>Office DJ App</h1>
        <Link to="/" {...css(styles.link)}>
          Songs
        </Link>
        <Link to="/addsong" {...css(styles.link)}>
          Add Song
        </Link>
      </div>
    );
  }
}

const styles = {
  link: {
    textDecoration: "none",
    marginLeft: 15,
    color: "white",
    ":hover": {
      textDecoration: "underline"
    }
  },
  container: {
    display: "flex",
    backgroundColor: "#1CAFE9",
    padding: "0px 30px",
    alignItems: "center"
  },
  heading: {
    color: "white",
    paddingRight: 20
  }
};
