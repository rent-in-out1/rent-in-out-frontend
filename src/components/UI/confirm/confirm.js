import React, { useState } from "react";
import ReactDOM from "react-dom";
import { BackDropS, Modal } from "./confirmWrapper";
import { useDispatch } from "react-redux";
import ExitFill from './../../icons/exitFill';
import ExitNoFill from './../../icons/exitNoFill';

const Backdrop = ({ showAction }) => {
  const dispatch = useDispatch();
  return (
    <BackDropS
      onClick={() => {
        dispatch(showAction());
      }}
      className="backdrop"
    ></BackDropS>
  );
};

const Confirm = ({ messege, action, showAction ,children}) => {
  const [over, setOver] = useState(false);
  const dispatch = useDispatch();
  const [pressed, setIsPressed] = useState(false);
  // useEffect(() => {
  //   if (pressed) {
  //     action();
  //     setIsShow(false);
  //   }
  //   setFirstLoad(false);
  // }, [pressed]);
  return (
    <Modal>
      <div className="modal">
      <h2
          className=" exit w-full md:hidden flex justify-end "
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
        <div>{children}confirm</div>
      </div>
    </Modal>
  );
};

const portalElement = document.getElementById("overlays");
const ConfirmHandler = ({ action, children ,  showAction , messege }) => {
  return (
    <React.Fragment>
      {ReactDOM.createPortal(
        <Backdrop showAction={showAction} />,
        portalElement
      )}
      {ReactDOM.createPortal(
        <Confirm action={action} messege={messege} showAction={showAction}>
          {children}
        </Confirm>,
        portalElement
      )}
    </React.Fragment>
  );
};

export default ConfirmHandler;
