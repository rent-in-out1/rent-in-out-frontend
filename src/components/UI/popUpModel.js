import React, { useState } from "react";
<<<<<<< HEAD
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
=======
import ReactDOM from "react-dom";
import ExitFill from "./../icons/exitFill";
import ExitNoFill from "./../icons/exitNoFill";
import classes from "./Model.module.css";
import { Wrapper } from './../style/wrappers/popUp';
import { useDispatch } from "react-redux";

const Backdrop =({action})=> {
  const dispatch = useDispatch();
  return (
    <div
      onClick={() => {
        dispatch(action());
      }}
      className={classes.backdrop}
    ></div>
  );
}

const PopUpOverlay = ({action , children})=> {
  const [over, setOver] = useState(false);
  const dispatch = useDispatch();
  return (
    <div className={classes.model}>
      <h2
        className=" exit w-full md:hidden flex justify-end "
        onMouseOver={() => setOver(true)}
        onMouseLeave={() => setOver(false)}
        onClick={() => {
          dispatch(action());
        }}
      >
        {over ? (
          <ExitFill className="icon" width={32} height={32} />
        ) : (
          <ExitNoFill className="icon" width={32} height={32} />
        )}
      </h2>
      <div>{children}</div>
    </div>
  );
}
const portalElement = document.getElementById("overlays");
const PopUPModel = ({action , children}) => {
  return (
    <Wrapper>
      {ReactDOM.createPortal(
        <Backdrop action={action} />,
        portalElement
      )}
      {ReactDOM.createPortal(
        <PopUpOverlay action={action}>{children}</PopUpOverlay>,
        portalElement
      )}
    </Wrapper>
  );
};

export default PopUPModel;
>>>>>>> rentApp
