const ArrowRightFill = ({ color = 'black', width = '20px', height = '20px', styleClass = '' }) => {
	return (
		<svg
			aria-hidden='true'
			className={`transition duration-75 ${styleClass}`}
			width={width}
			height={height}
			fill={color}
			viewBox='0 0 20 20'
		>
			<path d='m12.14 8.753-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z' />
		</svg>
	);
};

export default ArrowRightFill;
