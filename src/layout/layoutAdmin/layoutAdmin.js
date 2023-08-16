import React from "react";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import Sidebar from "../../shared/components/sideBar";
import SideBarChat from "../../shared/components/sideBarChat/sideBarChat";
import Header from "./headerAdmin";

const LayoutAdmin = () => {
    let {user} = useSelector((state) => state.userSlice);
    return (
        <React.Fragment>
            <Header/>
            <div className="bg-gray-100 flex">
                <div className="xl:w-2/12 hidden xl:flex">
                    <Sidebar/>
                </div>
                <div className="bg-gray-100 xl:w-8/12 w-full xl:ml-12 xl:-mr-4 xl:pl-6 xl:pr-3">
                    <Outlet/>
                </div>
                {user ? (
                    <div className="xl:w-2/12 hidden xl:flex pr-6 mx-6">
                        <SideBarChat/>
                    </div>
                ) : null}
            </div>
        </React.Fragment>
    );
};

export default LayoutAdmin;
