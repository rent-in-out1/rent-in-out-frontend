import React from 'react'
import { useForm } from "react-hook-form"
import { useSelector, useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { upload } from "../../redux/features/userSlice";
import { doApiMethod, errorHandler, doGetApiMethod } from "../../services/service";
import { toast } from "react-toastify"
import { Wrapper } from "../style/wrappers/editUser";
import { FaCamera } from "react-icons/fa"


const ProfileEdit = () => {
    const nav = useNavigate();
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
            phone: _dataBody.phone,
            location: _dataBody.location,
        };
        onUpload(allupload);

    }
    const onUpload = async (_dataBody) => {
        console.log(_dataBody)
        try {
            const url = "/users/" + user._id;
            const { data } = await doApiMethod(url, "PUT", _dataBody);
            console.log(data.modifiedCount)
            if (data.modifiedCount) {
                const url = "/users/info/" + user._id;
                const { data } = await doGetApiMethod(url, "GET");
                dispatch(upload(data.userInfo))
                toast.success("the deatails change")
                nav("/profile")
            }
            else {
                errorHandler("User details doesnt change")
                nav("/profile")
            }
        } catch (err) {
            errorHandler(err.response.data.msg)
        }
    };


    return (
        <Wrapper>
            <main>
                <form onSubmit={handleSubmit(onSubForm)} className='col-md-6 shadow'>
                    <div className='mx-auto w-3/4'>
                        <div className="w-full md:w-1/2 px-3 mb-2 md:mb-0">
                            <label>First Name: </label>
                            <input defaultValue={user.fullName.firstName}
                                {...register("firstName", {
                                    required: true,
                                    minLength: 2,
                                    maxLength: 25,
                                })}
                                type="text"
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
                            />
                            {errors.lastName && errorHandler("Enter valid last name.")}
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
                            />
                            {errors.phone && errorHandler("Enter valid phone.")}
                        </div>
                        <div className="w-full md:w-1/2 px-2 mt-2 md:mb-0 ">
                            <label>Location: </label>
                            <input defaultValue={user.location}
                                {...register("location", {
                                    required: true,
                                    minLength: 2,
                                    maxLength: 20,
                                })}
                                type="text"
                            />
                            {errors.location && errorHandler("Enter valid location.")}
                        </div>
                        <div className='mt-3 flex px-2 justify-center'>
                            <button className='mx-1'>Update</button>
                            <Link to="/profile">Back</Link>
                        </div>
                    </div>
                </form>

            </main>
        </Wrapper>
    )
}
export default ProfileEdit