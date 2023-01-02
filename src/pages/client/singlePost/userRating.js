import React, { useState } from "react";
import Star from "../../../assets/icons/star";
import StarFill from "../../../assets/icons/starFill";
import { doApiMethod } from "../../../services/axios-service/axios-service";

const UserRating = ({ rank, post, setIsChange, isChange }) => {
  const [fill, setFill] = useState(rank?.userRank - 1);
  const rankUser = async (rnk) => {
    let url = `/users/rankUser/${post?.creator_id}`;
    await doApiMethod(url, "PATCH", { rnk });
    setIsChange(!isChange);
  };
  return (
    <div className="flex justify-between items-center">
      <h2>User Rating: {rank.average ? rank.average.toFixed(2) : "0"}</h2>
      <div className="flex flex-col text-center mr-5">
        <small>Rate user</small>
        <div className="flex">
          {[...Array(fill + 1)].map((star, i) => {
            return (
              <span
                className="cursor-pointer mr-1"
                key={i}
                onClick={() => {
                  setFill(i - 1);
                  rankUser(i);
                }}
              >
                <StarFill />
              </span>
            );
          })}
          {[...Array(4 - fill)].map((star, i) => {
            return (
              <span
                className="cursor-pointer mr-1"
                key={i}
                onClick={() => {
                  setFill(fill + i + 1);
                  rankUser(fill + i + 2);
                }}
              >
                <Star />
              </span>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default UserRating;
