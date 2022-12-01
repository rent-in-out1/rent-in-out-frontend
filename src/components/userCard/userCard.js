import React from 'react'

import { useSelector } from "react-redux";

const UserCard = ({ item }) => {

  const { user } = useSelector((state) => state.userSlice);
  return (

    <li className='p-3 sm:py-3  flex items-center justify-between w-full mt-3   w-full max-w-md  bg-white border rounded-lg shadow-md sm:p-8 dark:bg-gray-800 dark:border-gray-700'>
      <div className='flex items-center space-x-1'>
        <div className=' rounded-full  w-8 h-8 overflow-hidden' >
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
        <div>
          <p className='"text-sm font-medium text-gray-900 truncate dark:text-white"'>{item.fullName.firstName} {item.fullName.lastName} </p>
        <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                            {item.email}
                        </p>
                        </div>
      </div>
      <p className='text-base font-semibold text-gray-900 dark:text-white md:p-2 -mx-2 md:overflow-hidden'>
        {item.country}
      </p>
    </li>



  )
}

export default UserCard