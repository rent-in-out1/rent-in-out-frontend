import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./headerAdmin";
import Sidebar from '../../components/sideBar'

const LayoutAdmin = () => {
  return (
    <div className='bg-gray-100'>
      <Header/>
      <Sidebar />
      <div className='lg:w-9/12 ml-auto'>
      <Outlet />
      </div>
    </div>
  );
};

export default LayoutAdmin;
