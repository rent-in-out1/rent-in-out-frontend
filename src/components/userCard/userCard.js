import React from 'react'

import { useSelector } from "react-redux";

const UserCard = ({ item }) => {

  const { user } = useSelector((state) => state.userSlice);
  return (

    <li className='p-3 border flex items-center justify-between'>
      <div className='flex items-center'>
        <div className=' rounded-full  w-8 h-8 overflow-hidden  ' >
          <img
            className=" object-cover  w-full h-full "
            src={
              user !== null && user?.active
                ? item.profile_img
                : "https://freesvg.org/img/Male-Avatar.png"
            }
            alt=""
          />
        </div>
        <div>{item.fullName.firstName} {item.fullName.lastName}</div>
      </div>
      <div>
        {item.country}
      </div>
    </li>



  )
}

export default UserCard