import React from 'react'
import { Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'


const PostLayout = () => {
  let { user } = useSelector((state) => state.userSlice);
  return (
    <React.Fragment>
      <div className='bg-gray-100 flex'>
        <div className='bg-gray-100 w-full'>
          <Outlet />
        </div>
      </div>
    </React.Fragment>
  )
}

export default PostLayout