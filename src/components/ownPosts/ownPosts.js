import React, { useEffect , useState } from 'react'
import { doGetApiMethod } from './../../services/service';
import Card from './../card/card';
import { Wrapper } from './../style/wrappers/grid';

const OwnPosts = () => {
  const [posts , setPosts] = useState([])
  const [isChange, setIsChange] = useState(false);
  useEffect(()=>{
    getUserPosts()
    setIsChange(false)
  },[isChange])

  const getUserPosts = async() =>{
    let url = "/posts/userPosts"
    const {data} = await doGetApiMethod(url)
    setPosts(data)
  }
  return (
    <Wrapper col={2} rowGap ={5} colGap ={5} className="px-auto">
      {posts.map((post, i) =>{
        return(
          <div key={post._id} className=" flex justify-center items-center">
          <Card setIsChange={setIsChange}  post={post}/>
          </div>
        )
      })}
    </Wrapper>
  )
}

export default OwnPosts