import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { doApiMethod, successHandler } from "../../../../services/service";
import { onLogin } from "../../../../redux/features/userSlice";
import { onLogout } from "../../../../redux/features/toggleSlice";
import { errorHandler } from "./../../../../services/service";
import { Button } from "../../../../../src/components/style/wrappers/registerPage";
import LoadingButton from './../../../../components/UI/spinnerButton';

const SignIn = (props) => {
  const regEmail = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
  const [load, setLoad] = useState(false);
  let {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();
  const nav = useNavigate();

  const onSub = (_dataBody) => {
    setLoad(true)
    let login = {
      email: _dataBody.email,
      password: _dataBody.password,
    };
    loginRequest(login);
  };
  const loginRequest = async (_dataBody) => {
    try {
      const url = "/users/login";
      const { data } = await doApiMethod(url, "POST", _dataBody);
      localStorage.setItem("token", JSON.stringify(data.token));
      if (data.user) {
        dispatch(onLogin(data.user));
      }
      if (data.user.role === "admin") {
        dispatch(onLogout());
        nav("/admin");
      } else {
        dispatch(onLogout());
        nav("/");
      }
      setLoad(false)
      successHandler("Log In successfully!!!");
    } catch (err) {
      errorHandler(err.response.data.msg);
    }
  };
  return (
    <div className="right w-full md:w-2/3">
      <form onSubmit={handleSubmit(onSub)}>
        <div className="flex flex-wrap -mx-3 mb-2">
          <div className="w-full px-3">
            <label>Email</label>
            <input
              {...register("email", {
                required: true,
                minLength: 2,
                maxLength: 25,
                pattern: regEmail,
              })}
              type="email"
              placeholder="example@email.com"
            />
            {errors.email && <small>Please fill valid email.</small>}
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-2">
          <div className="w-full px-3">
            <label>Password</label>
            <input
              {...register("password", {
                required: true,
                minLength: 6,
                maxLength: 25,
              })}
              type="password"
              placeholder="******************"
            />
            {errors.password && (
              <small>
                Please fill out valid password (Upper/Lowercase , Number
                ,Special characters)
              </small>
            )}
          </div>
        </div>
        <Button >
            <LoadingButton isLoading={load}>Sign In</LoadingButton>
        </Button>
      </form>
      <span>
        Not a member yet ?
        <button
          type="button"
          onClick={() => {
            props.setState("signUp");
          }}
          className="underline text-blue-400 hover:text-blue-700"
        >
          click here
        </button>
      </span>
      <br />
      <span>
        Forgot your password ?
        <button
          type="button"
          onClick={() => {
            props.setState("mailPass");
          }}
          className="underline text-blue-400 hover:text-blue-700"
        >
          click here
        </button>
      </span>
    </div>
  );
};

export default SignIn;
