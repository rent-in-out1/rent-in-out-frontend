import React, { useEffect, useState } from 'react';
import RentBarChart from '../../../shared/components/rentBarChart';
import RentCard from '../../../shared/components/rentCard';
import RentLineChart from '../../../shared/components/rentLineChart';
import UsersWizard from './components/usersWizard';
import CategoriesWizard from './components/categoriesWizard/categoriesWizard';
import PostsWizard from './components/postsWizard/postsWizard';
import { doGetApiMethod } from '../../../api/services/axios-service/axios-service';

const HomeAdmin = () => {
	const [usersCount, setUsersCount] = useState(0);
	const [categoriesCount, setCategoriesCount] = useState(0);
	const [postCount, setPostsCount] = useState(0);
	const [postsByCategory, setPostsByCategory] = useState([]);
	const [usersByDate, setUsersByDate] = useState([]);

	useEffect(() => {
		getUsersCount();
		getCategoriesCount();
		getPostsCount();
		getPostsByCategory();
		getUsersByDate();
	}, []);

	const getUsersCount = async () => {
		const { data } = await doGetApiMethod('/users/count');
		setUsersCount(data.count);
	};

	const getCategoriesCount = async () => {
		const { data } = await doGetApiMethod('/categories/count');
		setCategoriesCount(data.count);
	};

	const getPostsCount = async () => {
		const { data } = await doGetApiMethod('/posts/count');
		setPostsCount(data.count);
	};

	const getPostsByCategory = async () => {
		const { data } = await doGetApiMethod('/posts/count-by-category');
		const mappedCategories = mapPostsByCategory(data);
		setPostsByCategory(mappedCategories);
	};

	const mapPostsByCategory = (categories) => {
		return categories.map((category) => {
			return {
				name: category.name,
				Category: category.count,
			};
		});
	};

	const getUsersByDate = async () => {
		const { data } = await doGetApiMethod('/users/users-by-date');
		const mappedUsersByDate = mapUsersByDate(data);
		setUsersByDate(mappedUsersByDate);
	};

	const mapUsersByDate = (users) => {
		return users.map((userByDate) => {
			return {
				name: userByDate.date,
				users: userByDate.count,
			};
		});
	};

	return (
		<React.Fragment>
			<div className='flex flex-wrap mt-5'>
				{/* users count */}
				<div className='px-2 w-full md:w-1/3 mb-4'>
					<UsersWizard count={usersCount} />
				</div>

				{/* categories count */}
				<div className='px-2 w-full md:w-1/3 mb-4'>
					<CategoriesWizard count={categoriesCount} />
				</div>

				{/* posts count */}
				<div className='px-2 w-full md:w-1/3 mb-4'>
					<PostsWizard count={postCount} />
				</div>
			</div>

			{/* posts by category */}
			<RentCard styleClass={'mb-4 shadow-lg'}>
				<h4 className='ps-3 mb-4 font-semibold text-center'>All Categories:</h4>
				<RentBarChart config={postsByCategory} activeLegend={false} />
			</RentCard>

			{/* users by date */}
			<RentCard styleClass={'shadow-lg mb-4'}>
				<h4 className='ps-3 mb-4 font-semibold text-center'>Users Count By Date:</h4>
				<RentLineChart config={usersByDate} />
			</RentCard>
		</React.Fragment>
	);
};
export default HomeAdmin;
