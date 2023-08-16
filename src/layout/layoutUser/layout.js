import React from 'react';
import { useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
import Sidebar from '../../shared/components/sideBar';
import SideBarChat from '../../shared/components/sideBarChat/sideBarChat';
import Footer from './footer/footer';
import Header from './header';


const Layout = () => {
    let { user } = useSelector((state) => state.userSlice);
    return (
        <React.Fragment>
            <Header />
            <div className='bg-gray-100 flex'>
                <div className="xl:w-2/12 hidden xl:flex">
                    <Sidebar />
                </div>
                <div className="bg-gray-100 lg:w-8/12 w-full lg:ml-12 lg:-mr-4  lg:pl-6 lg:pr-3">
                    <Outlet />
                </div>
                {user ? (
                    <div className="lg:w-2/12 hidden lg:flex pr-6">
                        <SideBarChat />
                    </div>
                ) : null}
            </div>
            <Footer className="mt-7" />
        </React.Fragment>
    );
};

export default Layout;