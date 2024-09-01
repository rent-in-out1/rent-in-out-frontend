import React, { useState } from "react";
import ExitFill from "../../../assets/icons/exitFill";

export const ImagePreview = ({ id, src, alt, onDeleteImg }) => {
  const [isCloseShown, setIsCloseShown] = useState(false);

  return (
    <div
      onMouseEnter={() => setIsCloseShown(true)}
      onMouseLeave={() => setIsCloseShown(false)}
      className="relative w-[150px]"
      style={{ margin: 0 }}
    >
      {isCloseShown && (
        <span
          className="absolute -right-2 -top-2 cursor-pointer"
          onClick={() => onDeleteImg(id)}
        >
          <ExitFill color="#333333" className="rounded-full" />
        </span>
      )}
      <img className="w-full rounded-2xl" src={src} alt={alt} />
    </div>
  );
};
