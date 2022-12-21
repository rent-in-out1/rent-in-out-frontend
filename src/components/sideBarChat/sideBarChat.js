import React from 'react'
import { useSelector } from 'react-redux'
import Chat from '../icons/chat';
import UserSingleChat from '../userSingleChat/userSingleChat';
const SideBarChat = () => {
    const { user } = useSelector(state => state.userSlice);
    console.log(user)
    return (
        <div className='md:w-3/12 lg:w-2/12 p-2 fixed top-16 hidden md:flex'>
            <div className="overflow-y-auto py-4 w-full mt-4 px-2 bg-white shadow-xl rounded">
                <div className='flex justify-between'>
                    <h2 className='flex items-center'><span className='mr-1'>Chats</span> <span><Chat/></span></h2>
                    <span className='text-sm text-blue-400 cursor-pointer'>All</span>
                </div>
                {/* all users with last chat here */}
                {user && <UserSingleChat user={user} />}
                {user && <UserSingleChat user={user} />}
                {user && <UserSingleChat user={user} />}
            </div>
        </div>
    )
}

export default SideBarChat