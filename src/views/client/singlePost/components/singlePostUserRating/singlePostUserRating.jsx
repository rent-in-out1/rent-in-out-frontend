import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Star from '../../../../../assets/icons/star';
import StarFill from '../../../../../assets/icons/starFill';
import { onRegisterShow } from '../../../../../redux/features/toggleSlice';
import { doApiMethod } from '../../../../../api/services/axios-service/axios-service';
import { errorHandler, successHandler } from '../../../../../util/functions';

const SinglePostUserRating = ({ rank, post, setIsChange, isChange }) => {
	const dispatch = useDispatch();
	let userRanks = rank?.userRank ? rank.userRank : 0;
	const [fill, setFill] = useState(userRanks - 1);
	const { user } = useSelector((state) => state.userSlice);
	const rankUser = async (rnk) => {
		if (!user) {
			setFill(-1);
			return dispatch(onRegisterShow());
		} else {
			try {
				let url = `/users/rankUser/${post?.creator_id._id}`;
				await doApiMethod(url, 'PATCH', { rnk });
				setIsChange(!isChange);
				successHandler('Rating updated');
			} catch (err) {
				setFill(-1);
				errorHandler(err.response.data.msg);
			}
		}
	};
	return (
		<div className='flex justify-between items-center border rounded-xl p-2 mt-1 mx-5'>
			<h2>User Rating: {rank.average ? rank.average.toFixed(1) : '0'}</h2>
			{user && user._id !== post.creator_id._id ? (
				<div className='flex flex-col text-center'>
					<small>Rate user</small>
					<div className='flex'>
						{[...Array(fill + 1)].map((star, i) => {
							return (
								<span
									className='cursor-pointer mr-1'
									key={i}
									onClick={() => {
										setFill(i);
										rankUser(i + 1);
									}}
								>
									<StarFill />
								</span>
							);
						})}
						{[...Array(4 - fill)].map((star, i) => {
							return (
								<span
									className='cursor-pointer mr-1'
									key={i}
									onClick={() => {
										setFill(fill + i + 1);
										rankUser(fill + i + 2);
									}}
								>
									<Star />
								</span>
							);
						})}
					</div>
				</div>
			) : null}
		</div>
	);
};

export default SinglePostUserRating;
