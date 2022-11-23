import React, { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import Select from "react-select";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { API_URL, doApiMethod, doGetApiMethod } from "../../services/service";
import { Wrapper, Button } from "../../components/style/wrappers/registerPage";
import Model from "../../components/UI/Model";
import { onLogin, onRegister } from "../../redux/features/userSlice";
import { onRegisterToggle } from "../../redux/features/toggleSlice";
import getLocations from "../../services/countries-api/getLocations";

const Register = () => {
  const [isRegister, setIsRegister] = useState(false);
  const [allCountries, setAllCountries] = useState([]);
  const [country, setCountry] = useState({});
  const [cities, setCities] = useState();
  const [city, setCity] = useState("");

  const onCountrySelect = (e) => {
    const citiesArr = e.cities.map((city) => {
      return {
        value: city,
        label: city,
      };
    });
    setCities(citiesArr);
  };

  useEffect(() => {
    const getCountry = async () => {
      const countries = await getLocations();
      const contriesArr = countries.map((country) => {
        return {
          value: country.country,
          label: country.country,
          cities: country.cities,
        };
      });
      setAllCountries(contriesArr);
    };
    getCountry();
  }, []);

  const dispatch = useDispatch();
  const nav = useNavigate();
  let {
    register,
    getValues,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const regEmail = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
  // const regPassword = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,50}$/;
  const onSub = (_dataBody) => {
    delete _dataBody.password2;
    delete _dataBody.email2;
    if (isRegister) {
      let register = {
        fullName: {
          firstName: _dataBody.firstName,
          lastName: _dataBody.lastName,
        },
        phone: _dataBody.phone,
        birthdate: _dataBody.birthdate,
        email: _dataBody.email,
        password: _dataBody.password,
        location: country + ", " + city,
      };
      registerRequest(register);

    } else {
      let login = {
        email: _dataBody.email,
        password: _dataBody.password,
      };
      loginRequest(login);
    }
  };
  const registerRequest = async (_dataBody) => {
    try {
      const url = "/users";
      const { data } = await doApiMethod(url, "POST", _dataBody);
      if (data) {
        dispatch(onRegister(data));
      }
    } catch (err) {
      console.log(err);
    }
  };
  const loginRequest = async (_dataBody) => {
    try {
      const url = "/users/login";
      const { data } = await doApiMethod(url, "POST", _dataBody);
      
      localStorage.setItem("token", JSON.stringify(data.token));
      if (data.user) {
        dispatch(onLogin(data.user, data.token));
      } else {
      }
      if (data.user.role === "admin") {
        dispatch(onRegisterToggle());
        nav("/admin");
      } else {
        dispatch(onRegisterToggle());
        nav("/");
      }
    } catch (err) {
      console.log(err);
    }
  };
  const signOut =() =>{
    localStorage.removeItem("token");
    nav("/");
  }
  const loginGmailRequest = async () => {
    const url = API_URL + "users/auth/google";
    const data = await doGetApiMethod(url);
    console.log(data);
  };
  const handleClick = () => {
    setIsRegister(!isRegister);
  };
  return (
    <Model>
      <h1 className="text-center text-5xl my-6 m-0">
        {isRegister ? "Register" : "Login"}
      </h1>
      <Wrapper>
        <div className="inside_box">
          <h2>{country.country}</h2>
          <div className="left w-full md:w-1/3">
            <div className="loginButton google" onClick={loginGmailRequest}>
              <img src={"./google.png"} alt="" className="icon" />
              Google
            </div>
            <div className="loginButton facebook">
              <img src={"./img/facebook.png"} alt="" className="icon" />
              Facebook
            </div>
          </div>
          <div className="right w-full md:w-2/3">
            <div></div>
            <form onSubmit={handleSubmit(onSub)}>
              {isRegister && (
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
                    {errors.firstName && <small>Enter valid name.</small>}
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
              )}
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
              {isRegister && (
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
              )}
              <div className="flex flex-wrap -mx-3 mb-2">
                <div
                  className={
                    isRegister ? "w-full md:w-1/2 px-3" : " w-full px-3"
                  }
                >
                  <label>Password</label>
                  <input
                    {...register("password", {
                      required: true,
                      minLength: 6,
                      maxLength: 25,
                      // pattern: regPassword
                    })}
                    type="password"
                    placeholder="******************"
                  />
                  {errors.password && (
                    <small>
                      Please fill out valid password (Upper/Lowercase , Number ,
                      Special characters).
                    </small>
                  )}
                </div>
                {isRegister && (
                  <div
                    className="w-full md:w-1/2 px-3"
                    style={{ display: isRegister ? "block" : "none" }}
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
                )}
              </div>
              {isRegister && (
                <div
                  className="flex flex-wrap mb-2 -mx-3"
                  style={{ display: isRegister ? "flex" : "none" }}
                >
                  <div className=" w-1/2 px-2">
                    <label>Birthdate</label>
                    <div className="flex relative bottom-3 items-center pl-3 pointer-events-none"></div>
                    <input
                      {...register("birthdate", { required: false })}
                      type="date"
                      className="datepicker-input"
                      placeholder="Select date"
                    />
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
                  <div className="w-full md:w-1/2 px-2 mb-2 md:mb-0 ">
                    <label>Select country</label>
                    <Select
                      className="input"
                      options={allCountries}
                      isSearchable
                      clearable
                      onChange={(e) => onCountrySelect(e)}
                    />
                  </div>
                  <div className="w-full md:w-1/2 px-2 mb-2 md:mb-0">
                    <label>Select city</label>
                    {cities?.length > 0 && (
                      <Select
                        className="input"
                        classNamePrefix="select"
                        isSearchable
                        clearable
                        options={cities}
                        onchange={(e) => setCity(e)}
                      />
                    )}
                  </div>
                </div>
              )}
              <Button>
                <button>Submit</button>
              </Button>
              <span>
                {isRegister ? "Already a member ?" : "Not a member yet ?"}{" "}
                <button
                  type="button"
                  onClick={handleClick}
                  className="underline text-blue-400 hover:text-blue-700"
                >
                  click here
                </button>{" "}
              </span>
            </form>
          </div>
        </div>
      </Wrapper>
    </Model>
  );
};

export default Register;
