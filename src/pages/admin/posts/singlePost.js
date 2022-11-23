import React, { useEffect } from "react";
import { BsTrash } from "react-icons/bs";
import { doApiMethod, doGetApiMethod } from "./../../../services/service";
import { useState } from "react";

const SinglePost = (props) => {
  const [creator, setCreator] = useState({});
  const post = props.item;
  useEffect(() => {
    getCreator();
    console.log();
  }, []);
  const getCreator = async () => {
    let url = "/users/info/" + post?.creator_id;
    let data = await doGetApiMethod(url);
    setCreator(data);
  };

  const changeActive = async (_id) => {
    const url = "/posts/changeActive/" + _id;
    let { data } = await doApiMethod(url, "PATCH");
  };
  const deletePost = async (_id, postName) => {
    if (window.confirm(`Are you sure you want to delete ${postName}`)) {
      const url = "/posts/" + _id;
      let { data } = await doApiMethod(url, "DELETE");
    }
  };

  return (
    <tr>
      <td>
        <div className="flex items-center">
          <div className="flex-shrink-0 w-8 h-8">
            <img
              className="w-full h-full rounded-full"
              src={post?.img}
              alt={post?.img}
            />
          </div>
          <div className="ml-3">
            <p className="text-gray-900 whitespace-no-wrap">{post?.title}</p>
          </div>
        </div>
      </td>
      <td>
        <p className="btn relative inline-block px-2 py-1 font-semibold  leading-tight cursor-pointer text-gray-900 whitespace-no-wrap hover:border rounded-full color-red">
          {creator.data?.userInfo.fullName.firstName}{" "}
          {creator.data?.userInfo.fullName.lastName}
        </p>
      </td>
      <td>
        <p className="text-gray-900 whitespace-no-wrap">{post?.location}</p>
      </td>
      <td>
        <p className="text-gray-900 whitespace-no-wrap">{post?.category_url}</p>
      </td>
      <td>
        <p className="text-gray-900 whitespace-no-wrap">
          {post?.createdAt.split("T")[0]}
        </p>
      </td>
      <td>
        <p className="text-gray-900 whitespace-no-wrap">
          {post?.updatedAt.split("T")[0]}
        </p>
      </td>
      <td>
        <p className="text-gray-900 whitespace-no-wrap">
          {post?.available_from.split("T")[0]}
        </p>
      </td>
      <td>
        <span
          onClick={() => {
            changeActive(post?._id);
            props.setIsChange(true);

          }}
          className="btn relative inline-block px-3 py-1 font-semibold leading-tight cursor-pointer"
        >
          <span
            aria-hidden
            className={
              post?.active
                ? "absolute inset-0 bg-green-200 opacity-50 rounded-full"
                : "absolute inset-0 bg-red-400 opacity-50 rounded-full"
            }
          ></span>
          <span className="relative">{String(post?.active)}</span>
        </span>
      </td>
      <td>
        <span
          onClick={() => {
            deletePost(post._id, post.title);
            props.setIsChange(true);
          }}
          className="btn relative cursor-pointer inline-block px-2 py-2 font-semibold leading-tight hover:text-red-900"
        >
          <span
            aria-hidden
            className={"absolute inset-0 bg-red-200 opacity-50 rounded-full"}
          ></span>
          <span className="relative">
            <BsTrash />
          </span>
        </span>
      </td>
    </tr>
  );
};

export default SinglePost;
