import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Bell from "../../../assets/icons/bell";
import Dashboard from "../../../assets/icons/dashboard";
import Inbox from "../../../assets/icons/inbox";
import Profile from "../../../assets/icons/profile";
import Search from "../../../assets/icons/search";
import SignIn from "../../../assets/icons/signIn";
import SignOut from "../../../assets/icons/signOut";
import WishList from "../../../assets/icons/wishlist";
import { Logo, Wrapper } from "../../../assets/styles/wrappers/navbarUser";
import {
    onInboxToggle,
    onLogout,
    onRegisterShow,
    onSearchToggle,
} from "../../../redux/features/toggleSlice";
import { secret } from '../../../services/secrets';

const Header = () => {
    const nav = useNavigate();
    const dispatch = useDispatch();
    const isLogin = useSelector((state) => state.userSlice?.user !== null);
    const { user } = useSelector((state) => state.userSlice);
    const [isOpen, setIsOpen] = useState(false);
    useEffect(() => {
        window.addEventListener("scroll", () => closeNav());
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
                                        <div
                                            className="z-10 inline-flex absolute -top-1 -right-2 justify-center items-center w-5 h-5 text-xs font-bold text-white bg-red-500 rounded-full">
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
                                        <div
                                            className="z-10 inline-flex absolute -top-1 -right-2 justify-center items-center w-5 h-5 text-xs font-bold text-white bg-red-500 rounded-full">
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
                            alt=""
                        />
                        <span
                            className={`${isLogin ? "bg-green-400" : "bg-red-400"
                                } bottom-0 left-7 absolute  w-3.5 h-3.5 border-2 border-white dark:border-gray-800 rounded-full`}
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
                            <li
                                onClick={() => {
                                    closeNav();
                                    nav("/");
                                }}
                                className={`w-full p-2 rounded transition ease-in-out delay-150 cursor-pointer`}
                            >
                                <div className="flex justify-between items-center">
                                    <p>Home</p> <Dashboard color="black" />
                                </div>
                            </li>
                            <li
                                onClick={() => {
                                    closeNav();
                                    nav("/profile");
                                }}
                                className={`w-full p-2 rounded transition ease-in-out delay-150 cursor-pointer`}
                            >
                                <div className="flex justify-between items-center">
                                    <p>Profile</p> <Profile color="black" />
                                </div>
                            </li>
                            <li
                                className={`w-full p-2 rounded transition ease-in-out delay-150 cursor-pointer hover:bg-blue-200`}
                            >
                                <Link
                                    className="flex justify-between items-center"
                                    to={user?.role === "admin" ? "/admin/wishlist" : "/wishlist"}
                                >
                                    <span>Wish List</span>
                                    <WishList />
                                </Link>
                            </li>
                        </React.Fragment>
                    )}

                    <li
                        onClick={() => dispatch(onSearchToggle())}
                        className={`w-full p-2 rounded transition ease-in-out delay-150 cursor-pointer hover:bg-blue-200`}
                    >
                        <div className="flex justify-between items-center cursor-pointer">
                            <span>Search</span>
                            <Search />
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
                                {" "}
                                <p>Signout</p> <SignOut color="black" />
                            </div>
                        ) : (
                            <div className="flex justify-between items-center">
                                <p>Signin</p> <SignIn />
                            </div>
                        )}
                    </li>
                </ul>
            )}
        </Wrapper>
    );
};
export default Header;
