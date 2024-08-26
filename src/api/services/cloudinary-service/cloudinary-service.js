import { doApiMethod } from '../axios-service/axios-service';
import { errorHandler } from '../../../util/functions';

// TODO - Dekel use this service 
export const deleteSingleImage = async (img_id) => {
  let url = `/cloudinary/image`;
  try {
    const { data } = await doApiMethod(url, "DELETE", { img_id });
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


