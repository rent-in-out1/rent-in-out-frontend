import React, { useMemo, useState } from "react";
import ReactDOM from "react-dom";
import { useDispatch } from "react-redux";
import ExitFill from "../../../assets/icons/exitFill";
import ExitNoFill from "../../../assets/icons/exitNoFill";
import { Wrapper } from "../../../assets/styles/wrappers/popUp";

const Backdrop = ({ action }) => {
    const dispatch = useDispatch();

    // allowed scrolling once modal closed 
    const closeModal = () => {
        document.body.style.overflow = 'unset';
    };

    return (
        <Wrapper>
            <div
                onClick={() => {
                    closeModal();
                    dispatch(action());
                }}
                className="backdrop"
            ></div>
        </Wrapper>
    );
};

const PopUpOverlay = ({ action, children }) => {
    const [over, setOver] = useState(false);
    const dispatch = useDispatch();

    // disable scroll on modal load 
    useMemo(() => {
        document.body.style.overflow = 'hidden';
    }, []);

    // allowed scrolling once modal closed 
    const closeModal = () => {
        document.body.style.overflow = 'unset';
    };

    return (
        <Wrapper>
            <div className="data">
                <div className="model">
                    <div className="w-100 flex justify-end mb-3">
                        <h2
                            className="exit w-8 h-8 md:hidden cursor-pointer"
                            onMouseOver={() => setOver(true)}
                            onMouseLeave={() => setOver(false)}
                            onClick={() => {
                                closeModal();
                                dispatch(action());
                            }}>
                            {over ? (
                                <ExitFill className="icon" width={32} height={32} />
                            ) : (
                                <ExitNoFill className="icon cursor-pointer" width={32} height={32} />
                            )}
                        </h2>
                    </div>
                    <div>{children}</div>
                </div>
            </div>
        </Wrapper>
    );
};
const portalElement = document.getElementById("overlays");
const PopUPModel = ({ action, children }) => {
    return (
        <React.Fragment>
            {ReactDOM.createPortal(<Backdrop action={action} />, portalElement)}
            {ReactDOM.createPortal(
                <PopUpOverlay action={action}>{children}</PopUpOverlay>,
                portalElement
            )}
        </React.Fragment>
    );
};

export default PopUPModel;
