import React from "react";
import { Wrapper } from "../style/wrappers/profiledit";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const nav = useNavigate();
  const { user } = useSelector((state) => state.userSlice);
  return (
    <Wrapper>
      <main
        className="cursor-pointer"
        onClick={() => {
          if (user.role === "admin") nav("/admin/profileEdit");
          else nav("/profileEdit");
        }}
      >
        <div className={"px-2"}>
          {user.fullName.firstName} {user.fullName.lastName}
        </div>
        <div>
          {" "}
          <i className="fa fa-pencil" aria-hidden="true"></i>
        </div>
      </main>
    </Wrapper>
  );
};

export default Profile;
