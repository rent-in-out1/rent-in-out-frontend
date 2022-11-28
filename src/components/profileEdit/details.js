import React from 'react'
import { useForm } from "react-hook-form"
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { upload } from "../../redux/features/userSlice";
import { API_URL_CLIENT, doApiMethod, errorHandler } from "../../services/service";
import { toast } from "react-toastify"
import { Wrapper } from "../../components/style/wrappers/editUser";


export const Details = () => {
    const { user } = useSelector(state => state.userSlice)
    const dispatch = useDispatch();
    const { register, handleSubmit, formState: { errors } } = useForm();
    const regEmail = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;


    const onSubForm = (_dataBody) => {
        let allupload = {
            fullName: {
                firstName: _dataBody.firstName,
                lastName: _dataBody.lastName,
            },
            email: _dataBody.email,
            phone: _dataBody.phone,
            birthdate: _dataBody.birthdate,


        };
        onUpload(allupload);
        toast.success("the deatails change")

    }

    const onUpload = async (_dataBody) => {
        console.log(_dataBody)
        try {
            const url = "/users/" + user._id;
            const { data } = await doApiMethod(url, "PUT", _dataBody);
            if (data) {
                dispatch(upload(data));
                // nav("/profile")
                window.open(API_URL_CLIENT + "/profile", "_self")
                errorHandler(data.response.data.msg)

            }
        } catch (err) {
            errorHandler(err.response.data.msg)
        }
    };


    return (
        <Wrapper>

            <main >
                <h2 className=' rounded-full  h-24 w-24 overflow-hidden mx-auto'>Edit User</h2>
                <form onSubmit={handleSubmit(onSubForm)} className='col-md-6 p-3 shadow'>
                    <div className="w-full md:w-1/2 px-3 mb-2 md:mb-0">
                        <label>First Name: </label>
                        <input defaultValue={user.fullName.firstName}
                            {...register("firstName", {
                                required: true,
                                minLength: 2,
                                maxLength: 25,
                            })}
                            type="text"
                            placeholder="FIrst name"
                        />
                        {errors.firstName && errorHandler("Enter valid first name.")}
                    </div>
                    <div className="w-full md:w-1/2 px-3 mt-2">
                        <label>Last Name: </label>
                        <input defaultValue={user.fullName.lastName}
                            {...register("lastName", {
                                required: true,
                                minLength: 2,
                                maxLength: 25,
                            })}
                            type="text"
                            placeholder="Last name"
                        />
                        {errors.lastName && errorHandler("Enter valid last name.")}
                    </div>

                   
                        <div className="w-full md:w-1/2 px-2 mt-2">
                            <label>Email :</label>
                            <input defaultValue={user.email} disabled
                                {...register("email", {
                                    required: false,
                                    minLength: 2,
                                    maxLength: 25,
                                    pattern: regEmail,
                                })}
                                type="email"
                                placeholder="example@email.com"
                            />
                            {errors.email && errorHandler("Please fill valid email.")}
                        </div>
                    
                    <div className=" w-full md:w-1/2  px-2 mt-2">
                        <label>Birthdate</label>
                        <input defaultValue={user.birthdate} disabled
                            {...register("birthdate", { required: false })}
                            type="text"
                            className="datepicker-input"
                            placeholder="Select date"
                        />
                    </div>
                    <div className="w-full md:w-1/2 px-2 mt-2 md:mb-0 ">
                        <label>Phone: </label>
                        <input defaultValue={user.phone}
                            {...register("phone", {
                                required: true,
                                minLength: 6,
                                maxLength: 12,
                            })}
                            type="text"
                            placeholder="0555555555"
                        />
                        {errors.phone && errorHandler("Enter valid phone.")}
                    </div>


                    <div className='mt-3 flex px-2'>
                        <button className='mx-1'>Update</button>
                        <Link to="/profile"> <button> Back</button></Link>
                    </div>
                </form>
            </main>
        </Wrapper>
    )
}
