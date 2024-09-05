import React from 'react';
import { useDispatch } from 'react-redux';
import Search from '../../../assets/icons/search';
import { onPostSearchToggle } from '../../../redux/features/toggleSlice';
import CircleBadge from '../../../shared/components/circleBadge/circleBadge';
import { useSearchParams } from 'react-router-dom';

const FilterPosts = () => {
	const dispatch = useDispatch();
	const [searchParams, setSearchParams] = useSearchParams();

	// open modal
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
		<div onClick={(e) => openFilterPostsModal(e)} className='relative'>
			<div className='absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none'>
				{/* search icon */}
				<Search color='#333' width='20' height='20' />
			</div>
			<input
				type='search'
				id='default-search'
				className='cursor-pointer block w-full py-3 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500'
				placeholder='Filter Posts'
			/>
			<span className='absolute right-2.5 bottom-2.5'>
				{countSearchParams() > 0 && <CircleBadge count={countSearchParams()} />}
			</span>
		</div>
	);
};

export default FilterPosts;
