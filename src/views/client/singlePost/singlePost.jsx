import React, { useEffect, useState } from 'react';
import { Wrapper } from '../../../assets/styles/wrappers/singlePost';
import { onPostToggle } from '../../../redux/features/toggleSlice';
import { doGetApiMethod } from '../../../api/services/axios-service/axios-service';
import PostHeader from '../../../shared/components/postHeader/postHeader';
import PopUPModel from '../../../shared/UI/popup/popUpModel';
import BallTriangleLoader from '../../../shared/components/loader/ballTriangle/ballTriangle';
import PostsLikes from '../postsLikes/postsLikes';
import SinglePostImgController from './components/singlePostImgController/singlePostImgController';
import SinglePostMapByLocation from './components/singlePostMapByLocation/singlePostMapByLocation';
import SinglePostInfo from './components/singlePostInfo/singlePostInfo';
import SinglePostUserInfo from './components/singlePostUserInfo/singlePostUserInfo';

import { useSelector } from 'react-redux';

const SinglePost = ({ post }) => {
	const { user } = useSelector((state) => state.userSlice);
	const [isLoading, setIsLoading] = useState(true);
	const [isChange, setIsChange] = useState(false);
	const [rank, setRank] = useState({});
	useEffect(() => {
		getUserRating();
	}, [isChange]);
	/** get rating from api */
	const getUserRating = async () => {
		let url = `/users/getRank/${post?.creator_id._id}?rankingUser=${user?._id}`;
		const { data } = await doGetApiMethod(url);
		setRank(data);
		setIsLoading(false);
	};

	return (
		<PopUPModel action={onPostToggle}>
			<Wrapper>
				{isLoading ? (
					<div className='loader w-full flex justify-center items-center h-full'>
						<BallTriangleLoader width={'150px'} height={'150px'} />
					</div>
				) : (
					// images
					<section className='flex flex-wrap'>
						<SinglePostImgController post={post} />
						{/* post context */}
						<main className='overflow-y-scroll'>
							<hr />
							{post && <PostHeader post={post} />}
							<hr />
							<div className='flex flex-wrap mt-2'>
								<div className='post-info md:w-1/2 border w-full'>
									<SinglePostInfo post={post} owner={post.creator_id} user={user} />
								</div>
								<div className='post-likes md:w-1/2 border w-full'>
									<PostsLikes likes={post?.likes} action={onPostToggle} />
								</div>
							</div>
							<SinglePostUserInfo
								owner={post.creator_id}
								rank={rank}
								post={post}
								isChange={isChange}
								setIsChange={setIsChange}
							/>
							<div className='p-2 overflow-hidden'>
								<SinglePostMapByLocation results={post?.collect_points} center={post?.collect_points[0]} />
							</div>
						</main>
					</section>
				)}
			</Wrapper>
		</PopUPModel>
	);
};

export default SinglePost;
