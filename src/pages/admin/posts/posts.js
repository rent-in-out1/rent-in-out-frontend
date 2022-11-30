import React, { useEffect, useState } from "react";
import { doGetApiMethod } from "../../../services/service";
import { Wrapper } from "../../../components/style/wrappers/table";
import SinglePost from "./singlePost";
import Controllers from "../../../components/controllers/controllers";


const Posts = () => {
  const [search, setSearch] = useState("");
  const [option, setOption] = useState();
  const [posts, setPosts] = useState([]);
  const [isChange, setIsChange] = useState(false);
  const options =
    [{ name: "Title", value: "title" },
    { name: "Rent duration", value: "range" },
    { name: "Location", value: "location" },
    { name: "Active", value: "active" }]

  const getAllposts = async () => {
    let url = `/posts/search/?s=${search}&sort=${option}`;
    const { data } = await doGetApiMethod(url);
    setPosts(data);
    setIsChange(false)
  };
  useEffect(() => {
    getAllposts()
  }, [isChange, search, option]);

  return (
    <React.Fragment>
      <Wrapper>
        <Controllers title={"posts list"} options={options} setSearch={setSearch} setOption={setOption} />
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
    </React.Fragment>
  );
};

export default Posts;
