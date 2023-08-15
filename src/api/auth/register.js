import React, { useEffect, useState } from "react";
import { Wrapper } from "../../assets/styles/wrappers/registerPage";
import { onRegisterShow } from "../../redux/features/toggleSlice";
import { doGetApiMethod } from "../../services/axios-service/axios-service";
import { errorHandler } from '../../services/extra-services/extra-services';
import PopUPModel from '../../shared/UI/popup/registerModel';
import SentMailResetPass from "./sentMailResetPass";
import SignIn from "./signIn";
import SignUp from "./signUp";

const Register = () => {
    const [isState, setState] = useState("signIn");
    const [layout, setLayout] = useState(<SignIn setState={setState}/>);
    useEffect(() => {
        if (isState === "signUp") {
            setLayout(<SignUp setState={setState}/>);
        }
        if (isState === "signIn") {
            setLayout(<SignIn setState={setState}/>);
        }
        if (isState === "mailPass") {
            setLayout(<SentMailResetPass setState={setState}/>);
        }
    }, [isState]);

    const loginGmailRequest = async () => {
        const url = "users/auth/google";
        try {
            const data = await doGetApiMethod(url);
        } catch (err) {
            errorHandler(err.response.data.msg);
        }
    };

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
                    {/* <div className="left w-full md:w-1/3">
                        <div className="loginButton google" onClick={loginGmailRequest}>
                            <img src={"./img/google.png"} alt="" className="icon"/>
                            Google
                        </div>
                        <div className="loginButton facebook">
                            <img src={"./img/facebook.png"} alt="" className="icon"/>
                            Facebook
                        </div>
                    </div> */}
                    {layout}
                </div>
            </Wrapper>
        </PopUPModel>
    );
};
export default Register;
