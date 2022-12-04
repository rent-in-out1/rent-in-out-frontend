import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./headerAdmin";
import Sidebar from '../../components/sideBar'

const LayoutAdmin = () => {
  return (
    <React.Fragment>
      <Header/>
      <Sidebar />
      <div className='lg:w-10/12 ml-auto'>
      <Outlet />
      </div>
    </React.Fragment>
  );
};

export default LayoutAdmin;
