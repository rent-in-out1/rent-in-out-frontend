import React, { useState } from "react";
import classes from "./Model.module.css";
import  ReactDOM  from 'react-dom';
import { useNavigate } from 'react-router-dom';
import { Wrapper } from "../style/wrappers/popUp";
import ExitFill from "../icons/exitFill";
import ExitNoFill from "../icons/exitNoFill";

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

function PopUpModel(props) {
  const nav = useNavigate();
  const [over, setOver] = useState(false);
  return (
    <Wrapper>
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
      <div className={classes.content}>{props.children}</div>
    </Wrapper>
  );
}
const portalElement = document.getElementById("overlays");
const PopUp = (props) => {
  return (
    <React.Fragment>
      {ReactDOM.createPortal(
        <Backdrop onClose={props.onClose} />,
        portalElement
      )}
      {ReactDOM.createPortal(
        <PopUpModel>{props.children}</PopUpModel>,
        portalElement
      )}
    </React.Fragment>
  );
}

export default PopUp;