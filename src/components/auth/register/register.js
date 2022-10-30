import React from 'react'
import { useForm } from "react-hook-form"
import { useNavigate } from 'react-router-dom';
import { API_URL, doApiMethod } from '../../../services/service';
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
        catch(err) {
            console.log(err.response);
        }
    }
    return (
        <div>
            <h1 className='text-center text-2xl mb-3'>Register</h1>
            <form onSubmit={handleSubmit(onSub)} className="w-2/5 mx-auto">
                <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" >
                            First Name
                        </label>
                        <input {...register('firstName', { required: true, minLength: 2, maxLength: 25 })} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-first-name" type="text" placeholder="Jane" />
                        {errors.firstName && <p className="text-red-500 text-xs italic">Enter valid name.</p>}
                    </div>
                    <div className="w-full md:w-1/2 px-3">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" >
                            Last Name
                        </label>
                        <input {...register('lastName', { required: true, minLength: 2, maxLength: 25 })} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name" type="text" placeholder="Doe" />
                        {errors.lastName && <p className="text-red-500 text-xs italic">Enter valid last name.</p>}
                    </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full px-3">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                            Email
                        </label>
                        <input {...register('email', { required: true, minLength: 2, maxLength: 25, pattern: regEmail })} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" type="email" placeholder="example@email.com" />
                        {errors.email && <p className="text-red-500 text-xs italic">Please fill valid email.</p>}
                    </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full px-3">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                            Confirm Email
                        </label>
                        <input {...register('email2', { required: true, validate: (value) => { return value === getValues('email') } })} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" type="email" placeholder="example@email.com" />
                        {errors.email2 && <p className="text-red-500 text-xs italic">Email not match.</p>}
                    </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full px-3">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                            Password
                        </label>
                        <input {...register("password", { required: true, minLength: 6, maxLength: 25 })} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-password" type="password" placeholder="******************" />
                        {errors.password && <p className="text-red-500 text-xs italic">Please fill out this field.</p>}
                    </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full px-3">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                            Confirm Password
                        </label>
                        <input {...register('password2', { required: true, validate: (value) => { return value === getValues('password') } })} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-password" type="password" placeholder="******************" />
                        {errors.password2 && <p className="text-red-500 text-xs italic">Password dont match.</p>}
                    </div>
                </div>
                <Button>
                    <button>Submit</button>
                </Button>
            </form>
        </div>
    )
}

export default Register