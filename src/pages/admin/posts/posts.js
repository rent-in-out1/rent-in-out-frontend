import React, { useEffect, useState } from "react";
import { doGetApiMethod } from "../../../services/service";
import { Wrapper } from "../../../components/style/wrappers/table";
import SinglePost from "./singlePost";


const Posts = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [posts, setPosts] = useState([]);
  const [isChange , setIsChange] = useState(false);
  
  const getAllposts = async () => {
    let url = "/posts";
    const { data } = await doGetApiMethod(url);
    setPosts(data);
    setIsChange(false)
  };
  useEffect(() => {
    setIsLoading(true)
    getAllposts()
    setIsLoading(false)
  }, [isChange]);

  return (
    <>
        <Wrapper>
          <h1>Posts</h1>
          <div className="flex justify-center">
            <table>
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Created by</th>
                  <th>location</th>
                  <th>category</th>
                  <th>created at</th>
                  <th>updated at</th>
                  <th>availability</th>
                  <th>active</th>
                  <th>delete</th>
                </tr>
              </thead>
              <tbody>
                {posts.map((post) => (
                  <SinglePost key={post._id} item={post} setIsChange={setIsChange} />
                ))}
              </tbody>
            </table>
          </div>
        </Wrapper>
    </>
  );
};

export default Posts;
