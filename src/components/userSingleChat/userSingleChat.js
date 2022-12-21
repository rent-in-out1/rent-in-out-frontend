import React from 'react'

const UserSingleChat = ({user}) => {
    console.log(user)
  return (
    <div className='cursor-pointer mt-2 p-1 hover:bg-gray-100'>
        <div className="info flex items-center">
            <div className="profile w-5 h-5 mr-1">
                <img className='h-full w-full object-cover rounded-full' src={user?.profile_img?.url} alt="profile" />
            </div>
            <div className="firstName text-sm">
                {user.fullName.firstName}
            </div>
        </div>
        <div className="chatOverView bg-gray-50 text-xs mt-2 p-1">
            Hi Shay can you help me with something...
        </div>
    </div>
  )
}

export default UserSingleChat