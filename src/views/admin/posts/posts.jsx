import React, { useEffect, useState } from 'react';
import { Wrapper } from '../../../assets/styles/wrappers/table';
import { doGetApiMethod } from '../../../api/services/axios-service/axios-service';
import PageNav from '../../../shared/UI/page-nav/page-nav';
import Controllers from '../../../shared/components/controllers/Controllers';
import SinglePost from './singlePost/singlePost';

const Posts = () => {
	const [search, setSearch] = useState('');
	const [option, setOption] = useState();
	const [posts, setPosts] = useState([]);
	const [page, setPage] = useState(1);
	const [isChange, setIsChange] = useState(false);
	const options = [
		{ name: 'Title', value: 'title' },
		{ name: 'Rent duration', value: 'range' },
		{ name: 'Location', value: 'location' },
		{ name: 'Active', value: 'active' },
	];
	const posts_headers = [
		'Title',
		'Created by',
		'location',
		'category',
		'created at',
		'updated at',
		'availability',
		'active',
		'delete',
	];
	const getAllposts = async () => {
		let url = `/posts/search/?s=${search}&sort=${option}&page=${page}`;
		const { data } = await doGetApiMethod(url);
		setPosts(data.posts);
		setIsChange(false);
	};
	useEffect(() => {
		getAllposts();
	}, [isChange, search, option]);

	return (
		<React.Fragment>
			<Wrapper>
				<Controllers title={'posts list'} options={options} setSearch={setSearch} setOption={setOption} />
				<PageNav
					urlPageApi={'/posts/count'}
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
								{posts_headers.map((header, i) => (
									<th key={i}>{header}</th>
								))}
							</tr>
						</thead>
						<tbody>{posts?.map((post) => <SinglePost key={post._id} post={post} setIsChange={setIsChange} />)}</tbody>
					</table>
				</div>
			</Wrapper>
		</React.Fragment>
	);
};

export default Posts;
