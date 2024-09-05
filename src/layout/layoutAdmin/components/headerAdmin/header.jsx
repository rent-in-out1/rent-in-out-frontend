import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import Bell from '../../../../assets/icons/bell';
import Categories from '../../../../assets/icons/categories';
import Home from '../../../../assets/icons/home';
import Inbox from '../../../../assets/icons/inbox';
import Posts from '../../../../assets/icons/posts';
import Profile from '../../../../assets/icons/profile';
import Search from '../../../../assets/icons/search';
import SignIn from '../../../../assets/icons/signIn';
import SignOut from '../../../../assets/icons/signOut';
import Users from '../../../../assets/icons/users';
import WishList from '../../../../assets/icons/wishlist';
import { Logo, Wrapper } from '../../../../assets/styles/wrappers/navbarAdmin';
import {
	onInboxToggle,
	onPostSearchToggle,
	onRegisterToggle,
	onSearchToggle,
} from '../../../../redux/features/toggleSlice';
import { onLogout } from '../../../../redux/features/userSlice';
import FilterPosts from '../../../../views/client/filterPosts/filterPosts';
import CircleBadge from '../../../../shared/components/circleBadge';
import Dashboard from '../../../../assets/icons/dashboard';

const Header = () => {
	const nav = useNavigate();
	const dispatch = useDispatch();
	const isLogin = useSelector((state) => state.userSlice?.user !== null);
	const user = useSelector((state) => state.userSlice.user);
	const [isOpen, setIsOpen] = useState(false);
	const [searchParams, setSearchParams] = useSearchParams();

	useEffect(() => {
		window.addEventListener('scroll', () => closeNav());
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

	const countSearchParams = () => {
		let count = 0;
		count += searchParams.get('s') ? 1 : 0;
		count += searchParams.get('price_max') || searchParams.get('price_min') ? 1 : 0;
		count += searchParams.get('categories') ? 1 : 0;
		return count;
	};

	return (
		<Wrapper className='drop-shadow-xl'>
			<section>
				<div className='left flex flex-wrap'>
					<Link to={'/'}>
						<Logo>
							<img src='/img/LOGO.png' alt='logo' />
							<p>rentInOut</p>
						</Logo>
					</Link>
				</div>
				<div className='right'>
					<div className='hidden md:block'>
						<FilterPosts />
					</div>
					<nav className='md:hidden block'>
						<ul>
							<li onClick={() => dispatch(onInboxToggle())}>
								<button type='button' className='inline-flex relative items-center p-3 text-sm  text-center'>
									<Inbox color='black' width='20' height='20' />
									<span className='sr-only'>Notifications</span>
									<div className='z-10 inline-flex absolute -top-1 -right-2 justify-center items-center w-5 h-5 text-xs font-bold text-white bg-red-500 rounded-full'>
										1
									</div>
								</button>
							</li>
							<li>
								<button type='button' className='inline-flex relative items-center p-3 text-sm  text-center'>
									<Bell />
									<span className='sr-only'>Notifications</span>
									<div className='z-10 inline-flex absolute -top-1 -right-2 justify-center items-center w-5 h-5 text-xs font-bold text-white bg-red-500 rounded-full'>
										2
									</div>
								</button>
							</li>
						</ul>
					</nav>
					<div
						className='relative avatar'
						onMouseLeave={() => closeNav()}
						onClick={() => {
							isOpen ? closeNav() : openNav();
						}}
					>
						<img
							className='rounded-full'
							src={isLogin ? user.profile_img.url : 'https://freesvg.org/img/Male-Avatar.png'}
							alt=''
						/>
						<span
							className={`${
								isLogin ? 'bg-green-400' : 'bg-red-400'
							} bottom-0 left-7 absolute  w-3.5 h-3.5 border-2 border-white rounded-full`}
						></span>
					</div>
				</div>
			</section>
			{isOpen && (
				<ul
					onMouseOver={() => openNav()}
					onMouseLeave={() => closeNav()}
					className='absolute shadow dropdown z-50 bg-white w-full rounded right-0 -top-15 md:w-1/4 md:-bottom-30'
				>
					{/* home admin */}
					<li
						onClick={() => {
							setIsOpen(false);
							nav('/admin/home');
						}}
						className={`w-full p-2 rounded transition ease-in-out delay-150 cursor-pointer hover:bg-blue-200`}
					>
						<div className='flex justify-between items-center'>
							<span>Home Admin</span>
							<span className='pr-1'>
								<Home />
							</span>
						</div>
					</li>
					{/* Home */}
					<li
						onClick={() => {
							setIsOpen(false);
							nav('/admin');
						}}
						className={`w-full p-2 rounded transition ease-in-out delay-150 cursor-pointer hover:bg-blue-200`}
					>
						<div className='flex justify-between items-center'>
							<span>Dashboard</span>
							<span className='pr-1'>
								<Dashboard color='black' />
							</span>
						</div>
					</li>
					<li
						onClick={() => {
							setIsOpen(false);
							nav('/admin/users');
						}}
						className={`w-full p-2 rounded transition ease-in-out delay-150 cursor-pointer hover:bg-blue-200`}
					>
						<div className='flex justify-between items-center'>
							<span>Users</span>
							<span className='pr-1'>
								<Users />
							</span>
						</div>
					</li>
					<li
						onClick={() => {
							setIsOpen(false);
							nav('/admin/posts');
						}}
						className={`w-full p-2 rounded transition ease-in-out delay-150 cursor-pointer hover:bg-blue-200`}
					>
						<div className='flex justify-between items-center'>
							<span>Posts</span>
							<span className='pr-1'>
								<Posts color='black' />
							</span>
						</div>
					</li>
					<li
						onClick={() => {
							setIsOpen(false);
							nav('/admin/categories');
						}}
						className={`w-full p-2 rounded transition ease-in-out delay-150 cursor-pointer hover:bg-blue-200`}
					>
						<div className='flex justify-between items-center'>
							<span>Categories</span>
							<span className='pr-1'>
								<Categories />
							</span>
						</div>
					</li>
					<li
						onClick={() => {
							setIsOpen(false);
							nav('/admin/profile');
						}}
						className={`w-full p-2 rounded transition ease-in-out delay-150 cursor-pointer hover:bg-blue-200`}
					>
						<div className='flex justify-between items-center'>
							<span>Profile</span>
							<span className='pr-1'>
								<Profile color='black' />
							</span>
						</div>
					</li>
					<li className={`w-full p-2 rounded transition ease-in-out delay-150 cursor-pointer hover:bg-blue-200`}>
						<Link
							className='flex justify-between items-center cursor-pointer'
							to={user?.role === 'admin' ? '/admin/wishlist' : '/wishlist'}
						>
							<span>Wish List</span>
							<span className='pr-1'>
								<WishList />
							</span>
						</Link>
					</li>
					{/* filter posts */}
					<li
						onClick={(e) => openFilterPostsModal(e)}
						className='md:hidden w-full p-2 rounded transition ease-in-out delay-150 cursor-pointer hover:bg-blue-200'
					>
						<div className='flex justify-between items-center cursor-pointer'>
							<span>
								Filter Posts
								{countSearchParams() > 0 && (
									<span className='ml-2'>
										<CircleBadge count={countSearchParams()} />
									</span>
								)}
							</span>
							<span className='pr-1'>
								<Search />
							</span>
						</div>
					</li>
					{/* user search */}
					<li
						onClick={() => dispatch(onSearchToggle())}
						className={`w-full p-2 rounded transition ease-in-out delay-150 cursor-pointer hover:bg-blue-200`}
					>
						<Link to={'/'} className='flex justify-between items-center cursor-pointer'>
							<span>Search User</span>
							<span className='pr-1'>
								<Profile color='black' />
							</span>
						</Link>
					</li>
					<li
						onClick={() => {
							if (isLogin) {
								localStorage.removeItem('token');
								nav('/');
								dispatch(onLogout());
							} else {
								dispatch(onRegisterToggle());
								setIsOpen(false);
							}
						}}
						className={`w-full p-2 rounded`}
					>
						{isLogin ? (
							<div className='flex justify-between items-center cursor-pointer'>
								<span>Signout</span>
								<SignOut color='black' />
							</div>
						) : (
							<div className='flex justify-between items-center'>
								<span>Signin</span>
								<SignIn color='black' />
							</div>
						)}
					</li>
				</ul>
			)}
		</Wrapper>
	);
};
export default Header;
