import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "../../../assets/styles/wrappers/registerPage";
import { doApiMethod } from "../../../services/axios-service/axios-service";
import { errorHandler, successHandler } from "../../../services/extra-services/extra-services";
import {
    getCities,
    getCountries,
} from "../../../services/get-locations-service/get-locations-service";
import LoadingButton from "../../../shared/components/spinner-button/spinnerButton";

const SignUp = (props) => {
    const [load, setLoad] = useState(false);
    const countryRef = useRef();
    const cityRef = useRef();
    const regEmail = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    const regPassword =
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,50}$/;
    const [countries, setAllCountry] = useState();
    const [cities, setAllCities] = useState();
    const [selectedCountry, setSelectedCountry] = useState("Israel");
    const [selectedCity, setSelectedCity] = useState("Israel");

    useEffect(() => {
        getAllCountries();
    }, [cities]);

    useEffect(() => {
        getAllCities(selectedCountry);
    }, [selectedCountry]);

    const getAllCountries = async () => {
        const countries = await getCountries();
        const countriesName = await countries?.map((country) => country.country);
        setAllCountry(countriesName);
    };
    const getAllCities = async (_country) => {
        const cities = await getCities(_country);
        await setAllCities(cities);
    };

    let {
        register,
        getValues,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSub = (_dataBody) => {
        setLoad(true);
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
            country: selectedCountry,
            city: selectedCity,
        };
        registerRequest(register);
    };
    const registerRequest = async (_dataBody) => {
        try {
            const url = "/users";
            await doApiMethod(url, "POST", _dataBody);
            props.setState("signIn");
            successHandler("Sign Up Success, please verify your email");
            setLoad(false);
        } catch (err) {
            setLoad(false);
            errorHandler(err.response.data.msg);
        }
    };
    return (
        <div className="right w-full md:w-2/3">
            <form onSubmit={handleSubmit(onSub)}>
                <div className="flex flex-wrap -mx-3 mb-2">
                    {/* first name */}
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
                    {/* email */}
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
                    {/* confirm email */}
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
                    {/* password */}
                    <div className="w-full md:w-1/2 px-3">
                        <label>Password</label>
                        <input
                            {...register("password", {
                                required: true,
                                minLength: 6,
                                maxLength: 25,
                                pattern: regPassword,
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
                    <div className="w-full md:w-1/2 px-3">
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
                <div className="flex flex-wrap mb-2 -mx-3">
                    {/* birthdate */}
                    <div className=" w-1/2 px-2">
                        <label>Birthdate</label>
                        <div className="flex relative bottom-3 items-center pl-3 pointer-events-none"></div>
                        <input
                            {...register("birthdate", { required: true })}
                            defaultValue="01/01/2000"
                            type="date"
                            className="datepicker-input"
                            placeholder="01/01/2000"
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
                <div className="filters w-full flex mr-2">
                    {/* country */}
                    <div className="w-4/5 mr-1">
                        <label>Country</label>
                        <select
                            ref={countryRef}
                            defaultValue={selectedCountry}
                            onChange={() => setSelectedCountry(countryRef.current.value)}
                            className="block py-2.5 px-2 w-full  text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer"
                        >
                            <option value="Israel" key={0} className="capitalize">
                                Israel
                            </option>
                            {countries
                                ?.filter((country) => country !== "Israel")
                                .map((country, i) => (
                                    <option value={country} key={i + 1} className="capitalize">
                                        {country}
                                    </option>
                                ))}
                        </select>
                    </div>
                    <div className="w-4/5 mr-1">
                        <label>City</label>
                        <select
                            ref={cityRef}
                            defaultValue={selectedCountry}
                            onChange={() => setSelectedCity(cityRef.current.value)}
                            className="block py-2.5 px-2 w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer"
                        >
                            {cities?.map((city, i) => (
                                <option value={city} key={i} className="capitalize">
                                    {city}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
                {/* sign up button */}
                <Button>
                    <LoadingButton isLoading={load}>Sign Up</LoadingButton>
                </Button>
            </form>
            {/* navigate to sign in */}
            <span className="flex items-center justify-center">
                Already a member ?
                <button
                    type="button"
                    onClick={() => {
                        props.setState("signIn");
                    }}
                    className="ml-2 text-blue-400 hover:text-blue-700"
                >
                    Login now
                </button>
            </span>
        </div>
    );
};

export default SignUp;
