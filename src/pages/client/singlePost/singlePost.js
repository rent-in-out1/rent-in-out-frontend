import React, { useState } from 'react'
import { useEffect } from 'react';
import { useParams } from 'react-router-dom'
import { doGetApiMethod } from '../../../services/axios-service/axios-service';

const SinglePost = () => {
  const params = useParams();
  const [post,setPost] = useState({})
  useEffect(()=>{
    getPostByID()
  },[])

  /** get post from api */
  const getPostByID = async() => {
    let url = "/posts/getPostByID/" + params.postID;
      const post = await doGetApiMethod(url)
      setPost(post.data);
  }
  return (
    <div>
      {post?.title}
    </div>
  )
}

export default SinglePost