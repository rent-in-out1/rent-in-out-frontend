import React from "react";
import SingleLike from "./singleLike";

const Likes = ({ likesArr }) => {
  return (
    <React.Fragment>
      <h2 className="text-center">Post Likes</h2>
      <ul className="dropdown overflow-y-scroll p-3 h-full w-full mb-3 flex flex-col">
        {likesArr?.map((item) => {
          return <SingleLike key={item._id} item={item} />;
        })}
      </ul>
    </React.Fragment>
  );
};

export default Likes;
