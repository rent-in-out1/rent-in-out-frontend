import { Rings } from 'react-loader-spinner';


const LoadingButton = ({ isLoading, children, height = 24, width = 24 }) => {
    return (
        <button
            className="w-full mb-2 bg-discord-blue-200 p-[0.2em] text-white rounded transition-colors enabled:hover:bg-discord-blue-250"
            type="submit"
            disabled={isLoading}
        >
            {isLoading ? <Rings height={height} width={width} color="white" size={6} /> : children}
        </button>
    );
};

export default LoadingButton;