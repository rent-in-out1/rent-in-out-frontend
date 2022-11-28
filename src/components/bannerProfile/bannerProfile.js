import React, { useRef, useState } from 'react'
import { FaCamera } from "react-icons/fa"
import { uploadImage } from '../../helpers/functions'
import {toast} from "react-toastify"
const BannerProfile = () => {
  const [banner, setBanner] = useState("")
  const [profile, setProfile] = useState("")
  const profileRef = useRef()
  const bannerRef = useRef()

  const changeBanner = async(file) => {
    if(file.size > 2 * 1024 * 1024){
      return alert("file too big")
    }
    const url = await uploadImage(file)
   
    setBanner(url)
  }
  const changeProfile = async(file) => {
    if(file.size > 2 * 1024 * 1024){
      return alert("file too big")
    }
    const url = await uploadImage(file)
    toast.info("Uploading",)
    setProfile(url)
  }
  return (
    <React.Fragment>
      <div className='w-full h-48 bg-red-300 relative' style={{ backgroundImage: `url(${banner})`, backgroundSize: "cover", backgroundPosition: "center" }}>
        <span className='w-24 h-24 rounded-full absolute -bottom-7 left-2 z-4 overflow-hidden md:-bottom-10 md:left-24 md:h-32 md:w-32'>
          <img className='w-full h-full object-cover' src={profile ? profile :"https://images.pexels.com/photos/1137511/pexels-photo-1137511.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"} alt="" />
        </span>
        <span className='absolute -bottom-6 left-20 z-5 text-gray-800 cursor-pointer bg-white  rounded-full p-1 hover:text-gray-500 md:-bottom-9 md:left-48'><label className="custom-file-upload">
          <input ref={profileRef} accept="image/png,image/jpeg, image/jpg, image/svg" type="file" onChange={()=>changeProfile(profileRef.current.files[0])}
           multiple style={{ display: 'none' }} />
          <FaCamera />
        </label>
        </span>
        <span className='absolute bottom-2 right-5 text-gray-400  bg-white rounded-full p-1 cursor-pointer'><label className="custom-file-upload">
          <input ref={bannerRef} accept="image/png,image/jpeg, image/jpg, image/svg" type="file" on multiple style={{ display: 'none' }} onChange={()=>changeBanner(bannerRef.current.files[0])} />
          <FaCamera />
        </label></span>
      </div>
      <div className='flex justify-center'>
      </div>


    </React.Fragment>
  )
}

export default BannerProfile