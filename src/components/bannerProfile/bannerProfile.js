import React,{useRef} from 'react'
import { FaCamera } from "react-icons/fa"

const BannerProfile = () => {
  const profileRef = useRef()
  const bannerRef = useRef()
  return (
    <React.Fragment>
      <div className='w-full h-48 bg-red-300 relative' style={{ backgroundImage: `url('https://images.pexels.com/photos/8110956/pexels-photo-8110956.jpeg?auto=compress&cs=tinysrgb&w=600')`, backgroundSize: "cover", backgroundPosition: "center" }}>
        <span className='w-24 h-24 rounded-full absolute -bottom-7 left-2 z-4 overflow-hidden md:-bottom-10 md:left-24 md:h-32 md:w-32'>
          <img className='w-full h-full' src="https://images.pexels.com/photos/1137511/pexels-photo-1137511.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" />
        </span>
        <span className='absolute -bottom-6 left-20 z-5 text-gray-800 cursor-pointer hover:text-gray-500 md:-bottom-9 md:left-48'><label className="custom-file-upload">
          <input ref={profileRef} type="file" onChange={(e)=>{
            console.log(profileRef.current.files[0])
          }} multiple style={{ display: 'none' }} />
          <FaCamera />
        </label>
        </span>
        <span className='absolute bottom-2 right-5 text-gray-400 cursor-pointer'><label className="custom-file-upload">
          <input ref={bannerRef} type="file" on multiple style={{ display: 'none' }}  onChange={(e)=>{
            console.log(bannerRef.current.files[0])
          }}/>
          <FaCamera />
        </label></span>
      </div>

      
    </React.Fragment>
  )
}

export default BannerProfile