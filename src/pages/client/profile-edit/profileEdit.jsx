import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Wrapper } from "../../../assets/styles/wrappers/editUser";
import { upload } from "../../../redux/features/userSlice";
import {
    doApiMethod,
    doGetApiMethod,
} from "../../../services/axios-service/axios-service";
import { errorHandler } from "../../../services/extra-services/extra-services";

const ProfileEdit = () => {
    const nav = useNavigate();
    const { user } = useSelector((state) => state.userSlice);
    const dispatch = useDispatch();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const onSubForm = (_dataBody) => {
        let allupload = {
            fullName: {
                firstName: _dataBody.firstName,
                lastName: _dataBody.lastName,
            },
            phone: _dataBody.phone,
            country: _dataBody.country.toLowerCase(),
            city: _dataBody.city.toLowerCase(),
        };
        onUpload(allupload);
    };
    const onUpload = async (_dataBody) => {
        try {
            const url = `/users/${user._id}`;
            const { data } = await doApiMethod(url, "PUT", _dataBody);
            if (data.modifiedCount) {
                const url = `/users/info/${user._id}`;
                const { data } = await doGetApiMethod(url, "GET");
                dispatch(upload(data.userInfo));
                toast.success("the deatails change");
                user.role === "admin" ? nav("admin/profile") : nav("/profile");
            } else {
                errorHandler("User details doesnt change");
                nav("/profile");
            }
        } catch (err) {
            errorHandler(err.response.data.msg);
        }
    };

    return (
        <Wrapper>
            <main>
                <form onSubmit={handleSubmit(onSubForm)} className="col-md-6 shadow">
                    <div className="mx-auto w-3/4">
                        <div className="w-full md:w-1/2 px-3 mb-2 md:mb-0">
                            <label>First Name: </label>
                            <input
                                defaultValue={user.fullName.firstName}
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
                            <input
                                defaultValue={user.fullName.lastName}
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
                            <input
                                defaultValue={user.phone}
                                {...register("phone", {
                                    required: true,
                                    minLength: 6,
                                    maxLength: 12,
                                })}
                                type="text"
                            />
                            {errors.phone && errorHandler("Enter valid phone.")}
                        </div>
                        <div className="filters w-full flex mr-2">
                            <div className="w-4/5 mr-1">
                                <div className="w-full md:w-1/2 px-2 mt-2 md:mb-0 ">
                                    <label>Country:</label>
                                    <input
                                        defaultValue={user.country}
                                        {...register("country", {
                                            required: true,
                                            minLength: 2,
                                            maxLength: 12,
                                        })}
                                        type="text"
                                    />
                                    {errors.country && errorHandler("Enter your country.")}
                                </div>
                            </div>
                            <div className="w-full md:w-1/2 px-2 mt-2 md:mb-0 ">
                                <label>city:</label>
                                <input
                                    defaultValue={user.city}
                                    {...register("city", {
                                        required: true,
                                        minLength: 2,
                                        maxLength: 12,
                                    })}
                                    type="text"
                                />
                                {errors.city && errorHandler("Enter your city.")}
                            </div>
                        </div>
                        <div className="mt-3 flex px-2 justify-center">
                            <button className="mx-1">Update</button>
                            <Link to={user.role === "admin" ? "/admin/profile" : "/profile"}>Back</Link>
                        </div>
                    </div>
                </form>
            </main>
        </Wrapper>
    );
};
export default ProfileEdit;
