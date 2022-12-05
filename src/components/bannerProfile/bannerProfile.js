import React, { useRef, useState } from 'react'
import { FaCamera } from "react-icons/fa"
import { deleteBannerImage, deleteProfileImage, uploadBannerImg, uploadProfileImg } from '../../helpers/functions'
import Loader from '../loader/loader'
import { useSelector, useDispatch} from 'react-redux'
import { doApiMethod, errorHandler, successHandler } from '../../services/service'
import { uploadBanner, uploadProfileImage } from '../../redux/features/userSlice'
const BannerProfile = () => {
  const dispatch = useDispatch();
  const {cover_img ,profile_img } = useSelector(state => state.userSlice?.user)
  const [banner, setBanner] = useState(cover_img.url)
  const [profile, setProfile] = useState(profile_img.url)
  const [loadBanner, setLoadBanner] = useState(false)
  const [loadImg, setLoadImg] = useState(false)
  const profileRef = useRef()
  const bannerRef = useRef()
  const changeBanner = async (file) => {
    if (file.size > 2 * 1024 * 1024) {
      return errorHandler("file too big")
    }
    setLoadBanner(true)
    await deleteBannerImage(cover_img?.img_id)
    const img_data = await uploadBannerImg(file)
    setLoadBanner(false)
    setBanner(img_data.url)
    try{
      const urlR = "/users/uploadBanner";
      let res = await doApiMethod(urlR,"PATCH",img_data)
      dispatch(uploadBanner(img_data));
      successHandler(res)
    }
    catch(err){
      return errorHandler(err.response.data.msg)
    }
  }

  const changeProfile = async (file) => {
    if (file.size > 2 * 1024 * 1024) {
      return errorHandler("file too big")
    }
    setLoadImg(true)
    await deleteProfileImage(profile_img?.img_id)
    const img_data = await uploadProfileImg(file)
    setLoadImg(false)
    setProfile(img_data.url)
    try{
      const urlR = "/users/uploadProfile";
      let res = await doApiMethod(urlR,"PATCH",img_data)
      dispatch(uploadProfileImage(img_data));
      successHandler(res)
    }
    catch(err){
      return errorHandler(err.response.data.msg)
    }
  }
  return (
    <React.Fragment>
      <div className='w-full h-72 relative' style={{ backgroundImage: `url(${banner})`, backgroundSize: "cover", backgroundPosition: "center" }}>
        <div className='z-10 w-full h-full flex justify-center items-center'>
          <Loader load={loadBanner} height="160" width={"160"} />
        </div>
        <span className='w-24 h-24 rounded-full absolute -bottom-7 left-2 z-4 overflow-hidden md:-bottom-10 md:left-24 md:h-32 md:w-32'>
          <div className='z-10 absolute top-2 left-2 md:top-8 md:left-6'>
            <Loader load={loadImg} height="80" width={"80"} />
          </div>
          <img className='w-full h-full object-cover' src={profile ? profile : "https://images.pexels.com/photos/1137511/pexels-photo-1137511.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"} alt="" />
        </span>
        <span className='absolute -bottom-6 left-20 z-5 text-gray-800 cursor-pointer bg-gray-300  rounded-full p-2 hover:text-gray-500 md:-bottom-9 md:left-48'><label className="custom-file-upload">
          <input ref={profileRef} accept="image/png,image/jpeg, image/jpg, image/svg" type="file" onChange={() => changeProfile(profileRef.current.files[0])}
            multiple style={{ display: 'none' }} />
          <FaCamera className='cursor-pointer' />
        </label>
        </span>
        <span className='absolute bottom-2 right-5 text-gray-800 bg-gray-300 rounded-full p-2 hover:text-gray-500'>
          <label className="custom-file-upload flex items-center cursor-pointer">
            <input ref={bannerRef} accept="image/png,image/jpeg, image/jpg, image/svg" type="file" on multiple style={{ display: 'none' }} onChange={() => changeBanner(bannerRef.current.files[0])} />
            <FaCamera className='cursor-pointer' />
            <span className='ml-2 font-sans font-bold capitalize'>upload banner</span>
          </label>
        </span>
      </div>
      <div className='flex justify-center'>
      </div>
    </React.Fragment>
  )
}

export default BannerProfile