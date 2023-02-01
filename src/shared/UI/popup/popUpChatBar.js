import React, {useState} from "react";
import ReactDOM from "react-dom";
import ExitFill from "../../../assets/icons/exitFill";
import ExitNoFill from "../../../assets/icons/exitNoFill";
import {useDispatch} from "react-redux";
import {Wrapper} from "../../../assets/styles/wrappers/sideBarChatModel";

const Backdrop = ({action}) => {
    const dispatch = useDispatch();
    return (
        <Wrapper>
            <div
                onClick={() => {
                    dispatch(action());
                }}
                className="backdrop"
            ></div>
        </Wrapper>
    );
};

const PopUpOverlay = ({action, children}) => {
    const [over, setOver] = useState(false);
    const dispatch = useDispatch();
    return (
        <Wrapper>
            <div className="data">
                <div className="model">
                    <h3
                        className=" exit w-full md:hidden flex justify-end "
                        onMouseOver={() => setOver(true)}
                        onMouseLeave={() => setOver(false)}
                        onClick={() => {
                            dispatch(action());
                        }}
                    >
                        {over ? (
                            <ExitFill className="icon" width={32} height={32}/>
                        ) : (
                            <ExitNoFill className="icon" width={32} height={32}/>
                        )}
                    </h3>
                    <div>{children}</div>
                </div>
            </div>
        </Wrapper>
    );
};
const portalElement = document.getElementById("overlays");
const PopUPModel = ({action, children}) => {
    return (
        <React.Fragment>
            {ReactDOM.createPortal(<Backdrop action={action}/>, portalElement)}
            {ReactDOM.createPortal(
                <PopUpOverlay action={action}>{children}</PopUpOverlay>,
                portalElement
            )}
        </React.Fragment>
    );
};

export default PopUPModel;
