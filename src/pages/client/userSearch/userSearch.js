import React from 'react'
import { useState, useRef, useEffect } from 'react'
import SideBar from '../../../components/sideBar/sideBar';
import UserCard from '../../../components/userCard'
import { doGetApiMethod, errorHandler } from "../../../services/service";

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
    <React.Fragment>
      <SideBar />
      <div className='w-10/12 ml-auto p-2'>
        <div>
          <input onChange={serachUser} ref={inpRef} onKeyDown={(e) => {
            if (e.key == "Enter") {
              serachUser()
            }
          }} type="text" placeholder="search users" />
        </div>
        <ul className='w-full mt-3'>
          {ar?.map(item => {
            return (
              <UserCard key={item._id} item={item} />
            )
          })}
        </ul>
      </div>
    </React.Fragment>
  )
}

export default UserSearch