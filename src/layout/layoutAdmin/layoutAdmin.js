import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./headerAdmin";
import Sidebar from "../../components/sideBar";
import SideBarChat from "../../components/sideBarChat/sideBarChat";

const LayoutAdmin = () => {
  return (
    <div className="bg-gray-100">
      <Header />
      <Sidebar />
      <div className="lg:w-9/12 ml-auto">
        <Outlet />
      </div>
      <div className="hidden md:flex md:w-3/12 lg:w-2/12">
        <SideBarChat />
      </div>
    </div>
  );
};

export default LayoutAdmin;
