import React from 'react'

const UserSingleChat = ({msg}) => {
  return (
    <div className='cursor-pointer mt-2 p-1 hover:bg-gray-100'>
        <div className="info flex items-center">
            <div className="profile w-5 h-5 mr-1">
                <img className='h-full w-full object-cover rounded-full' src={msg.img} alt={msg.name} />
            </div>
            <div className="firstName text-sm capitalize">
                {/* {user.fullName.firstName} */}
                {msg.name}
            </div>
        </div>
        <div className="chatOverView bg-gray-50 text-xs mt-2 p-1">
            {msg?.messagesArr[msg?.messagesArr.length-1].message}
        </div>
    </div>
  )
}

export default UserSingleChat