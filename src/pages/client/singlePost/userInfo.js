import React, { useState } from "react";
import UserRating from "./userRating";
import Telephone from './../../../assets/icons/telephone';

const UserInfo = ({owner ,rank , post , isChange , setIsChange}) => {
    const [show, setIsShow] = useState(true);
  return (
    <div className="user-header capitalize mb-2 border p-2 relative">
      <h2 className="text-center">publisher Info</h2>
      <div className="">
        <ul className="relative leading-8 ">
          <li>
            {owner?.country}, {owner?.city}
          </li>
          <li>
            active since:{" "}
            {new Date(owner?.createdAt).toLocaleDateString()}
          </li>
          <li>
            email:{" "}
            <span className="lowercase">
              <a className="hover:underline" href="#">
                {owner?.email}
              </a>
            </span>
          </li>
        </ul>
        <button
          onClick={() => setIsShow(!show)}
          className="w-3/12 h-1/2 absolute top-4 right-10 "
        >
          {show ? (
            <span className="flex flex-col items-center justify-center">
              <Telephone color="gray" width="30px" height="30px" className="text-center" />
              <small className="text-red-400">Show</small>
            </span>
          ) : (
            <span className="flex flex-col items-center justify-center">
              <a href="#" className="hover:underline">
                {owner.phone}
              </a>
              <small className="text-green-400">Hide</small>
            </span>
          )}
        </button>
      </div>
      <UserRating
        rank={rank}
        post={post}
        isChange={isChange}
        setIsChange={setIsChange}
      />
    </div>
  );
};

export default UserInfo;
