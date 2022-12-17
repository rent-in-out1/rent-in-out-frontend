import React, { useEffect, useState } from "react";
import { doGetApiMethod } from "../../../services/service";
import { Wrapper } from "../../../components/style/wrappers/table";
import SinglePost from "./singlePost";
import Controllers from "../../../components/controllers/controllers";
import PageNav from './../../../helpers/pageNav';


const Posts = () => {
  const [search, setSearch] = useState("");
  const [option, setOption] = useState();
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [isChange, setIsChange] = useState(false);
  const options =
    [{ name: "Title", value: "title" },
    { name: "Rent duration", value: "range" },
    { name: "Location", value: "location" },
    { name: "Active", value: "active" }]

  const getAllposts = async () => {
    let url = `/posts/search/?s=${search}&sort=${option}&page=${page}`;
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
        <PageNav urlPageApi={"/posts/count"} perPage={10} setPage={setPage} page={page} setIsChange={setIsChange} cssClass="flex justify-center justify-between p-3 items-center justify-center w-10/12 md:w-8/12 mx-auto"/>

        <div className="wrapper">
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
