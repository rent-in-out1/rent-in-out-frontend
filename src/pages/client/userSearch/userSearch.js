import React from 'react'
import { useState,useRef, useEffect } from 'react'
import {  useSearchParams, useNavigate } from 'react-router-dom';
import UserCard from '../../../components/userCard'
import {doGetApiMethod, errorHandler } from "../../../services/service";

const UserSearch = () => {
  const nav = useNavigate();
  const [query] = useSearchParams();
  const inpRef = useRef();
  const [ar,setAr] = useState([]);

  useEffect(() => {
    serachUser();
  }, [query.get("s")]);


  const serachUser = async () => {
    let searchQ = query.get("s") || query.get("ido");
<<<<<<< HEAD
    const url = "/users/search?s=" +searchQ;
=======
    const url = "/users/search/?s=" +searchQ;
>>>>>>> cardandsearch
    try {
      const {data}  = await doGetApiMethod(url);
      console.log(data);
      setAr(data);
    } catch (err) {
      errorHandler(err.response.data.msg)
    }
  }

  return (

    <div>
        <div>
        <input  onChange={serachUser} ref= {inpRef} onKeyDown={(e)=>{
               if(e.key == "Enter"){
<<<<<<< HEAD
                serachUser()
=======
                nav("/users/search/?s="+inpRef.current.value);
>>>>>>> cardandsearch
              }
        }} type="text" placeholder= "search users"/>
        </div>
        <div>
<<<<<<< HEAD
        {ar?.map(item =>{
=======
        {ar.map(item =>{
>>>>>>> cardandsearch
          return(
            <UserCard key={item._id} item={item}/>
          )
        })}
      </div>
       
    </div>
  )
}

export default UserSearch