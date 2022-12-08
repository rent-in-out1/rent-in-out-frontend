import React, { useState, useRef } from "react";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form"
import { doApiMethod, errorHandler, successHandler } from "../../services/service";
import { Wrapper } from '../style/wrappers/postUi';
import ImageFill from "../icons/imageFill";
import { uploadPostImages } from "../../helpers/functions";

const CreatePost = () => {
  const { user } = useSelector((state) => state.userSlice);
  const [display, setDisplay] = useState(false);
  const [data, setData] = useState({});
  const { register, handleSubmit, formState: { errors } } = useForm();
  const rangeRef = useRef();
  const categoryRef = useRef();
  const postRef = useRef();

  const changePostImage = async (images) => {
    let result = []
    const img_ar = Array.from(images);
    if (img_ar.length > 4) return errorHandler("can't upload 5 images together")
    img_ar.forEach(async element => {
      if (element.size > 2 * 1024 * 1024) {
        return errorHandler("file too big")
      }
      let image = await uploadPostImages(element);
      result = await result.push(image);
    });
    images = result;
    successHandler("images uploaded")
  }
  /** first form */
  const onSubForm = async (_dataBody) => {
    if (!postRef.current.files.length > 0) {
      return errorHandler("you must to choose some images")
    }
    let form1 = {
      img: [...postRef.current.files],
      title: _dataBody.title,
      info: _dataBody.textarea,
      range: rangeRef.current.value
    }
    setData(form1)
    setDisplay(true)
  }
  /** second form */
  const onSubForm2 = (_dataBody) => {
    let form2 = {
      price: _dataBody.price,
      category_url: categoryRef.current.value,
      country: _dataBody.country,
      city: _dataBody.city
    }
    setData({ ...data, ...form2 })
    uploadPost(data);
    successHandler("you upload new post")

  }
  const uploadPost = async (_data) => {
    try {
      const url = "/posts";
      await doApiMethod(url, "POST", _data);
    }
    catch (err) {
      errorHandler(err.response.data.msg)
    }
  }
  return (
    <Wrapper>
      <main className='mx-auto md:w-2/3 p-3 bg-white w-full rounded-xl drop-shadow-xl'>
        <div className='flex p-2 mx-auto  space-x-1 justify-center'>
          <div>
            {user.fullName.firstName}  {user.fullName.lastName}
          </div>
          <div className="rounded-full w-8 h-8 overflow-hidden ">
            <img className="object-cover w-full h-full" src={user.profile_img.url} alt="avatar" />
          </div>
        </div>
        {/* first process */}
        {!display && <form form onSubmit={handleSubmit(onSubForm)}>
          <div className="flex px-3">
            <div className="w-full md:w-1/3 px-3">
              <label className="cursor-pointer flex items-center justify-center bg-white w-full rounded-xl p-3 h-full border border-gray-200">
                <input ref={postRef} accept="image/png,image/jpeg, image/jpg, image/svg" type="file" multiple="multiple" style={{ display: 'none' }} onChange={() => changePostImage(postRef.current.files)} />
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
                type="text" placeholder=' choose a title'
              />
              {errors.title && errorHandler("Enter valid title.")}
              <textarea className='w-full border border-gray-200 rounded-lg' rows={3} {...register("textarea", {
                required: true,
                minLength: 2,
                maxLength: 100,
              })} type="text" placeholder="What do you want to share?" ></textarea>
              {errors.textarea && errorHandler("Enter at least two characters at description.")}
              <select ref={rangeRef}>
                <option selected value="short-term" key={0} >
                  short-term
                </option>
                <option value="long-term" key={1} >
                  long-term
                </option>
              </select>
            </div>
          </div>
          <div className="  flex justify-end ">
            <button type="submit" >
              Next
            </button>
          </div>
        </form>}
        {/* second process  */}
        {display && <form onSubmit={handleSubmit(onSubForm2)} className="secondform w-full ">
          <div className="w-full md:w-2/3">
            <input className="mt-2"
              {...register("price", {
                required: true,
                minLength: 2,
                maxLength: 25,
              })}
              type="number" placeholder=' choose a price'
            />
            {errors.price && errorHandler("Enter valid price.")}
            <select className="mt-2" ref={categoryRef}>
              <option selected value="category" key={0} >
                category
              </option>
              <option value="" key={1} >
              </option>
            </select>
            <div className="filters w-full flex ">
              <div className="w-1/2 mr-1">
                <input
                  {...register("country", {
                    required: true,
                    minLength: 2,
                    maxLength: 12,
                  })}
                  type="text" placeholder="Enter your country"
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
                  type="text" placeholder="Enter your city"
                />
                {errors.city && errorHandler("Enter your city.")}
              </div>
            </div>
            <div className="  flex justify-center ">
              <div className="flex">
                <button type="submit" >
                  Upload
                </button>
                <button onClick={() => setDisplay(false)} type="submit"> Back</button>
              </div>
            </div>
          </div>
        </form>}
      </main>
    </Wrapper >
  )
}

export default CreatePost