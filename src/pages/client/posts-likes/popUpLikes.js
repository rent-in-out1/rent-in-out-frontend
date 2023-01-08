import React from "react";
import { onLikesToggle } from "../../../redux/features/toggleSlice";
import PopUPModel from "../../../shared/UI/popup/popUpModel";
import SingleLike from "./singleLike";

const PopUpLikes = ({ likesArr }) => {
  
  return (
    <PopUPModel action={onLikesToggle}>
      <ul className="dropdown overflow-y-scroll max-h-96 w-full mb-3 flex flex-col">
        {likesArr?.map((item) => {
          return (
            <SingleLike key={item._id} item={item} action={onLikesToggle}/>
          );
        })}
      </ul>
    </PopUPModel>
  );
};

export default PopUpLikes;