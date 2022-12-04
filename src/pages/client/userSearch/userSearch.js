import React from 'react'
import { useState, useRef, useEffect } from 'react'
import SideBar from '../../../components/sideBar/sideBar';
import UserCard from '../../../components/userCard'
import { doGetApiMethod, errorHandler } from "../../../services/service";
import Search from '../../../components/icons/search';

import { Wrapper } from '../../../components/style/wrappers/userSearch';

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
          <div className="search w-full md:w-1/3">
            <input onChange={serachUser} ref={inpRef} onKeyDown={(e) => {
              if (e.key == "Enter") {
                serachUser()
              }
            }} type="text" placeholder='Search...' className='  border-transparent focus:border-transparent focus:ring-0 ' />
            <div className="icon">
              <Search color='#333' width='16' height='16' />
            </div>
          </div>
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