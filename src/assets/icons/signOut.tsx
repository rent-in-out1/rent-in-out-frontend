const SignOut = ({ color = '#6B7280', width = '24px', height = '24px' }) => {
	return (
		<svg
			aria-hidden='true'
			className='transition duration-75'
			width={width}
			height={height}
			fill={color}
			viewBox='0 0 20 20'
		>
			<path
				fillRule='evenodd'
				d='M10 3.5a.5.5 0 0 0-.5-.5h-8a.5.5 0 0 0-.5.5v9a.5.5 0 0 0 .5.5h8a.5.5 0 0 0 .5-.5v-2a.5.5 0 0 1 1 0v2A1.5 1.5 0 0 1 9.5 14h-8A1.5 1.5 0 0 1 0 12.5v-9A1.5 1.5 0 0 1 1.5 2h8A1.5 1.5 0 0 1 11 3.5v2a.5.5 0 0 1-1 0v-2z'
			/>
			<path
				fillRule='evenodd'
				d='M4.146 8.354a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H14.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3z'
			/>
		</svg>
	);
};

export default SignOut;
