import React from 'react';
import { useNavigate } from 'react-router-dom';
import RentCard from '../../../../../shared/components/rentCard';
import Dashboard from '../../../../../assets/icons/dashboard';
import { isNumberEmpty } from '../../../../../util/functions';

const PostsWizard = ({ count }) => {
	const nav = useNavigate();

	return (
		<RentCard styleClass={`cursor-pointer`} isColored={!isNumberEmpty(count)} bottomColor={'#333333'}>
			{!isNumberEmpty(count) ? (
				<div onClick={() => nav('/admin/posts')} className='flex items-center'>
					<div className='w-3/4'>
						<h2 className='py-3 font-semibold'>{count}</h2>
						<h2>Total Posts</h2>
					</div>
					<div className='w-1/4'>
						<Dashboard width='64px' height='64px' color={'#333333'} />
					</div>
				</div>
			) : (
				<div className='flex items-center justify-center h-full'>no data</div>
			)}
		</RentCard>
	);
};

export default PostsWizard;
