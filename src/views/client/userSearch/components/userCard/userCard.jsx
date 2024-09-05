import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { onSearchToggle } from '../../../../../redux/features/toggleSlice';

const UserCard = ({ item }) => {
	const dispatch = useDispatch();
	const nav = useNavigate();
	const { user } = useSelector((state) => state.userSlice);
	const userProfile = async () => {
		// allowed scrolling once modal closed
		document.body.style.overflow = 'unset';
		if (user) {
			switch (user?.role) {
				case 'admin':
					nav(`admin/profile/${item._id}`);
					break;
				default:
					nav(`/profile/${item._id}`);
			}
		} else {
			nav(`/profile/${item._id}`);
		}
	};
	return (
		<li
			onClick={() => {
				userProfile();
				dispatch(onSearchToggle());
			}}
			className='p-3 sm:py-3 mx-auto flex items-center justify-between w-full mt-3 px-4 transition ease-in-out delay-150 cursor-pointer bg-white hover:bg-gray-100 border rounded-lg shadow-md'
		>
			<div className='flex items-center space-x-1'>
				<div className=' rounded-full w-8 h-8 overflow-hidden'>
					<img
						className=' object-cover w-full h-full '
						src={user !== null && user?.active ? item.profile_img.url : 'https://freesvg.org/img/Male-Avatar.png'}
						alt='user profile'
					/>
				</div>
				<div>
					<p className='text-sm font-medium text-gray-900 truncate'>
						{item.fullName.firstName} {item.fullName.lastName}{' '}
					</p>
					<p className='text-sm text-gray-500 truncate'>{item.email}</p>
				</div>
			</div>
			<p className='text-base font-semibold text-gray-900 md:p-2 -mx-2 md:overflow-hidden'>{item.country}</p>
		</li>
	);
};

export default UserCard;
