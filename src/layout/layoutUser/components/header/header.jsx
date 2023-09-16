import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Bell from "../../../../assets/icons/bell";
import Dashboard from "../../../../assets/icons/dashboard";
import Inbox from "../../../../assets/icons/inbox";
import Profile from "../../../../assets/icons/profile";
import Search from "../../../../assets/icons/search";
import SignIn from "../../../../assets/icons/signIn";
import SignOut from "../../../../assets/icons/signOut";
import WishList from "../../../../assets/icons/wishlist";
import { Logo, Wrapper } from "../../../../assets/styles/wrappers/navbarUser";
import {
    onInboxToggle,
    onLogout,
    onRegisterShow,
    onSearchToggle,
} from "../../../../redux/features/toggleSlice";
import { secret } from '../../../../util/secrets';
import FilterPosts from "../../../../views/client/filterPosts/filterPosts";

const Header = () => {
    const nav = useNavigate();
    const dispatch = useDispatch();
    const isLogin = useSelector((state) => state.userSlice?.user !== null);
    const { user } = useSelector((state) => state.userSlice);
    const [isOpen, setIsOpen] = useState(false);
    useEffect(() => {
        window.addEventListener("scroll", () => closeNav());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    let timeOut;
    const openNav = () => {
        clearTimeout(timeOut);
        setIsOpen(true);
    };
    const closeNav = () => {
        timeOut = setTimeout(() => {
            setIsOpen(false);
        }, 100);
    };

    const openFilterPostsModal = (e) => {
        e.stopPropagation();
        dispatch(onPostSearchToggle());
    };

    return (
        <Wrapper className="drop-shadow-xl">
            <section>
                <div className="left flex flex-wrap">
                    <Link to={"/"}>
                        <Logo>
                            <img src="/img/LOGO.png" alt="logo" />
                            <p>rentInOut</p>
                        </Logo>
                    </Link>
                </div>
                <div className="right">
                    <div className="hidden md:block">
                        <FilterPosts />
                    </div>
                    <nav className="md:hidden block">
                        {isLogin && (
                            <ul>
                                <li onClick={() => dispatch(onInboxToggle())}>
                                    <button
                                        type="button"
                                        className="inline-flex relative items-center p-3 text-sm  text-center"
                                    >
                                        <Inbox color="black" width="20" height="20" />
                                        <span className="sr-only">Notifications</span>
                                        <div className="z-10 inline-flex absolute -top-1 -right-2 justify-center items-center w-5 h-5 text-xs font-bold text-white bg-red-500 rounded-full">
                                            1
                                        </div>
                                    </button>
                                </li>
                                <li>
                                    <button
                                        type="button"
                                        className="inline-flex relative items-center p-3 text-sm  text-center"
                                    >
                                        <Bell />
                                        <span className="sr-only">Notifications</span>
                                        <div className="z-10 inline-flex absolute -top-1 -right-2 justify-center items-center w-5 h-5 text-xs font-bold text-white bg-red-500 rounded-full">
                                            2
                                        </div>
                                    </button>
                                </li>
                            </ul>
                        )}
                    </nav>
                    <div
                        className="relative avatar"
                        onMouseLeave={() => closeNav()}
                        onClick={() => {
                            isOpen ? closeNav() : openNav();
                        }}
                    >
                        <img
                            className="rounded-full"
                            src={
                                user !== null && user?.active
                                    ? user.profile_img?.url || user?.profile_img
                                    : "https://freesvg.org/img/Male-Avatar.png"
                            }
                            alt="profile"
                        />
                        <span
                            className={`${isLogin ? "bg-green-400" : "bg-red-400"
                                } bottom-0 left-7 absolute  w-3.5 h-3.5 border-2 border-white rounded-full`}
                        ></span>
                    </div>
                </div>
            </section>
            {isOpen && (
                <ul
                    onMouseOver={() => openNav()}
                    onMouseLeave={() => closeNav()}
                    className="absolute dropdown transition shadow bg-white z-50 w-full rounded-b right-0 -top-15 md:w-1/4 md:-bottom-30"
                >
                    {isLogin && (
                        <React.Fragment>
                            {/* dashborad */}
                            <li
                                onClick={() => {
                                    closeNav();
                                    nav("/");
                                }}
                                className={`w-full p-2 rounded transition ease-in-out delay-150 cursor-pointer`}
                            >
                                <div className="flex justify-between items-center">
                                    <span>Home</span>
                                    <span className="pr-1">
                                        <Dashboard color="black" />
                                    </span>
                                </div>
                            </li>
                            {/* profile */}
                            <li
                                onClick={() => {
                                    closeNav();
                                    nav("/profile");
                                }}
                                className={`w-full p-2 rounded transition ease-in-out delay-150 cursor-pointer`}
                            >
                                <div className="flex justify-between items-center">
                                    <span>Profile</span>
                                    <span className="pr-1">
                                        <Profile color="black" />
                                    </span>
                                </div>
                            </li>
                            {/* wish list */}
                            <li
                                className={`w-full p-2 rounded transition ease-in-out delay-150 cursor-pointer hover:bg-blue-200`}
                            >
                                <Link
                                    className="flex justify-between items-center"
                                    to={user?.role === "admin" ? "/admin/wishlist" : "/wishlist"}
                                >
                                    <span>Wish List</span>
                                    <span className="pr-1">
                                        <WishList />
                                    </span>
                                </Link>
                            </li>
                        </React.Fragment>
                    )}
                    {/* filter posts */}
                    <li
                        onClick={(e) => openFilterPostsModal(e)}
                        className="block md:hidden w-full p-2 rounded transition ease-in-out delay-150 cursor-pointer hover:bg-blue-200"
                    >
                        <div className="flex justify-between items-center cursor-pointer">
                            <span>Filter Posts</span>
                            <span className="pr-1">
                                <Search />
                            </span>
                        </div>
                    </li>
                    {/* search users */}
                    <li
                        onClick={(e) => openFilterPostsModal(e)}
                        className="block w-full p-2 rounded transition ease-in-out delay-150 cursor-pointer hover:bg-blue-200"
                    >
                        <div className="flex justify-between items-center cursor-pointer">
                            <span>Search User</span>
                            <span className="pr-1">
                                <Profile color="black" />
                            </span>
                        </div>
                    </li>
                    <li
                        onClick={() => {
                            if (isLogin) {
                                localStorage.removeItem("token");
                                window.open(secret.CLIENT_API_URL, "_self");
                                dispatch(onLogout());
                                closeNav();
                            } else {
                                dispatch(onRegisterShow());
                                closeNav();
                            }
                        }}
                        className={`w-full p-2 rounded cursor-pointer`}
                    >
                        {isLogin ? (
                            <div className="flex justify-between items-center">
                                <span>Signout</span>
                                <span className="pr-1">
                                    <SignOut color="black" />
                                </span>
                            </div>
                        ) : (
                            <div className="flex justify-between items-center">
                                <span>Signin</span>
                                <span className="pr-1">
                                    <SignIn />
                                </span>
                            </div>
                        )}
                    </li>
                </ul>
            )}
        </Wrapper>
    );
};
export default Header;
