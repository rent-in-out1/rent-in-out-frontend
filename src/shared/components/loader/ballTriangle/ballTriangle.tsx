import { BallTriangle } from 'react-loader-spinner';

interface IBallTriangleLoaderPropsModel {
	load?: boolean;
	height: string;
	width: string;
	color?: string;
}

const BallTriangleLoader = ({ load = true, height, width, color = '#97aef8' }: IBallTriangleLoaderPropsModel) => {
	return (
		<BallTriangle
			height={height}
			width={width}
			color={color}
			radius='9'
			wrapperStyle={{}}
			wrapperClass=''
			visible={load}
			ariaLabel='ball-triangle-loading'
		/>
	);
};

export default BallTriangleLoader;
