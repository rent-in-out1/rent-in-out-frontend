import { doApiMethod } from '../axios-service/axios-service';
import { errorHandler } from '../../../util/functions';

export const deleteOnCancel = async (images: { img_id: string; url: string }) => {
	const url = '/posts/onCancelImgDel';
	try {
		const { data } = await doApiMethod(url, 'POST', images);
		return data.result;
	} catch (err) {
		errorHandler(err);
	}
};

export const deletePostImages = async (post_id: string) => {
	const url = `/posts/postDel/?id=${post_id}`;
	try {
		const { data } = await doApiMethod(url, 'POST');
		return data.result;
	} catch (err) {
		errorHandler(err);
	}
};

export const deleteSingleImage = async (img_id: string) => {
	const url = `/cloudinary/image`;
	try {
		const { data } = await doApiMethod(url, 'DELETE', { img_id });
		return data.result;
	} catch (err) {
		errorHandler(err);
	}
};
