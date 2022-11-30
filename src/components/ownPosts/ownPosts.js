import React, { useEffect , useState } from 'react'
import { doGetApiMethod } from './../../services/service';
import Card from './../card/card';

const OwnPosts = () => {
  const [posts , setPosts] = useState([])
  useEffect(()=>{
    getUserPosts()
  })

  const getUserPosts = async() =>{
    let url = "/posts/userPosts"
    const {data} = await doGetApiMethod(url)
    setPosts(data)
  }
  return (
    <div className='"grid grid-cols-3 gap-4"'>
      {posts.map(post =>{
        return(
          <Card key= {post._id} post={post}/>
        )
      })}
    </div>
  )
}

export default OwnPosts