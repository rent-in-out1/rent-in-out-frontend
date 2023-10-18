import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { onLogout, onRegisterShow, onSearchToggle } from "../../../redux/features/toggleSlice";

//style
import { Wrapper } from "../../../assets/styles/wrappers/sideBar";

// icons import
import Dashboard from "../../../assets/icons/dashboard";
import Home from '../../../assets/icons/home';
import Notifications from "../../../assets/icons/notifications";
import Profile from "../../../assets/icons/profile";
import Search from "../../../assets/icons/search";
import SignOut from "../../../assets/icons/signOut";
import WishList from "../../../assets/icons/wishlist";
import { secret } from '../../../util/secrets';
import CircleBadge from "../circleBadge";

const SideBar = () => {
    const dispatch = useDispatch();
    const isLogin = useSelector((state) => state.userSlice?.user !== null);
    const { user, wishList } = useSelector((state) => state.userSlice);
    return (
        <Wrapper
            className="lg:w-2/12 z-10 p-1 top-16 -left-1 lg:fixed"
            aria-label="Sidebar"
        >
            <div className="overflow-y-auto py-4 mt-4 px-3 w-full bg-white shadow-xl rounded">
                <ul className="space-y-2">
                    <li>
                        <Link to={user?.role === "admin" ? "/admin" : "/"}>
                            <Dashboard />
                            <span className="ml-3">Dashboard</span>
                        </Link>
                    </li>
                    {user?.role === "admin" ? (
                        <li>
                            <Link to="/admin/home">
                                <Home color={"#6B7280"} />
                                <span className="ml-3">Home Admin</span>
                            </Link>
                        </li>
                    ) : null}
                    <li onClick={() => dispatch(onSearchToggle())}>
                        <Link to={'/'}>
                            <Search color={"#6B7280"} />
                            <span className="ml-3">Search</span>
                        </Link>
                    </li>
                    {isLogin && (
                        <React.Fragment>
                            <li>
                                <Link
                                    to={user?.role === "admin" ? "/admin/profile" : "/profile"}
                                >
                                    <Profile />
                                    <span className="flex-1 ml-3">Profile</span>
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to={user?.role === "admin" ? "/admin/wishlist" : "/wishlist"}
                                >
                                    <WishList color={"#6B7280"} />
                                    <span className="flex-1 ml-3">Wish List</span>
                                    <CircleBadge count={wishList?.length} />
                                </Link>
                            </li>
                            <li>
                                <Link to={user?.role === "admin" ? "/admin" : "/"}>
                                    <Notifications />
                                    <span className="flex-1 ml-3">Notifications</span>
                                    <CircleBadge count={2} />
                                </Link>
                            </li>
                        </React.Fragment>
                    )}
                </ul>
                <ul className="pt-4 mt-4 space-y-2 border-t border-gray-200">
                    <li
                        className={`w-full p-2 rounded cursor-pointer`}
                        onClick={() => {
                            if (isLogin) {
                                localStorage.removeItem("token");
                                window.open(secret.CLIENT_API_URL, "_self");
                                dispatch(onLogout());
                            } else {
                                dispatch(onRegisterShow());
                            }
                        }}
                    >
                        <span className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg hover:bg-gray-100">
                            <SignOut />
                            <span className="flex-1 ml-3">
                                {isLogin ? "Sign Out" : "Sign In"}
                            </span>
                        </span>
                    </li>
                </ul>
            </div>
        </Wrapper>
    );
};

export default SideBar;
