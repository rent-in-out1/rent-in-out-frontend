import React, { useState, useRef } from "react";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form"
import { Link } from 'react-router-dom'
import { doApiMethod, errorHandler, doGetApiMethod, successHandler } from "../../services/service";
import { Wrapper } from '../style/wrappers/postUi';
import ImageFill from "../icons/imageFill";
import { uploadPostImages } from "../../helpers/functions";

const CreatePost = () => {
  const { user } = useSelector((state) => state.userSlice);
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { display, setDisplay } = useState(false)
  const [selecterange, setSelecterange] = useState("short-term");
  const rangeRef = useRef();
  const postRef = useRef();
  const images= [];

  const changePostImage = async (images) => {
    let result= []
    const img_ar = Array.from(images);
    if(img_ar.length > 4) return errorHandler("can't upload 5 images together")
    img_ar.forEach (async element => {
      if (element.size > 2 * 1024 * 1024) {
        return errorHandler("file too big")
      }
      let image =await uploadPostImages(element);
        result =  await result.push(image);
    });
    console.log(images)
    images= result;
    successHandler("images uploaded")
  }
  const onSubForm = (_dataBody) => {
    console.log(_dataBody);
    console.log(rangeRef.current.value)
    alert("done")
    return;
  }

  return (
    <Wrapper>
      <main className='mx-auto w-full md:w-2/3 p-3 bg-white w-full rounded-xl shadow-xl'>
        <div className='flex p-2 mx-auto  space-x-1 justify-center'>
          <div>
            {user.fullName.firstName}  {user.fullName.lastName}
          </div>
          <div className="rounded-full w-8 h-8 overflow-hidden ">
            <img className="object-cover w-full h-full" src={user.profile_img.url} alt="avatar" />
          </div>
        </div>
        <form onSubmit={handleSubmit(onSubForm)} className="">
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
              <select ref={rangeRef} onChange={() => setSelecterange(rangeRef.current.value)}>
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
        </form>
        {/* second form  */}

        {display && <form onSubmit={handleSubmit(onSubForm)} className="border border-blue-700 rounded-full p-5 ">
          <div className="flex  -mx-3 mb-2">
            <div className="w-full md:w-1/2 px-3 mb-2 md:mb-0">

              <input
                {...register("price", {
                  required: true,
                  minLength: 2,
                  maxLength: 25,
                })}
                type="text"
                placeholder="price"
              />
              {errors.price && <small>Enter valid price.</small>}
            </div>
            <div className="w-full md:w-1/2 px-3">

              <input
                {...register("category", {
                  required: true,
                  minLength: 2,
                  maxLength: 25,
                })}
                type="text"
                placeholder="choose category"
              />
              {errors.category && <small>Enter valid  category.</small>}
            </div>
          </div>


          <div className="  flex justify-end ">
            <button type="submit" >
              Next
            </button>

          </div>
        </form>}



      </main>
    </Wrapper>
  )
}

export default CreatePost