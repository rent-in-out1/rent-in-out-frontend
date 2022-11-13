import React from 'react'
import { useForm } from "react-hook-form"
import { useNavigate } from 'react-router-dom';
import { API_URL, doApiMethod } from '../../../services/service';
import { Wrapper } from '../../style/wrappers/registerPage';
import { Button } from './style';
const Register = () => {
    const nav = useNavigate();
    let { register, getValues, handleSubmit, formState: { errors } } = useForm();
    const regEmail = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    const onSub = (_dataBody) => {
        delete _dataBody.password2
        delete _dataBody.email2
        let user = {
            fullName: {
                firstName: _dataBody.firstName,
                lastName: _dataBody.lastName
            }, email: _dataBody.email, password: _dataBody.password
        }
        doApi(user)
    }
    const doApi = async (_dataBody) => {
        try {
            const url = API_URL + '/users'
            const { data } = await doApiMethod(url, "POST", _dataBody);
            console.log(data);
            if (data.user) {
                nav('/login')
            }
        }
        catch (err) {
            console.log(err.response);
        }
    }
    return (
        <Wrapper>
            <div className="inside_box">  
                <div className="left w-full md:w-1/3">
                    <div className="gmail text-red-300">Gmail</div>
                    <div className="facebook text-blue-500">Facebook</div>
                </div>
                <div className="right w-full md:w-2/3">
                    <h1 className='text-center text-2xl mb-3'>Register</h1>
                    <form onSubmit={handleSubmit(onSub)}>
                        <div className="flex flex-wrap -mx-3 mb-2">
                            <div className="w-full md:w-1/2 px-3 mb-2 md:mb-0">
                                <label className="block uppercase tracking-wide text-xs font-bold mb-2" >
                                    First Name
                                </label>
                                <input {...register('firstName', { required: true, minLength: 2, maxLength: 25 })} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-2 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-first-name" type="text" placeholder="Shimon" />
                                {errors.firstName && <p className="text-red-500 text-xs italic">Enter valid name.</p>}
                            </div>
                            <div className="w-full md:w-1/2 px-3">
                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" >
                                    Last Name
                                </label>
                                <input {...register('lastName', { required: true, minLength: 2, maxLength: 25 })} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-2 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name" type="text" placeholder="Doe" />
                                {errors.lastName && <p className="text-red-500 text-xs italic">Enter valid last name.</p>}
                            </div>
                        </div>
                        <div className="flex flex-wrap -mx-3 mb-2">
                            <div className="w-full px-3">
                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-1">
                                    Email
                                </label>
                                <input {...register('email', { required: true, minLength: 2, maxLength: 25, pattern: regEmail })} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-2 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" type="email" placeholder="example@email.com" />
                                {errors.email && <p className="text-red-500 text-xs italic">Please fill valid email.</p>}
                            </div>
                        </div>
                        <div className="flex flex-wrap -mx-3 mb-2">
                            <div className="w-full px-3">
                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                                    Confirm Email
                                </label>
                                <input {...register('email2', { required: true, validate: (value) => { return value === getValues('email') } })} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-2 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" type="email" placeholder="example@email.com" />
                                {errors.email2 && <p className="text-red-500 text-xs italic">Email not match.</p>}
                            </div>
                        </div>
                        <div className="flex flex-wrap -mx-3 mb-2">
                            <div className="w-full md:w-1/2 px-3">
                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                                    Password
                                </label>
                                <input {...register("password", { required: true, minLength: 6, maxLength: 25 })} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-2 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-password" type="password" placeholder="******************" />
                                {errors.password && <p className="text-red-500 text-xs italic">Please fill out this field.</p>}
                            </div>
                            <div className="w-full md:w-1/2 px-3 ">
                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                                    Confirm Password
                                </label>
                                <input {...register('password2', { required: true, validate: (value) => { return value === getValues('password') } })} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-2 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-password" type="password" placeholder="******************" />
                                {errors.password2 && <p className="text-red-500 text-xs italic">Password dont match.</p>}
                            </div>
                        </div>


                        <div className="relative mb-2">
                            <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                                <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd"></path></svg>
                            </div>
                            <input datepicker="" type="text" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 datepicker-input" placeholder="Select date" />
                        </div>
                        <Button>
                            <button>Submit</button>
                        </Button>
                        <span>Already a member ? </span>
                    </form>
                </div>

            </div>
        </Wrapper>
    )
}

export default Register