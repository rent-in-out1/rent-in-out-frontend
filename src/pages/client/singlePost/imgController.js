import React, { useState } from "react";
import ArrowLeft from './../../../assets/icons/arrowLeft';
import ArrowRight from './../../../assets/icons/arrowRight';

const ImgController = ({ post }) => {
  const [image, setImage] = useState(0);
  const nextImg = () => {
    if (image + 1 > post.img.length -1) return setImage(0);
    setImage(image + 1);
  };
  const prevImg = () => {
    if (image - 1 < 0) return setImage(post.img.length - 1);
    setImage(image - 1);
  };
  return (
    <div className="images-carousel">
      <div className="controllers">
        <span onClick={() => prevImg()} className="cursor-pointer ml-1">
          <ArrowLeft
            width="100px"
            height="100px"
            color="rgba(238, 238, 238, 0.419)"
          />
        </span>
        <span onClick={() => nextImg()} className="cursor-pointer mr-1">
          <ArrowRight
            width="100px"
            height="100px"
            color="rgba(238, 238, 238, 0.419)"
          />
        </span>
      </div>
      <img src={post?.img[image].url} alt="post image" />
    </div>
  );
};

export default ImgController;
