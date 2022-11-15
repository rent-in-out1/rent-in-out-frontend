import React from "react";
import classes from "./Model.module.css";
import {useNavigate} from "react-router-dom";

function Backdrop(props) {
  const nav = useNavigate();
  return (
    <div
      onClick={() => {
        nav("/");
      }}
      className={classes.backdrop}
    >
    </div>
  );
}

function ModelOverlay(props) {
  const nav = useNavigate();
  return (
    <div className={classes.model}>
      <h2
        onClick={() => {
          nav("/");
        }}
      >
        X
      </h2>
      <div className={classes.content}>{props.children}</div>
    </div>
  );
}

function Model(props) {
  return (
    <React.Fragment>
      <Backdrop registerShowHandler={props.registerShowHandler} />
      <ModelOverlay>{props.children}</ModelOverlay>
    </React.Fragment>
  );
}

export default Model;
