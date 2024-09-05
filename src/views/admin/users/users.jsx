import React, { useEffect, useState } from 'react';
import { Wrapper } from '../../../assets/styles/wrappers/table';
import { doGetApiMethod } from '../../../api/services/axios-service/axios-service';
import PageNav from '../../../shared/UI/page-nav/page-nav';
import Controllers from '../../../shared/components/controllers/Controllers';
import SingleUser from './singleUser';

const Users = () => {
	const [users, setUsers] = useState([]);
	const [search, setSearch] = useState('');
	const [option, setOption] = useState('role');
	const [page, setPage] = useState(1);
	const [isChange, setIsChange] = useState(false);
	const options = [
		{ name: 'Role', value: 'role' },
		{ name: 'Name', value: 'fullName.firstName' },
		{ name: 'Status', value: 'active' },
		{ name: 'Country', value: 'country' },
		{ name: 'City', value: 'city' },
	];
	useEffect(() => {
		getAllUsers();
	}, [isChange, option, search]);

	const getAllUsers = async () => {
		let url = `/users/userSearch/?s=${search}&sort=${option}&page=${page}`;
		let { data } = await doGetApiMethod(url);
		setUsers(data);
		setIsChange(false);
	};
	const users_hedaers = ['Name', 'email', 'country', 'city', 'age', 'phone', 'Created at', 'active', 'Role', 'delete'];

	return (
		<Wrapper className='mb-2'>
			<Controllers title={'users list'} options={options} setSearch={setSearch} setOption={setOption} />
			<PageNav
				urlPageApi={'/users/countUsers'}
				perPage={10}
				setPage={setPage}
				page={page}
				setIsChange={setIsChange}
				cssClass='flex justify-center justify-between p-3 items-center justify-center w-10/12 md:w-8/12 mx-auto'
			/>

			<div className='wrapper'>
				<table>
					<thead>
						<tr>
							{users_hedaers.map((header, i) => (
								<th key={i}>{header}</th>
							))}
						</tr>
					</thead>
					<tbody id='tbody'>
						{users.length > 0 &&
							users?.map((user) => {
								return <SingleUser key={user._id} item={user} setIsChange={setIsChange} />;
							})}
					</tbody>
				</table>
			</div>
		</Wrapper>
	);
};

export default Users;
