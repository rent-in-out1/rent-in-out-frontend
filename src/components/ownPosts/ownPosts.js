import React, { useEffect , useState } from 'react'
import { doGetApiMethod } from './../../services/service';
import Card from './../card/card';
import { Wrapper } from './../style/wrappers/grid';

const OwnPosts = () => {
  const [posts , setPosts] = useState([])
  useEffect(()=>{
    getUserPosts()
  },[])

  const getUserPosts = async() =>{
    let url = "/posts/userPosts"
    const {data} = await doGetApiMethod(url)
    console.log(data)
    setPosts(data)
  }
  return (
    <Wrapper col={2} rowGap ={5} colGap ={5} className="px-auto">
      {posts.map(post =>{
        return(
          <div className=" flex justify-center items-center">
          <Card key={post._id} post={post}/>
          </div>
        )
      })}
    </Wrapper>
  )
}

export default OwnPosts