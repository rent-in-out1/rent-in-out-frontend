import React, { useEffect, useState } from "react";
import { doGetApiMethod } from "../../../services/service";
import { Wrapper } from "../../../components/style/wrappers/table";
import SinglePost from "./singlePost";
import Loader from './../../../components/UI/Loader/Loader';
import SmallLoader from "../../../components/UI/Loader/SmallLoader";

const Posts = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [posts, setPosts] = useState([]);

  const getAllposts = async () => {
    let url = "/posts";
    const { data } = await doGetApiMethod(url);
    setPosts(data);
  };
  useEffect(() => {
    getAllposts()
    console.log(posts)
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
                  <th>location</th>
                  <th>location</th>
                  <th>hi</th>
                  <th>hi</th>
                  <th>hi</th>
                  <th>active</th>
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
