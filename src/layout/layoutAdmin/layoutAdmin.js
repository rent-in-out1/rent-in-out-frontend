import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./headerAdmin";
import Sidebar from "../../components/sideBar";
import SideBarChat from "./../../components/sideBarChat/sideBarChat";
import { useSelector } from "react-redux";

const LayoutAdmin = () => {
  let { user } = useSelector((state) => state.userSlice);
  return (
    <React.Fragment>
      <Header />
      <div className="bg-gray-100 flex">
        <div className="lg:w-3/12 hidden lg:flex">
          <Sidebar />
        </div>
        <div className="bg-gray-100 md:w-9/12 lg:w-7/12 ">
          <Outlet />
        </div>
        {user ? (
          <div className="hidden md:flex md:w-3/12 lg:w-2/12">
            <SideBarChat />
          </div>
        ) : null}
      </div>
    </React.Fragment>
  );
};

export default LayoutAdmin;
