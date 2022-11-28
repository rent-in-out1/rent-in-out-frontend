import React, { useState , useEffect} from "react";
import {doGetApiMethod ,errorHandler} from "../../services/service";
import Model from "../../components/UI/Model";
import {Wrapper} from "../../components/style/wrappers/registerPage"
import SignUp from "./loginPage/signUp";
import SignIn from './loginPage/signIn/signIn';
import ResetPass from './loginPage/resetPass/resetPass';
import SentMailResetPass from './loginPage/sentMailResetPass/sentMailResetPass';

const Register = () => {
  const [isState, setState] = useState("signIn");
  const [layout, setLayout] = useState(<SignIn
    setState={setState}
  />);
  useEffect(()=>{
    if (isState === "signUp") {
      setLayout(<SignUp
        setState={setState}
        />)
      }
    if (isState === "signIn"){
        setLayout(<SignIn
          setState={setState}
    />)
      }
    if (isState === "passReset"){
        setLayout(<ResetPass
          setState={setState}
        />)
      }
    if (isState === "mailPass"){
        setLayout(<SentMailResetPass
          setState={setState}
        />)
      }
    },[ isState] )
    
  const loginGmailRequest = async () => {
    const url = "users/auth/google";
    try {
      const data = await doGetApiMethod(url);
      console.log(data);
    } catch (err) {
      errorHandler(err.response.data.msg);
    }
  }


  return (
    <Model>
      <h1 className="text-center text-5xl my-6 m-0">
        {isState==="signIn" ? "Sign In" 
        : isState==="signUp"? "SignUp"
        : "Pass Reset"}
      </h1>
      <Wrapper>
        <div className="inside_box">
          <div className="left w-full md:w-1/3">
            <div className="loginButton google" onClick={loginGmailRequest}>
              <img src={"./img/google.png"} alt="" className="icon" />
              Google
            </div>
            <div className="loginButton facebook">
              <img src={"./img/facebook.png"} alt="" className="icon" />
              Facebook
            </div>
          </div>
          {layout}
        </div>
      </Wrapper>
    </Model>
  )
}
export default Register
