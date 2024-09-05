import React from 'react';

const Dashboard = ({ color = '#6B7280', width = '24px', height = '24px' }) => {
	return (
		<svg
			aria-hidden='true'
			className='transition duration-75'
			width={width}
			height={height}
			fill={color}
			viewBox='0 0 20 20'
		>
			<path d='M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z'></path>
			<path d='M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z'></path>
		</svg>
	);
};

export default Dashboard;
