import React from 'react'
import {FaCamera} from "react-icons/fa"

const BannerProfile = () => {
  return (
    <React.Fragment>
      <div className='w-full h-48 bg-red-300 relative' style={{backgroundImage:`url('https://images.pexels.com/photos/1137511/pexels-photo-1137511.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')`}}>
          <span className='w-24 h-24 rounded-full absolute -bottom-5 left-24 z-4'>
            <span className='absolute bottom-2 right-5 text-gray-400 cursor-pointer'><FaCamera/>
            <img className='w-full h-full' src="https://images.pexels.com/photos/1137511/pexels-photo-1137511.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"  alt="" /></span>
          </span>
          <span className='absolute bottom-2 right-5 text-gray-400 cursor-pointer'><FaCamera/></span>
      </div>
    </React.Fragment>
  )
}

export default BannerProfile