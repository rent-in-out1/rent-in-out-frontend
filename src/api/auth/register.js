import React, { useEffect, useState } from "react";
import { Wrapper } from "../../assets/styles/wrappers/registerPage";
import { onRegisterShow } from "../../redux/features/toggleSlice";
import PopUPModel from '../../shared/UI/popup/registerModel';
import SentMailResetPass from "./sentMailResetPass";
import SignIn from "./signIn";
import SignUp from "./signUp";

const Register = () => {
    const [isState, setState] = useState("signIn");
    const [layout, setLayout] = useState(<SignIn setState={setState} />);
    useEffect(() => {
        if (isState === "signUp") {
            setLayout(<SignUp setState={setState} />);
        }
        if (isState === "signIn") {
            setLayout(<SignIn setState={setState} />);
        }
        if (isState === "mailPass") {
            setLayout(<SentMailResetPass setState={setState} />);
        }
    }, [isState]);

    return (
        <PopUPModel action={onRegisterShow}>
            <h1 className="text-center text-5xl my-6 m-0">
                {isState === "signIn"
                    ? "Sign In"
                    : isState === "signUp"
                        ? "SignUp"
                        : "Pass Reset"}
            </h1>
            <Wrapper className="mb-3">
                <div className="inside_box">
                    {layout}
                </div>
            </Wrapper>
        </PopUPModel>
    );
};
export default Register;
