import { useScroll } from "../../hooks/useScroll";
import React, { useState, useEffect, useRef } from "react";
import { doGetApiMethod } from "../../services/service";
import Card from "../card";
import Loader from "../loader";
import { useDispatch, useSelector } from "react-redux";
import { clearPosts, getPosts } from "../../redux/features/postsSlice";
import Controllers from "./../controllers/controllers";
import MultiRangeSlider from "../UI/multiRangeSlider/MultiRangeSlider";
import CreatePost from '../createPost/createPost'


const Main = () => {
  const dispatch = useDispatch();
  const { posts, loading } = useSelector((state) => state.postsSlice);
  const { user } = useSelector((state) => state.userSlice);
    const [search, setSearch] = useState("");
  const [maxP, setMax] = useState();
  const [minP, setMin] = useState();
  const [option, setOption] = useState();
  const [page, setPage] = useState(1);
  const [endScreen, endScreenEnd] = useScroll(900);
  const options = [
    { name: "Category", value: "category_url" },
    { name: "Country", value: "country" },
    { name: "City", value: "city" },
    { name: "City", value: "city" },
    { name: "City", value: "city" },
  ];

  useEffect(() => {
    setPage(1)
    dispatch(clearPosts())
    return () => {
      dispatch(clearPosts())
    }
  }, [search])
  useEffect(() => {
    dispatch(getPosts({ search, option, page, minP, maxP, endScreenEnd, setPage }))
  }, [endScreen]);
  return (
    <React.Fragment>
      <main className="min-h-screen p-1 md:p-3 text-center justify-center">
        {user && <div className="bg-white p-3 space-x-1 md:w-10/12 w-full mx-auto rounded-xl drop-shadow-xl">
          <CreatePost />
          <Controllers
            title={""}
            placeHolder={"Posts"}
            options={options}
            setSearch={setSearch}
            setOption={setOption}
          />
          <div className="flex items-center justify-center">
            <MultiRangeSlider min={0} max={1000}
              onChange={({ min, max }) => {
                setMax(max)
                setMin(min)
              }}
            />
          </div>
        </div>}
        <div>
          <div id="posts" className="flex flex-wrap">
            {posts &&
              posts?.map((post, i) => (
                <div key={post?._id} className="w-1/2">
                  <Card post={post} key={i} />
                </div>
              ))}
          </div>
        </div>
        {loading && (
            <div className="flex items-center justify-center min-h-40">
              <Loader width={"200px"} height={"200px"} />
            </div>
          )}
      </main>
    </React.Fragment>
  );
};

export default Main;
