import React, { useEffect, useState } from "react";
import { doGetApiMethod } from "../../../services/service";
import { Wrapper } from "../../../components/style/wrappers/table";
import SinglePost from "./singlePost";

const Posts = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [posts, setPosts] = useState([]);

  const getAllposts = async () => {
    let url = "/posts";
    const { data } = await doGetApiMethod(url);
    setPosts(data);
    console.log(posts)
  };
  useEffect(() => {
    getAllposts()
    
  }, []);

  return (
    <>
      {!isLoading ? (
        <Wrapper>
          <h1>Posts List</h1>
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
                  <SinglePost key={post._id} item={post} />
                ))}
              </tbody>
            </table>
          </div>
        </Wrapper>
      ) : <h2>Loading.....</h2>}
    </>
  );
};

export default Posts;
