import React, { useEffect, useState } from "react";
import { doGetApiMethod } from "../../../../services/axios-service/axios-service";
import Card from "../../../../shared/components/card/card";
import { Wrapper } from "../../../../assets/styles/wrappers/grid";
import { useSelector } from "react-redux";

const OwnPosts = ({ id, col = 2 }) => {
  const [posts, setPosts] = useState([]);
  const {isChange} = useSelector(state => state.postsSlice)
  useEffect(() => {
    getUserPosts();
  }, [isChange, id]);

  const getUserPosts = async () => {
    let url = "/posts/userPosts/" + id;
    const { data } = await doGetApiMethod(url);
    setPosts(data);
  };
  return (
    <>
      {posts.length>0 ?(<Wrapper col={col} rowGap={5} colGap={5} className="w-full">
        {posts.map((post) => {
          return (
            <div key={post._id} className=" flex justify-center items-center">
              <Card post={post} />
            </div>
          );
        })}
      </Wrapper>):<h2  className=" flex justify-center items-center" >No posts yet</h2>}
    </>
  );
};

export default OwnPosts;
