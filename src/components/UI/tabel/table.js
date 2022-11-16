import React from "react";
import classes from "./Model.module.css";
import { useDispatch } from 'react-redux';
import { isLoggedIn } from "../../redux/features/userSlice";

function Backdrop(props) {
  const dispatch = useDispatch();
  return (
    <div
      onClick={() => {
        dispatch(isLoggedIn());
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
          dispatch(isLoggedIn());
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
