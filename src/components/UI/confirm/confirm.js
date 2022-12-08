import React, { useState } from "react";
import ReactDOM from "react-dom";
import { BackDropS, Modal } from "./confirmWrapper";
import { useDispatch } from "react-redux";
import ExitFill from "./../../icons/exitFill";
import ExitNoFill from "./../../icons/exitNoFill";
import LoadingButton from "./../spinnerButton";
import { Button } from "../../style/wrappers/registerPage";

const Backdrop = ({ action }) => {
  const dispatch = useDispatch();
  return (
    <BackDropS
      onClick={() => {
        dispatch(action());
      }}
      className="backdrop"
    ></BackDropS>
  );
};

const Confirm = ({ messege, action, children }) => {
  const [over, setOver] = useState(false);
  const dispatch = useDispatch();
  const [pressed, setIsPressed] = useState(false);
  return (
    <Modal>
      <div className="modal">
        <h2
          className=" exit w-full flex justify-end "
          onMouseOver={() => setOver(true)}
          onMouseLeave={() => setOver(false)}
          onClick={() => {
            dispatch(action());
          }}
        >
          {over ? (
            <ExitFill className="icon" width={24} height={24} />
          ) : (
            <ExitNoFill className="icon" width={24} height={24} />
          )}
        </h2>
        <div className="text-center">
          <h1>{messege}</h1>
          <div className="flex justify-around">
            <Button
              onClick={() => {
                return dispatch(action({ info: "", approve: true }));
              }}
              className="w-2/5"
            >
              <LoadingButton>Confirm</LoadingButton>
            </Button>
            <Button
              onClick={() => {
                return dispatch(action({ info: "", approve: false }));
              }}
              className="w-2/5"
            >
              <LoadingButton>Cancel</LoadingButton>
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

const portalElement = document.getElementById("overlays");
const ConfirmHandler = ({ action, children, messege }) => {
  return (
    <React.Fragment>
      {ReactDOM.createPortal(<Backdrop action={action} />, portalElement)}
      {ReactDOM.createPortal(
        <Confirm action={action} messege={messege}>
          {children}
        </Confirm>,
        portalElement
      )}
    </React.Fragment>
  );
};

export default ConfirmHandler;
