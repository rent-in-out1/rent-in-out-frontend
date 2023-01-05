import React from 'react'
import { Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'


const PostLayout = () => {
  return (
    <React.Fragment>
      <div className='flex'>
        <div className='w-full'>
          <Outlet/>
        </div>
      </div>
    </React.Fragment>
  )
}

export default PostLayout