import React, { useState } from "react";
import Star from "../../../assets/icons/star";
import StarFill from "../../../assets/icons/starFill";
import { doApiMethod } from "../../../services/axios-service/axios-service";

const UserRating = ({ rank , post}) => {
  const [fill, setFill] = useState(rank?.userRank);
  const rankUser= async(rnk) =>{
    console.log(rnk)
    let url = `/users/rankUser/${post?.creator_id}`
    // await doApiMethod(url, "PATCH" , {rnk})
  }
  return (
    <div className="flex justify-between items-center">
      <div>User Rating: {rank.average ? rank.average.toFixed(2) : "0"}</div>
      <div className="flex flex-col text-center mr-5">
        <small>Rate user</small>
        <div className="flex">
          {[...Array(fill + 1)].map((star, i) => {
            return (
              <span
                key={i}
                onClick={() => {
                  setFill(i - 1);
                  rankUser(i+1)
                }}
              >
                <StarFill />
              </span>
            );
          })}
          {[...Array(4 - fill)].map((star, i) => {
            return (
              <span
                key={i}
                onClick={() => {
                  setFill(fill + i + 1)
                  rankUser(fill+i)
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
