import { doApiMethod } from '../axios-service/axios-service';
import { errorHandler } from '../../../util/functions';

export const deleteProfileImage = async (img_id) => {
    let url = `/users/cloudinary/profileDel/?id=${img_id}`;
    try {
        const { data } = await doApiMethod(url, "POST");
        return data.result;
    } catch (err) {
        errorHandler(err);
    }
};
export const deleteBannerImage = async (img_id) => {
    let url = `/users/cloudinary/bannerDel/?id=${img_id}`;
    try {
        const { data } = await doApiMethod(url, "POST");
        return data.result;
    } catch (err) {
        errorHandler(err);
    }
};
export const deletePostImages = async (post_id) => {
    let url = `/posts/postDel/?id=${post_id}`;
    try {
        const { data } = await doApiMethod(url, "POST");
        return data.result;
    } catch (err) {
        errorHandler(err);
    }
};
export const deleteOnCancel = async (images) => {
    let url = "/posts/onCancelImgDel";
    try {
        const { data } = await doApiMethod(url, "POST", images);
        return data.result;
    } catch (err) {
        errorHandler(err);
    }
}


