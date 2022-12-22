import { useScroll } from "../../hooks/useScroll";
import React, { useState, useEffect, useRef } from "react";
import { doGetApiMethod } from "../../services/service";
import Card from "../card";
import Loader from "../loader";
import { useDispatch, useSelector } from "react-redux";
import { clearPosts, getPosts } from "../../redux/features/postsSlice";
import Controllers from "./../controllers/controllers";
import MultiRangeSlider from "../UI/multiRangeSlider/MultiRangeSlider";
import CreatePost from "../createPost/createPost";

const Main = () => {
  const dispatch = useDispatch();
  const { posts, loading } = useSelector((state) => state.postsSlice);
  const { user } = useSelector((state) => state.userSlice);
  const [search, setSearch] = useState("");
  const [onAdd, setOnAdd] = useState(false);
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
    setPage(1);
    dispatch(clearPosts());
    return () => {
      dispatch(clearPosts());
    };
  }, [search]);
  useEffect(() => {
    dispatch(
      getPosts({ search, option, page, minP, maxP, endScreenEnd, setPage })
    );
  }, [endScreen]);
  return (
    <React.Fragment>
      <main className="min-h-screen p-1 md:p-3 text-center justify-center">
        {user && (
          <div className="bg-white p-3 space-x-1 md:w-10/12 w-full mx-auto rounded-xl drop-shadow-xlfixed top-2 left-2">

            
            {!onAdd ? (
              <div className="flex justify-center mt-2 mb-8">
                <button
                  className="btn cursor-pointer bg-blue-400 opacity-50 rounded-full w-1/2 md:w-1/6 inline-block px-2 py-3 font-semibold leading-tight hover:text-white hover:bg-blue-600"
                  type="button"
                  onClick={() => setOnAdd(true)}
                >
                  Add New Post
                </button>
              </div>
            ) :
             <CreatePost />}
            {onAdd ? (
              <div className="flex justify-center mt-2 mb-8">
                <button
                  className="btn cursor-pointer bg-blue-400 opacity-50 rounded-full w-1/2 md:w-1/6 inline-block px-2 py-3 font-semibold leading-tight hover:text-white hover:bg-blue-600"
                  type="button"
                  onClick={() => setOnAdd(false)}
                >
                  Cancel
                </button>
              </div>
            ) :null }
            <Controllers
              title={""}
              placeHolder={"Posts"}
              options={options}
              setSearch={setSearch}
              setOption={setOption}
            />
            {/* <div className="flex items-center justify-center">
              <MultiRangeSlider
                min={0}
                max={1000}
                onChange={({ min, max }) => {
                  setMax(max);
                  setMin(min);
                }}
              />
            </div> */}
          </div>
        )} */}
        <div
          id="posts"
          className="flex flex-wrap mx-auto mt-3 justify-between px-1"
        >
          {posts &&
            posts?.map((post, i) => (
              <div key={post?._id} className="md:w-1/2 w-full flex">

                <Card post={post} key={i} />
              </div>
            ))}
        </div>
        {/* {loading && (
          <div className="flex items-center justify-center min-h-40">
            <Loader width={"200px"} height={"200px"} />
          </div>
        )} */}
      </main>
    </React.Fragment>
  );
};

export default Main;
