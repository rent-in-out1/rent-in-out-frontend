import React from 'react';

const Users = ({ color = 'black', width = '20px', height = '20px' }) => {
	return (
		<svg
			aria-hidden='true'
			className='transition duration-75'
			width={width}
			height={height}
			fill={color}
			viewBox='0 0 20 20'
		>
			<path d='M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1H7Zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm-5.784 6A2.238 2.238 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.325 6.325 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1h4.216ZM4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z' />
		</svg>
	);
};

export default Users;
