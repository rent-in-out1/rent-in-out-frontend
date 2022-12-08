import { useScroll } from "../../hooks/useScroll";
import React, { useState, useEffect, useRef } from "react";
import { doGetApiMethod } from "../../services/service";
import Card from "../card";
import Loader from "../loader";
import { useDispatch, useSelector } from "react-redux";
import { clear, onLoad } from "../../redux/features/postsSlice";
import Controllers from "./../controllers/controllers";
import MultiRangeSlider from "../UI/multiRangeSlider/MultiRangeSlider";

const Main = () => {
  const dispatch = useDispatch();
  const { posts } = useSelector((state) => state.postsSlice);
  const [search, setSearch] = useState("");
  const [option, setOption] = useState();
  const [countPosts, setCountPosts] = useState(0);
  const [page, setPage] = useState(1);
  const [endScreen, endScreenEnd] = useScroll(900);
  const [isChange, setIsChange] = useState(false);
  const [firstLoad, setFirstLoad] = useState(true);
  const options = [
    { name: "Category", value: "category_url" },
    { name: "Country", value: "country" },
    { name: "City", value: "city" },
    { name: "City", value: "city" },
    { name: "City", value: "city" },
  ];

  /** check first how many posts */
  useEffect(() => {
    countP();
  }, []);
  useEffect(() => {
    if (!firstLoad && endScreen && Math.ceil(countPosts / 10) >= page)
      setPage(page + 1);
    setFirstLoad(false);
  }, [endScreen]);

  useEffect(() => {
    doApi();
  }, [page]);
  /** count all the posts */
  const countP = async () => {
    let { data } = await doGetApiMethod("/posts/count");
    setCountPosts(data.count);
  };
  const doApi = async () => {
    // console.log(page)
    if (isChange) {
      document.querySelector("#posts").innerHTML = "";
    }
    let url_posts = `/posts/search/?s=${search}&sort=${option}&page=${page}`;
    let { data } = await doGetApiMethod(url_posts);
    if (!isChange) dispatch(onLoad([...posts, ...data]));
    endScreenEnd();
    setIsChange(false);
  };
  return (
    <React.Fragment>
      <main className="w-full min-h-screen p-1 md:p-3 text-center justify-center">
        <Controllers
          title={""}
          placeHolder={"Posts"}
          options={options}
          setSearch={setSearch}
          setOption={setOption}
        />
        <div className="flex items-center justify-center">
          <div className="">
          <MultiRangeSlider
            min={0}
            max={1000}
            onChange={({ min, max }) =>
              console.log(`min = ${min}, max = ${max}`)
            }
          />
          </div>
        </div>
        <div id="posts" className="flex flex-wrap">
          {posts &&
            posts.map((post, i) => (
              <div key={post._id} className="w-1/2">
                <Card post={post} key={i} setIsChange={setIsChange} />
              </div>
            ))}
        </div>
        {endScreen && Math.ceil(countPosts / 10) >= page + 1 && (
          <div className="flex items-center justify-center min-h-40">
            <Loader width={"200px"} height={"200px"} />
          </div>
        )}
      </main>
    </React.Fragment>
  );
};

export default Main;
