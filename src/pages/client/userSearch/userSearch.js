import React from 'react'
import { useState, useRef, useEffect } from 'react'
import SideBar from '../../../components/sideBar/sideBar';
import UserCard from '../../../components/userCard'
import { doGetApiMethod, errorHandler } from "../../../services/service";
import Search from '../../../components/icons/search';

import {  Wrapper } from '../../../components/style/wrappers/userSearch';

const UserSearch = () => {

  const inpRef = useRef();
  const [ar, setAr] = useState([]);

  const serachUser = async () => {
    let searchQ = inpRef.current.value
    if (!searchQ) {
      setAr([]);
      return;
    }
    const url = "/users/userSearch?s=" + searchQ;
    try {
      const { data } = await doGetApiMethod(url);
      setAr(data);
    } catch (err) {
      errorHandler(err.response.data.msg)
    }
  }
  return (
    <Wrapper>
    
    <div className='mt-6'>
      <SideBar />
      <div className='w-10/12 ml-auto p-2'>
      <div className="search w-full md:w-1/2">
            <input onChange={serachUser} ref={inpRef} onKeyDown ={(e)=> {
              if (e.key=="Enter"){
                serachUser()
              }
            }} type="text" placeholder='Search...' className='  border-transparent focus:border-transparent focus:ring-0 ' />
            <div className="icon">
              <Search color='#333' width='16' height='16'/>
            </div>
          </div>
  
    {/* <div class="relative">
        <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg aria-hidden="true" class="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
        </div>
        <input onChange={serachUser} ref={inpRef} onKeyDown={(e)=>{
           if (e.key == "Enter") {
            serachUser()
          }
        }} type="search" id="default-search" class=" border-purple-700 shadow bg-indigo-200	  block w-full md:w-1/3 p-4 pl-10 text-sm text-black-500 border border-gray-300 rounded-lg bg-black-50 focus:ring-black-500 focus:border-black-500 dark:bg-gray-700 dark:border-gray-600 placeholder-black::placeholder  " placeholder="Search..." required/>
    </div> */}
        <ul className='dropdown'>
          {ar?.map(item => {
            return (
              <UserCard key={item._id} item={item} />
            )
          })}
        </ul>
      </div>
    </div>
    </Wrapper>
  )
}

export default UserSearch