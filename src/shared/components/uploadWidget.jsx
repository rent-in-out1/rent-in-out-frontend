import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { uploadBanner, uploadProfileImage } from '../../redux/features/userSlice';
import { doApiMethod } from '../../api/services/axios-service/axios-service';
import { errorHandler, successHandler } from '../../util/functions';
import { secret } from '../../util/secrets';
import { deleteSingleImage } from '../../api/services/cloudinary-service/cloudinary-service';

export function useUploadWidget({
	userID = '',
	folder,
	single,
	cropping = false,
	showSkipCropButton = false,
	maxImageFileSizeMB = 5,
}) {
	const dispatch = useDispatch();
	const { cover_img, profile_img } = useSelector((state) => state.userSlice?.user);
	const [loading, setIsLoading] = useState(false);
	const [images, setImages] = useState([]);
	const maxImageFileSize = maxImageFileSizeMB * 1024 * 1024; // Convert to bytes

	// documentation here - https://cloudinary.com/documentation/upload_widget_reference
	const myWidget = window.cloudinary.createUploadWidget(
		{
			cloudName: secret.CLOUDINARY_NAME, // cloudinary cloud name
			uploadPreset: secret.CLOUDINARY_PRESET, // cloudinary upload preset
			cropping, // add a cropping step
			showAdvancedOptions: true, // add advanced options (public_id and tag)
			sources: ['local', 'url', 'google_drive'], // restrict the upload sources to URL and local files
			showSkipCropButton,
			publicId: `${userID}-${crypto.randomUUID()}`,
			multiple: !single, // restrict upload to a single file
			folder, // upload files to the specified folder
			maxImageFileSize, // restrict file size to less than 5MB
			// maxImageWidth: 500, // Scales the image down to a width of 2000 pixels before uploading
			// theme: "purple", // change to a purple theme
			clientAllowedFormats: ['image'],
		},
		async (error, result) => {
			if (!error && result && result.event === 'success') {
				setIsLoading(true);
				let image = {
					url: result.info.url,
					img_id: result.info.public_id,
				};
				single ? setImages(image) : setImages((prevImages) => [...prevImages, image]);

				if (folder === 'banner' && result.info)
					setNewCloudinaryImage({
						newImageUrl: image,
						url: '/users/uploadBanner',
						img_id: cover_img?.img_id,
						type: folder,
					});
				if (folder === 'profile' && result.info)
					setNewCloudinaryImage({
						newImageUrl: image,
						url: '/users/uploadProfile',
						img_id: profile_img?.img_id,
						type: folder,
					});
				setIsLoading(false);
			}
		}
	);

	const setNewCloudinaryImage = async ({ newImageUrl, url, img_id, type }) => {
		try {
			// TODO - try to reduce to one request (improve backend)
			let { data } = await doApiMethod(url, 'PATCH', newImageUrl);
			await deleteSingleImage(img_id);
			// upload redux parameters
			type === 'banner' ? dispatch(uploadBanner(newImageUrl)) : dispatch(uploadProfileImage(newImageUrl));
			successHandler(data.res);
		} catch (err) {
			return errorHandler(err.response.data.msg);
		}
	};

	return [images, myWidget, setImages, loading];
}
