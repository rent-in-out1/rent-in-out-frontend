import React, { useMemo, useState } from "react";
import ReactDOM from "react-dom";
import { useDispatch } from "react-redux";
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

const PopUpOverlay = ({ action, children, className }) => {
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
                    <div className="model-header-exit">
                        <h2
                            className="exit cursor-pointer"
                            onClick={() => {
                                closeModal();
                                dispatch(action());
                            }}>
                            <ExitNoFill className="icon cursor-pointer" width={30} height={30} inLineFill="#E5E5E5" outLineFill="transparent" />
                        </h2>
                    </div>
                    <div className={`model-body ${className}`}>{children}</div>
                </div>
            </div>
        </Wrapper>
    );
};
const portalElement = document.getElementById("overlays");
const PopUpModel = ({ action, children, className }) => {
    return (
        <React.Fragment>
            {ReactDOM.createPortal(<Backdrop action={action} />, portalElement)}
            {ReactDOM.createPortal(
                <PopUpOverlay action={action} className={className}>{children}</PopUpOverlay>,
                portalElement
            )}
        </React.Fragment>
    );
};

export default PopUpModel;
