import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./headerAdmin";

const LayoutAdmin = () => {
  return (
    <React.Fragment>
      <Header />
      <Outlet />
    </React.Fragment>
  );
};

export default LayoutAdmin;
