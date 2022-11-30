import React from 'react'

import { useSelector } from "react-redux";

const UserCard = (props) => {
  let item = props.item
  const { user } = useSelector((state) => state.userSlice);
  return (
    <ul className='w-full md:w-1/3  mt-3'>
        <li className='p-2 border flex items-center'>
          <div className=' m-2 rounded-full bg-black w-20 h-20 overflow-hidden  ' >
          <img
              className="rounded-full w-20 h-20 "
              src={
                user !== null && user?.active
                  ? item.profile_img
                  : "https://freesvg.org/img/Male-Avatar.png"
              }
              alt=""
            />
          </div>
           <div className='overflow-hidden'> 
           <div>{item.fullName.firstName} {user.fullName.lastName}</div>
           <div> {item.email}</div>
           </div>
           <div className='p-4 m-3'>
            {item.location}
           </div>
        </li>
        
    </ul>

  )
}

export default UserCard