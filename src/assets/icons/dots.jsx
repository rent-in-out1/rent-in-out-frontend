import React from 'react';

const Dots = ({ width = 20, height = 20, color = 'black' }) => {
	return (
		<svg
			className='cursor-pointer'
			xmlns='http://www.w3.org/2000/svg'
			width={width}
			height={height}
			fill={color}
			viewBox='0 0 16 16'
		>
			<path d='M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z' />
		</svg>
	);
};

export default Dots;
