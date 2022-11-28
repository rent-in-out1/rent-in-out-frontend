import React  from "react";
import { useForm } from "react-hook-form";
import { Button } from "../../../../../src/components/style/wrappers/registerPage";
import { doApiMethod, errorHandler, successHandler } from "./../../../../services/service";

const SignUp = (props) => {
  const regEmail = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
  const regPassword = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,50}$/;
  let {
    register,
    getValues,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSub = (_dataBody) => {
    delete _dataBody.password2;
    delete _dataBody.email2;

    let register = {
      fullName: {
        firstName: _dataBody.firstName,
        lastName: _dataBody.lastName,
      },
      phone: _dataBody.phone,
      birthdate: _dataBody.birthdate,
      email: _dataBody.email,
      password: _dataBody.password,
    };
    registerRequest(register);
  };
  const registerRequest = async (_dataBody) => {
    try {
      const url = "/users";
      await doApiMethod(url, "POST", _dataBody);
      props.setState("signIn")
      successHandler("Sign Up Success, please verify your email")
    } catch (err) {
      errorHandler(err.response.data.msg);
    }
  };
  return (
    <div className="right w-full md:w-2/3">
      <form onSubmit={handleSubmit(onSub)}>
        <div className="flex flex-wrap -mx-3 mb-2">
          <div className="w-full md:w-1/2 px-3 mb-2 md:mb-0">
            <label>First Name</label>
            <input
              {...register("firstName", {
                required: true,
                minLength: 2,
                maxLength: 25,
              })}
              type="text"
              placeholder="FIrst name"
            />
            {errors.firstName && <small>Enter valid first name.</small>}
          </div>
          <div className="w-full md:w-1/2 px-3">
            <label>Last Name</label>
            <input
              {...register("lastName", {
                required: true,
                minLength: 2,
                maxLength: 25,
              })}
              type="text"
              placeholder="Last name"
            />
            {errors.lastName && <small>Enter valid last name.</small>}
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-2">
          <div className="w-full px-3">
            <label>Email</label>
            <input
              {...register("email", {
                required: true,
                minLength: 5,
                maxLength: 100,
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
            <label>Confirm Email</label>
            <input
              {...register("email2", {
                required: true,
                validate: (value) => {
                  return value === getValues("email");
                },
              })}
              type="email"
              placeholder="example@email.com"
            />
            {errors.email2 && <small>Email not match.</small>}
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-2">
          <div className="w-full md:w-1/2 px-3">
            <label>Password</label>
            <input
              {...register("password", {
                required: true,
                minLength: 6,
                maxLength: 25,
                pattern: regPassword
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
          <div
            className="w-full md:w-1/2 px-3"
          >
            <label>Confirm Password</label>
            <input
              {...register("password2", {
                required: true,
                validate: (value) => {
                  return value === getValues("password");
                },
              })}
              type="password"
              placeholder="******************"
            />
            {errors.password2 && <small>Password dont match.</small>}
          </div>
        </div>
        <div
          className="flex flex-wrap mb-2 -mx-3"
        >
          <div className=" w-1/2 px-2">
            <label>Birthdate</label>
            <div className="flex relative bottom-3 items-center pl-3 pointer-events-none"></div>
            <input
              {...register("birthdate", { required: true })}
              type="date"
              className="datepicker-input"
              placeholder="Select date"
            />
            {errors.birthdate && <small>Enter valid birthdate.</small>}
          </div>
          <div className="w-1/2 md:w-1/2 px-2 mb-2 md:mb-0 ">
            <label>Phone</label>
            <input
              {...register("phone", {
                required: true,
                minLength: 6,
                maxLength: 12,
              })}
              type="text"
              placeholder="0555555555"
            />
            {errors.phone && <small>Enter valid phone.</small>}
          </div>
        </div>
        <Button>
          <button>SignUp</button>
        </Button>
      </form>
      <span>
          Already a member ?
          <button
            type="button"
            onClick={()=>{props.setState("signIn")}}
            className="underline text-blue-400 hover:text-blue-700"
          >
            click here
          </button>
        </span>
    </div>
  );
};

export default SignUp;
