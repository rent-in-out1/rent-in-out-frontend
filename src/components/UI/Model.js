import React from "react";
import classes from "./Model.module.css";
import  ReactDOM  from 'react-dom';
import { useNavigate } from 'react-router-dom';

function Backdrop(props) {
  const nav = useNavigate();
  return (
    <div
      onClick={() => {
        nav("/",{replace: true})
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
          nav("/",{replace: true})
        }}
      >
        X
      </h2>
      <div className={classes.content}>{props.children}</div>
    </div>
  );
}
const portalElement = document.getElementById("overlays");
const Model = (props) => {
  return (
    <React.Fragment>
      {ReactDOM.createPortal(
        <Backdrop onClose={props.onClose} />,
        portalElement
      )}
      {ReactDOM.createPortal(
        <ModelOverlay>{props.children}</ModelOverlay>,
        portalElement
      )}
    </React.Fragment>
  );
}

export default Model;
