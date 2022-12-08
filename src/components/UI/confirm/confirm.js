import React, { useState } from "react";
import ReactDOM from "react-dom";
import { BackDropS, Modal } from "./confirmWrapper";
import { useDispatch, useSelector } from "react-redux";
import ExitFill from "./../../icons/exitFill";
import ExitNoFill from "./../../icons/exitNoFill";
import LoadingButton from "./../spinnerButton";
import { Button } from "../../style/wrappers/registerPage";
import { onMessegeToggle } from "../../../redux/features/toggleSlice";

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

const Confirm = ({ children , action }) => {
  const {message} = useSelector(state => state.toggleSlice)
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
            dispatch(onMessegeToggle({
              isShow: false,
              info :"",
              action: null,
          }));
          }}
        >
          {over ? (
            <ExitFill className="icon" width={24} height={24} />
          ) : (
            <ExitNoFill className="icon" width={24} height={24} />
          )}
        </h2>
        <div className="text-center">
          <h1>{message.info}</h1>
          <div className="flex justify-around">
            <Button
              onClick={() => {
                dispatch(action())
              }}
              className="w-2/5"
            >
              <LoadingButton>Confirm</LoadingButton>
            </Button>
            <Button
              onClick={() => {
                dispatch(onMessegeToggle({
                  isShow: false,
                  info :"",
                  action: null,
              }));
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
const ConfirmHandler = ({ children }) => {
  return (
    <React.Fragment>
      {ReactDOM.createPortal(<Backdrop />, portalElement)}
      {ReactDOM.createPortal(
        <Confirm >
          {children}
        </Confirm>,
        portalElement
      )}
    </React.Fragment>
  );
};

export default ConfirmHandler;
