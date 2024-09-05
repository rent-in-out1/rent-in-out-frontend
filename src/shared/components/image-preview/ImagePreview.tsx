import { useState } from 'react';
import ExitFill from '../../../assets/icons/exitFill';

interface IImagePreviewPropsModel {
	id: string;
	src: string;
	alt: string;
	onDeleteImg: (imgId: string) => void;
}

export const ImagePreview = ({ id, src, alt, onDeleteImg }: IImagePreviewPropsModel) => {
	const [isCloseShown, setIsCloseShown] = useState(false);

	const imgStyle = {
		clipPath: 'circle(50%)',
	};

	return (
		<div
			onMouseEnter={() => setIsCloseShown(true)}
			onMouseLeave={() => setIsCloseShown(false)}
			className='relative w-[150px]'
			style={{ margin: 0 }}
		>
			{isCloseShown && (
				<div className='absolute -right-2 -top-2 cursor-pointer rounded-full' onClick={() => onDeleteImg(id)}>
					<ExitFill color='#333333' style={imgStyle} />
				</div>
			)}
			<img className='w-full rounded-2xl' src={src} alt={alt} />
		</div>
	);
};
