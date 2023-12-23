import React from "react";
import { useNavigate } from "react-router-dom";
import RentCard from "../../../../../shared/components/rentCard";
import Categories from "../../../../../assets/icons/categories";
import { isNumberEmpty } from "../../../../../util/functions";

const CategoriesWizard = ({ count }) => {
  const nav = useNavigate();

  return (
    <RentCard
      styleClass={`cursor-pointer`}
      isColored={!isNumberEmpty(count)}
      bottomColor={"#82ca9d"}
    >
      {!isNumberEmpty(count) ? (
        <div
          onClick={() => nav("/admin/categories")}
          className="flex items-center"
        >
          <div className="w-3/4">
            <h2 className="py-3 font-semibold">{count}</h2>
            <h2>Total Categories</h2>
          </div>
          <div className="w-1/4">
            <Categories width="64px" height="64px" color={"#82ca9d"} />
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center h-full">no data</div>
      )}
    </RentCard>
  );
};

export default CategoriesWizard;
