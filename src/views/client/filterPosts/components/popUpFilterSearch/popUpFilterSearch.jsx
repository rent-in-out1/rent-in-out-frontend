import React, { useMemo, useState } from 'react';
import Filters from '../../../../../assets/icons/filters';
import LoadingCircle from '../../../../../assets/icons/loadingCircle';
import { onPostSearchToggle } from '../../../../../redux/features/toggleSlice';
import PopUpModel from '../../../../../shared/UI/popup/popUpModel';
import FilterByCategory from '../filterByCategory/filterByCategory';
import FreeSearch from '../freeSearch';
import RangePrice from '../rangePrice';
import { useDispatch } from 'react-redux';
import { useSearchParams } from 'react-router-dom';

const PopUpFilterSearch = () => {
	const dispatch = useDispatch();
	const [filterForm, setFilterForm] = useState({
		minPrice: 0,
		maxPrice: 1000,
		categories: [],
		search: '',
	});
	const [isLoading, setIsLoading] = useState(false);
	const [errorMsg, setErrorMsg] = useState('');
	const [searchParams, setSearchParams] = useSearchParams();

	useMemo(() => {
		// check if there is any values in url
		setFilterForm((prev) => ({
			categories: (searchParams.get('categories') && searchParams.get('categories')?.split(',')) || prev.categories,
			minPrice: searchParams.get('price_min') || prev.minPrice,
			maxPrice: searchParams.get('price_max') || prev.maxPrice,
			search: searchParams.get('s') || prev.search,
		}));
	}, []);

	const filterPostsHandler = async () => {
		if (checkErrors()) {
			setIsLoading(true);
			setTimeout(() => {
				// stop loading
				setIsLoading(false);
				// close modal
				dispatch(onPostSearchToggle());
				// allowed scrolling once modal closed
				document.body.style.overflow = 'unset';
				// reload the page to use redux request server again(to posts)
				setSearchParams(createSearchParams());
			}, 1000);
		}
	};

	const createSearchParams = () => {
		const categoriesArr =
			filterForm?.categories.length > 0 ? filterForm?.categories.map((category) => category.url_name)?.join(',') : '';
		return `s=${filterForm.search}&price_max=${filterForm.maxPrice}&price_min=${filterForm.minPrice}&categories=${categoriesArr}`;
	};

	const checkErrors = () => {
		if (!filterForm.minPrice && filterForm.minPrice !== 0) {
			setErrorMsg('Min price is required.');
			return false;
		} else if (!filterForm.maxPrice) {
			setErrorMsg('Max price is required.');
			return false;
		} else if (filterForm.minPrice < 0) {
			setErrorMsg('Min price must be greater than 0.');
			return false;
		}
		setErrorMsg(null);
		return true;
	};

	return (
		<PopUpModel className={'py-4'} action={onPostSearchToggle}>
			{/* filters header */}
			<div className='filters-header flex justify-center items-center'>
				<span className='pr-2'>
					<Filters color='#93C5FD' width='30' height='30' />
				</span>
				<div className='text-2xl'>Filters</div>
			</div>
			{/* split header from body */}
			<hr className='h-px mt-3 mb-4 w-5/6 md:w-3/4 mx-auto bg-gray-200 border-0' />

			{/* filters body */}
			<div className='filters-body w-5/6 md:w-3/4 mx-auto'>
				<RangePrice setFilterForm={setFilterForm} filterForm={filterForm} />
				<FilterByCategory setFilterForm={setFilterForm} filterForm={filterForm} />
				<FreeSearch setFilterForm={setFilterForm} filterForm={filterForm} />

				{errorMsg && <div className='pb-2 text-xs font-extralight text-red-600'>{errorMsg}</div>}
				<button
					onClick={() => filterPostsHandler()}
					type='button'
					className={`flex items-center justify-center w-full border-transparent focus:outline-none hover:border-transparent active:border-transparent bg-blue-400 hover:bg-blue-700 px-6 md:px-8 py-2 text-sm md:text-base cursor-pointer text-white rounded-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:text disabled:hover:bg-blue-400`}
					disabled={isLoading}
				>
					{isLoading ? (
						<React.Fragment>
							<LoadingCircle />
							Loading...
						</React.Fragment>
					) : (
						<span>Filter Posts</span>
					)}
				</button>
			</div>
		</PopUpModel>
	);
};

export default PopUpFilterSearch;
