import React from "react";
import {Outlet} from "react-router-dom";
import Header from "./headerAdmin";
import Sidebar from "../../shared/components/sideBar";
import SideBarChat from "../../shared/components/sideBarChat/sideBarChat";
import {useSelector} from "react-redux";

const LayoutAdmin = () => {
    let {user} = useSelector((state) => state.userSlice);
    return (
        <React.Fragment>
            <Header/>
            <div className="bg-gray-100 flex">
                <div className="lg:w-2/12 hidden lg:flex">
                    <Sidebar/>
                </div>
                <div className="bg-gray-100 lg:w-8/12 w-full lg:ml-12 lg:-mr-4 lg:pl-6 lg:pr-3">
                    <Outlet/>
                </div>
                {user ? (
                    <div className="lg:w-2/12 hidden lg:flex pr-6 mx-6">
                        <SideBarChat/>
                    </div>
                ) : null}
            </div>
        </React.Fragment>
    );
};

export default LayoutAdmin;
