import React from "react";

import classes from "./Model.module.css";

function Backdrop(props) {
  return <div onClick={props.registerShowHandler} className={classes.backdrop} />;
}

function ModelOverlay(props) {
  return (
    <div className={classes.model}>
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
