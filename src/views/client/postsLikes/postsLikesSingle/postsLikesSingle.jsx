import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const PostsLikesSingle = ({ item, action }) => {
	const dispatch = useDispatch();
	const nav = useNavigate();
	const { user } = useSelector((state) => state.userSlice);

	const navigateToUserProfile = () => {
		// allowed scrolling once modal closed
		document.body.style.overflow = 'unset';
		dispatch(action());
		if (user) {
			switch (user.role) {
				case 'admin':
					nav(`/admin/profile/${item._id}`);
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
			onClick={() => navigateToUserProfile()}
			className={`p-3 mx-auto w-full flex items-center justify-between mt-3 cursor-pointer bg-white transition ease-in-out delay-150 hover:bg-gray-300 rounded-lg shadow-md`}
		>
			<div className='flex items-center space-x-1'>
				<div className=' rounded-full w-8 h-8 overflow-hidden'>
					<img
						className=' object-cover w-full h-full '
						src={item?.profile_img ? item.profile_img.url : 'https://freesvg.org/img/Male-Avatar.png'}
						alt=''
					/>
				</div>
				<div>
					<p className='"text-sm font-medium text-gray-900 truncate"'>
						{item.fullName.firstName} {item.fullName.lastName}{' '}
					</p>
					<p className='text-sm text-gray-500 truncate'>{item.email}</p>
				</div>
			</div>
			<p className='text-base font-semibold text-gray-900 md:p-2 -mx-2 md:overflow-hidden'>{item.country}</p>
		</li>
	);
};

export default PostsLikesSingle;
