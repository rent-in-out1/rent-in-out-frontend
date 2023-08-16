import React, { useState } from "react";
import ReactDOM from "react-dom";
import { useDispatch, useSelector } from "react-redux";
import ExitFill from "../../../assets/icons/exitFill";
import ExitNoFill from "../../../assets/icons/exitNoFill";
import { Button } from "../../../assets/styles/wrappers/registerPage";
import { onMessegeToggle } from "../../../redux/features/toggleSlice";
import LoadingButton from "../../components/spinner-button/spinnerButton";
import { BackDropS, Modal } from "./confirmWrapper";

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

const Confirm = ({ action }) => {
    const { message } = useSelector(state => state.toggleSlice);
    const [over, setOver] = useState(false);
    const dispatch = useDispatch();
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
                            info: "",
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
                                dispatch(action());
                            }}
                            className="w-2/5"
                        >
                            <LoadingButton>Confirm</LoadingButton>
                        </Button>
                        <Button
                            onClick={() => {
                                dispatch(onMessegeToggle({
                                    isShow: false,
                                    info: "",
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
                <Confirm>
                    {children}
                </Confirm>,
                portalElement
            )}
        </React.Fragment>
    );
};

export default ConfirmHandler;
