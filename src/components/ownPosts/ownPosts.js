import React, { useEffect , useState } from 'react'
import { doGetApiMethod } from './../../services/service';
import Card from './../card/card';
import { Wrapper } from './../style/wrappers/grid';

const OwnPosts = ({id, col = 2}) => {
  const [posts , setPosts] = useState([])
  const [isChange, setIsChange] = useState(false);
  useEffect(()=>{
    getUserPosts()
    setIsChange(false)
  },[isChange, id])

  const getUserPosts = async() =>{
    let url = "/posts/userPosts/"+id
    const {data} = await doGetApiMethod(url)
    setPosts(data)
  }
  return (
    <Wrapper col={col} rowGap ={5} colGap ={5} className="w-full">
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