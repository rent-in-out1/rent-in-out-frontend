import { Fragment } from 'react';
import ReactDOM  from 'react-dom';

import classes from "./Model.module.css"

function Backdrop(props) {
  return (
    <div onClick={props.cartShowHandler} className={classes.backdrop}/>
  )
}

function ModelOverlay(props) {
   
  return (
    <div className={classes.model}>
        <div className={classes.content}>{props.children}</div>
    </div>
  )
}

const portal = document.querySelector("#overlays")

function Model(props) {
  return (
    <Fragment>
        {ReactDOM.createPortal(<Backdrop cartShowHandler={props.cartShowHandler}/>, portal)}
        {ReactDOM.createPortal(<ModelOverlay>{props.children}</ModelOverlay>, portal)}
    </Fragment>
  )
};

export default Model