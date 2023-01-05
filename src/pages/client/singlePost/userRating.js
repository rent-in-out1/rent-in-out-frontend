import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Star from "../../../assets/icons/star";
import StarFill from "../../../assets/icons/starFill";
import { usePostCreator } from "../../../hooks/usePostCreator";
import { onRegisterShow } from "../../../redux/features/toggleSlice";
import {
  doApiMethod,
  successHandler,
  errorHandler,
} from "../../../services/axios-service/axios-service";

const UserRating = ({ rank, post, setIsChange, isChange }) => {
  const dispatch = useDispatch();
  const [fill, setFill] = useState(rank?.userRank - 1);
  const { user } = useSelector((state) => state.userSlice);
  const rankUser = async (rnk) => {
    if (!user){
        setFill(-1)
        dispatch(onRegisterShow());
    } 
    else {
      try {
        let url = `/users/rankUser/${post?.creator_id}`;
        await doApiMethod(url, "PATCH", { rnk });
        setIsChange(!isChange);
        successHandler("Rating updated");
      } catch (err) {
        setFill(-1)
        errorHandler(err.response.data.msg);
      }
    }
  };
  return (
    <div className="flex justify-between items-center border rounded-xl px-2 mt-1 mx-5">
      <h2>User Rating: {rank.average ? rank.average.toFixed(2) : "0"}</h2>
      <div className="flex flex-col text-center">
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
