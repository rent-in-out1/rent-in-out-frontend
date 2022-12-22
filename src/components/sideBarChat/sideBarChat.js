import React, { useEffect } from 'react'
import { doGetApiMethod } from '../../services/service';
import Chat from '../icons/chat';
import UserSingleChat from '../userSingleChat/userSingleChat';
const SideBarChat = () => {
    useEffect(() => {
        const getChatHistory = async()=>{
          let {data} = await doGetApiMethod(`/users/getAllChat`) 
          console.log(data)
        }
        getChatHistory()
      }, []);
    return (
        <div className='md:w-3/12 lg:w-2/12 p-2 fixed top-16 hidden md:flex'>
            <div className="overflow-y-auto py-4 w-full mt-4 px-2 bg-white shadow-xl rounded">
                <div className='flex justify-between'>
                    <h2 className='flex items-center'><span className='mr-1'>Chats</span><span><Chat/></span></h2>
                    <span className='text-sm text-blue-400 cursor-pointer'>All</span>
                </div>
                {/* all users with last chat here */}
                <UserSingleChat />
                <UserSingleChat />
                <UserSingleChat />
            </div>
        </div>
    )
}

export default SideBarChat