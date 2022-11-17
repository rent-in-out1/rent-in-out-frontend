import React from "react";
import classes from "./Model.module.css";
import { useDispatch } from 'react-redux';
import { isLoggedIn } from "../../redux/features/userSlice";
import  ReactDOM  from 'react-dom';

function Backdrop(props) {
  const dispatch = useDispatch();
  return (
    <div
      onClick={() => {

      }}
      className={classes.backdrop}
    >
    </div>
  );
}

function ModelOverlay(props) {
  const dispatch = useDispatch();
  return (
    <div className={classes.model}>
      <h2
        onClick={() => {
  
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
