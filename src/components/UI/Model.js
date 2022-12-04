import React, { useState } from "react";
import ReactDOM from "react-dom";
import { useNavigate } from "react-router-dom";
import ExitFill from "./../icons/exitFill";
import ExitNoFill from "./../icons/exitNoFill";
import classes from "./Model.module.css";

function Backdrop(props) {
  const nav = useNavigate();
  return (
    <div
      onClick={() => {
        nav("/", { replace: true });
      }}
      className={classes.backdrop}
    ></div>
  );
}

function ModelOverlay(props) {
  const [over, setOver] = useState(false);
  const nav = useNavigate();
  return (
    <div className={classes.model}>
      <div
        className="exit w-full flex justify-end "
        onMouseOver={() => setOver(true)}
        onMouseLeave={() => setOver(false)}
        onClick={() => {
          nav("/", { replace: true });
        }}
      >
        {over ? (
          <ExitFill className="icon display-none" width={32} height={32} />
        ) : (
          <ExitNoFill className="icon display-none" width={32} height={32} />
        )}
      </div>
      <div>{props.children}</div>
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
};

export default Model;
