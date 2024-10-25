const ArrowRight = ({ color = 'black', width = '20px', height = '20px', styleClass = '' }) => {
	return (
		<svg
			aria-hidden='true'
			className={`transition duration-75 ${styleClass}`}
			width={width}
			height={height}
			fill={color}
			viewBox='0 0 20 20'
		>
			<path d='M6 12.796V3.204L11.481 8 6 12.796zm.659.753 5.48-4.796a1 1 0 0 0 0-1.506L6.66 2.451C6.011 1.885 5 2.345 5 3.204v9.592a1 1 0 0 0 1.659.753z' />
		</svg>
	);
};

export default ArrowRight;
