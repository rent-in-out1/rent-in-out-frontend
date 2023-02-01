import React, {useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {
    onInboxToggle,
    onRegisterToggle,
    onSearchToggle,
} from "../../../redux/features/toggleSlice";
import {Logo, Wrapper} from "../../../assets/styles/wrappers/navbarAdmin";
import {useSelector, useDispatch} from "react-redux";
import {onLogout} from "../../../redux/features/userSlice";
import Profile from "../../../assets/icons/profile";
import Users from "../../../assets/icons/users";
import Posts from "../../../assets/icons/posts";
import Categories from "../../../assets/icons/categories";
import Home from "../../../assets/icons/home";
import SignIn from "../../../assets/icons/signIn";
import SignOut from "../../../assets/icons/signOut";
import Bell from "../../../assets/icons/bell";
import Search from "../../../assets/icons/search";
import WishList from "../../../assets/icons/wishlist";
import {useEffect} from "react";
import Inbox from "./../../../assets/icons/inbox";

const Header = () => {
    const nav = useNavigate();
    const dispatch = useDispatch();
    const isLogin = useSelector((state) => state.userSlice?.user !== null);
    const user = useSelector((state) => state.userSlice.user);
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
                    <Link to={"/admin"}>
                        <Logo>
                            <img src="/img/LOGO.png" alt="logo"/>
                            <p>rentInOut</p>
                        </Logo>
                    </Link>
                </div>
                <div className="right">
                    <nav className="md:hidden block">
                        <ul>
                            <li onClick={() => dispatch(onInboxToggle())}>
                                <button
                                    type="button"
                                    className="inline-flex relative items-center p-3 text-sm  text-center"
                                >
                                    <Inbox color="black" width="20" height="20"/>
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
                                    <Bell/>
                                    <span className="sr-only">Notifications</span>
                                    <div
                                        className="z-10 inline-flex absolute -top-1 -right-2 justify-center items-center w-5 h-5 text-xs font-bold text-white bg-red-500 rounded-full">
                                        2
                                    </div>
                                </button>
                            </li>
                        </ul>
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
                                isLogin
                                    ? user.profile_img.url
                                    : "https://freesvg.org/img/Male-Avatar.png"
                            }
                            alt=""
                        />
                        <span
                            className={`${
                                isLogin ? "bg-green-400" : "bg-red-400"
                            } bottom-0 left-7 absolute  w-3.5 h-3.5 border-2 border-white dark:border-gray-800 rounded-full`}
                        ></span>
                    </div>
                </div>
            </section>
            {isOpen && (
                <ul
                    onMouseOver={() => openNav()}
                    onMouseLeave={() => closeNav()}
                    className="absolute shadow dropdown z-50 bg-white w-full rounded right-0 -top-15 md:w-1/4 md:-bottom-30"
                >
                    <li
                        onClick={() => {
                            setIsOpen(false);
                            nav("/admin");
                        }}
                        className={`w-full p-2 rounded transition ease-in-out delay-150 cursor-pointer hover:bg-blue-200`}
                    >
                        <div className="flex justify-between items-center">
                            {" "}
                            <p>Home</p> <Home/>
                        </div>
                    </li>
                    <li
                        onClick={() => {
                            setIsOpen(false);
                            nav("/admin/users");
                        }}
                        className={`w-full p-2 rounded transition ease-in-out delay-150 cursor-pointer hover:bg-blue-200`}
                    >
                        <div className="flex justify-between items-center">
                            {" "}
                            <p>Users</p> <Profile color="black"/>
                        </div>
                    </li>
                    <li
                        onClick={() => {
                            setIsOpen(false);
                            nav("/admin/posts");
                        }}
                        className={`w-full p-2 rounded transition ease-in-out delay-150 cursor-pointer hover:bg-blue-200`}
                    >
                        <div className="flex justify-between items-center">
                            {" "}
                            <p>Posts</p> <Posts color="black"/>
                        </div>
                    </li>
                    <li
                        onClick={() => {
                            setIsOpen(false);
                            nav("/admin/categories");
                        }}
                        className={`w-full p-2 rounded transition ease-in-out delay-150 cursor-pointer hover:bg-blue-200`}
                    >
                        <div className="flex justify-between items-center">
                            {" "}
                            <p>Categories</p> <Categories/>
                        </div>
                    </li>
                    <li
                        onClick={() => {
                            setIsOpen(false);
                            nav("/admin/profile");
                        }}
                        className={`w-full p-2 rounded transition ease-in-out delay-150 cursor-pointer hover:bg-blue-200`}
                    >
                        <div className="flex justify-between items-center">
                            <p>Profile</p> <Users/>
                        </div>
                    </li>
                    <li
                        className={`w-full p-2 rounded transition ease-in-out delay-150 cursor-pointer hover:bg-blue-200`}
                    >
                        <Link
                            className="flex justify-between items-center cursor-pointer"
                            to={user?.role === "admin" ? "/admin/wishlist" : "/wishlist"}
                        >
                            <span>Wish List</span>
                            <WishList/>
                        </Link>
                    </li>
                    <li
                        onClick={() => dispatch(onSearchToggle())}
                        className={`w-full p-2 rounded transition ease-in-out delay-150 cursor-pointer hover:bg-blue-200`}
                    >
                        <a className="flex justify-between items-center cursor-pointer">
                            <span>Search</span>
                            <Search/>
                        </a>
                    </li>
                    <li
                        onClick={() => {
                            if (isLogin) {
                                localStorage.removeItem("token");
                                nav("/");
                                dispatch(onLogout());
                            } else {
                                dispatch(onRegisterToggle());
                                setIsOpen(false);
                            }
                        }}
                        className={`w-full p-2 rounded`}
                    >
                        {isLogin ? (
                            <div className="flex justify-between items-center cursor-pointer">
                                {" "}
                                <p>Signout</p> <SignOut color="black"/>
                            </div>
                        ) : (
                            <div className="flex justify-between items-center">
                                <p>Signin</p> <SignIn color="black"/>
                            </div>
                        )}
                    </li>
                </ul>
            )}
        </Wrapper>
    );
};
export default Header;
