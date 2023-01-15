import React, { useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { Wrapper } from "../../../../assets/styles/wrappers/postUi";
import ImageFill from "../../../../assets/icons/imageFill";
import { deleteOnCancel, uploadPostImages } from "../../../../services/cloudinary-service/cloudinary-service";
import { uploadPost } from "../../../../redux/features/postsSlice";
import {
  errorHandler,
  successHandler,
} from "../../../../services/extra-services/extra-services";
import { secret } from "./../../../../services/secrets";
import { useUploadWidget } from "./../../../../shared/components/uploadWidget";

const CreatePost = ({ setOnAdd }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.userSlice);
  const [display, setDisplay] = useState(false);
  const [data, setData] = useState({});
  // const [images, setImages] = useState({});
  const categoryRef = useRef();
  const rangeRef = useRef();
  const [images, setImages, load] = useUploadWidget({
    userID: user._id,
    cloudName: secret.POST_CLOUDINARY_NAME,
    uploadPreset: secret.POST_CLOUDINARY_PRESET,
    single: false,
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  /** first form */
  const onSubForm = async (_dataBody) => {
    let form1 = {
      img: images,
      title: _dataBody.title,
      info: _dataBody.textarea,
      range: rangeRef.current.value,
    };
    setData(form1);
    setDisplay(true);
  };
  /** second form */
  const onSubForm2 = (_dataBody) => {
    let form2 = {
      ...data,
      price: _dataBody.price,
      category_url: categoryRef.current.value,
      country: _dataBody.country,
      city: _dataBody.city,
    };
    console.log(form2);
    dispatch(uploadPost(form2));
    // setData({ ...data, ...form2 })
    successHandler("you upload new post");
  };

  return (
    <Wrapper>
      <main className="mx-auto md:w-2/3 p-3 bg-white w-full rounded-xl drop-shadow-xl">
        <div className="flex p-2 mx-auto  space-x-1 justify-center">
          <div>
            {user?.fullName.firstName} {user?.fullName.lastName}
          </div>
          <div className="rounded-full w-8 h-8 overflow-hidden ">
            <img
              className="object-cover w-full h-full"
              src={user?.profile_img.url}
              alt="avatar"
            />
          </div>
        </div>
        {/* first process */}
        {!display && (
          <form onSubmit={handleSubmit(onSubForm)}>
            <div className="flex px-3">
              <div
                className="w-full md:w-1/3 px-3"
                onClick={() => setImages.open()}
              >
                <label className="relative cursor-pointer flex items-center justify-center bg-white w-full rounded-xl p-3 h-full border border-gray-200">
                  {images && images.length > 0 ? (
                    <h2 className="absolute text-blue-500 top-4">
                      Add More Photos
                    </h2>
                  ) : null}
                  <ImageFill width={"60px"} height="60px" />
                </label>
              </div>
              <div className="w-full md:w-2/3">
                <input
                  {...register("title", {
                    required: true,
                    minLength: 2,
                    maxLength: 25,
                  })}
                  type="text"
                  placeholder=" choose a title"
                />
                {errors.title && errorHandler("Enter valid title.")}
                <textarea
                  className="w-full border border-gray-200 rounded-lg"
                  rows={3}
                  {...register("textarea", {
                    required: true,
                    minLength: 2,
                    maxLength: 100,
                  })}
                  placeholder="What do you want to share?"
                ></textarea>
                {errors.textarea &&
                  errorHandler("Enter at least two characters at description.")}
                <select ref={rangeRef}>
                  <option defaultValue="short-term" key={0}>
                    short-term
                  </option>
                  <option value="long-term" key={1}>
                    long-term
                  </option>
                </select>
              </div>
            </div>
            <div className="  flex justify-end ">
              <button type="submit">Next</button>
            </div>
          </form>
        )}
        {/* second process  */}
        {display && (
          <form
            onSubmit={handleSubmit(onSubForm2)}
            className="secondform w-full "
          >
            <div className="w-full md:w-2/3">
              <input
                className="mt-2"
                {...register("price", {
                  required: true,
                  minLength: 2,
                  maxLength: 25,
                })}
                type="number"
                placeholder=" choose a price"
              />
              {errors.price && errorHandler("Enter valid price.")}
              <select className="mt-2" ref={categoryRef}>
                <option defaultValue="category" key={0}>
                  category
                </option>
                <option value="" key={1}></option>
              </select>
              <div className="filters w-full flex ">
                <div className="w-1/2 mr-1">
                  <input
                    {...register("country", {
                      required: true,
                      minLength: 2,
                      maxLength: 12,
                    })}
                    type="text"
                    placeholder="Enter your country"
                  />
                  {errors.country && errorHandler("Enter your country.")}
                </div>
                <div className="w-full md:w-1/2 px-1 mt-2  md:mb-0 ">
                  <input
                    {...register("city", {
                      required: true,
                      minLength: 2,
                      maxLength: 12,
                    })}
                    type="text"
                    placeholder="Enter your city"
                  />
                  {errors.city && errorHandler("Enter your city.")}
                </div>
              </div>
              <div className="  flex justify-center ">
                <div className="flex">
                  <button type="submit">Upload</button>
                  <button onClick={() => setDisplay(false)} type="submit">
                    {" "}
                    Back
                  </button>
                </div>
              </div>
            </div>
          </form>
        )}
        <button
          className="btn cursor-pointer bg-blue-400 opacity-50 rounded-full w-1/2 md:w-1/6 inline-block px-2 py-3 font-semibold leading-tight hover:text-white hover:bg-blue-600"
          type="button"
          onClick={() => {
            setOnAdd(false);
            deleteOnCancel(images)
          }}
        >
          Cancel
        </button>
      </main>
    </Wrapper>
  );
};

export default CreatePost;
