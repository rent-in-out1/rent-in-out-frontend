import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "./footerAdmin";
import Header from "./headerAdmin";

const LayoutAdmin = () => {
  return (
    <div>
      <Header />
      <Outlet />
    </div>
  );
};

export default LayoutAdmin;
