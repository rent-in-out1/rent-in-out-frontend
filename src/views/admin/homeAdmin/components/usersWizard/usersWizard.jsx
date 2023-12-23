import React from "react";
import RentCard from "../../../../../shared/components/rentCard";
import { useNavigate } from "react-router-dom";
import Users from "../../../../../assets/icons/users";
import { isNumberEmpty } from "../../../../../util/functions";

const UsersWizard = ({ count }) => {
  const nav = useNavigate();

  return (
    <RentCard
      styleClass={`cursor-pointer`}
      isColored={!isNumberEmpty(count)}
      bottomColor={"#8884d8"}
    >
      {!isNumberEmpty(count) ? (
        <div onClick={() => nav("/admin/users")} className="flex items-center">
          <div className="w-3/4">
            <h2 className="py-3 font-semibold">{count}</h2>
            <h2>Active Users</h2>
          </div>
          <div className="w-1/4">
            <Users width="64px" height="64px" color={"#8884d8"} />
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center h-full">no data</div>
      )}
    </RentCard>
  );
};

export default UsersWizard;
