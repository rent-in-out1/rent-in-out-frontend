import { Rings } from 'react-loader-spinner';

interface ILoadingButtonPropsModel {
	isLoading: boolean;
	children: string;
	height?: number;
	width?: number;
}

const LoadingButton = ({ isLoading, children, height = 24, width = 24 }: ILoadingButtonPropsModel) => {
	return (
		<button
			className='w-full mb-2 bg-discord-blue-200 p-[0.2em] text-white rounded transition-colors enabled:hover:bg-discord-blue-250'
			type='submit'
			disabled={isLoading}
		>
			{isLoading ? (
				<Rings
					height={height}
					width={width}
					color='white'
					// TODO - Check why shay put an unrecognized property
					// size={6}
				/>
			) : (
				children
			)}
		</button>
	);
};

export default LoadingButton;
