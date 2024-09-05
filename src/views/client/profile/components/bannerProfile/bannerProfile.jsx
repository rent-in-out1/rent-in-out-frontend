import React from 'react';
import { FaCamera } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import Loader from '../../../../../shared/components/loader/loader';
import { useUploadWidget } from '../../../../../shared/components/uploadWidget';

const BannerProfile = () => {
	const { user } = useSelector((state) => state.userSlice);
	const { cover_img, profile_img } = useSelector((state) => state.userSlice?.user);

	// eslint-disable-next-line no-unused-vars
	const [banner, bannerCloudinaryModal, setBanner, loadBanner] = useUploadWidget({
		userID: user._id,
		folder: 'banner',
		cropping: true,
		showSkipCropButton: true,
		single: true,
	});
	// eslint-disable-next-line no-unused-vars
	const [profile, profileCloudinaryModal, setProfile, loadImg] = useUploadWidget({
		userID: user._id,
		folder: 'profile',
		cropping: true,
		showSkipCropButton: true,
		single: true,
	});
	return (
		<React.Fragment>
			<div
				className='w-full h-72 relative'
				style={{
					backgroundImage: `url(${cover_img?.url ? cover_img?.url : 'http://res.cloudinary.com/dpmpi8dwb/image/upload/v1671790055/profile/fa9y2ctozmv0nrc5vswd.jpg'} )`,
					backgroundSize: 'cover',
					backgroundPosition: 'center',
				}}
			>
				<div className='z-10 w-full h-full flex justify-center items-center'>
					<Loader load={loadBanner} height='160' width={'160'} />
				</div>
				<span className='w-24 h-24 rounded-full absolute -bottom-7 left-2 z-4 overflow-hidden md:-bottom-10 md:left-24 md:h-32 md:w-32'>
					<div className='z-10 absolute top-2 left-2 md:top-8 md:left-6'>
						<Loader load={loadImg} height='80' width={'80'} />
					</div>
					<img
						className='w-full h-full object-cover'
						src={
							profile_img?.url
								? profile_img?.url
								: 'https://images.pexels.com/photos/1137511/pexels-photo-1137511.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
						}
						alt=''
					/>
				</span>
				<span className='absolute -bottom-6 left-20 z-5 text-gray-800 cursor-pointer bg-gray-300  rounded-full p-2 hover:text-gray-500 md:-bottom-9 md:left-48'>
					<label className='custom-file-upload'>
						<div
							onClick={() => {
								profileCloudinaryModal.open();
							}}
						>
							<FaCamera className='cursor-pointer' />
						</div>
					</label>
				</span>
				<span
					onClick={() => {
						bannerCloudinaryModal.open();
					}}
					className='absolute bottom-2 right-5 text-gray-800 bg-gray-300 rounded-full p-2 hover:text-gray-500'
				>
					<label className='custom-file-upload flex items-center cursor-pointer'>
						<div>
							<FaCamera className='cursor-pointer' />
						</div>
						<span className='ml-2 font-sans font-bold capitalize'>upload banner</span>
					</label>
				</span>
			</div>
			<div className='flex justify-center'></div>
		</React.Fragment>
	);
};

export default BannerProfile;
