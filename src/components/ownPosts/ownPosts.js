import React, { useEffect } from 'react'
import { doGetApiMethod } from './../../services/service';

const OwnPosts = () => {
  useEffect(()=>{
    getUserPosts()
  })

  const getUserPosts = async() =>{
    let url = "/posts/userPosts"
    const {data} = await doGetApiMethod(url)
    console.log(data)
  }
  return (
    <div>OwnPosts</div>
  )
}

export default OwnPosts