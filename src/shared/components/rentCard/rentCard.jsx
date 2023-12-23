import React from "react";

const RentCard = ({
  children,
  styleClass,
  isColored = false,
  bottomColor = "",
  bottomContent,
}) => {
  return (
    <div
      className={`bg-white border hover:shadow-lg border-gray-200 rounded-lg ${styleClass}`}
    >
      <div className={`p-4 h-[calc(100%-16px)] w-full`}>{children}</div>
      {isColored && (
        <div
          className="h-4 w-full p-0 bg-slate-300 rounded-b-lg"
          style={{ background: bottomColor }}
        >
          {bottomContent && (
            <h3 className="text-center text-white">{bottomContent}</h3>
          )}
        </div>
      )}
    </div>
  );
};

export default RentCard;
