import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { uploadBanner, uploadProfileImage } from "../../redux/features/userSlice";
import { doApiMethod } from '../../api/services/axios-service/axios-service';
import { deleteBannerImage, deleteProfileImage } from "../../api/services/cloudinary-service/cloudinary-service";
import { errorHandler, successHandler } from "../../util/functions";
import { secret } from "../../util/secrets";

export function useUploadWidget({
    userID = "",
    postTitle = "",
    cloudName,
    uploadPreset,
    single
}) {
    const dispatch = useDispatch();
    const { cover_img, profile_img } = useSelector(
        (state) => state.userSlice?.user
    );
    const [loading, setIsLoading] = useState(false);
    const [images, setImages] = useState([]);
    // const cloudName = "dva5ypcfd";
    // const uploadPreset = "postImages"
    // Remove the comments from the code below to add
    // additional functionality.
    // Note that these are only a few examples, to see
    // the full list of possible parameters that you
    // can add see:
    //   https://cloudinary.com/documentation/upload_widget_reference

    let myWidget = window.cloudinary.createUploadWidget(
        {
            cloudName: cloudName,
            uploadPreset: uploadPreset,
            cropping: single, //add a cropping step
            // showAdvancedOptions: true,  //add advanced options (public_id and tag)
            sources: ["local", "url", "google_drive"], // restrict the upload sources to URL and local files
            showSkipCropButton: single, //
            multiple: !single, //restrict upload to a single file
            folder: `${userID}/${postTitle}`, //upload files to the specified folder
            // tags: ["users", "profile"], //add the given tags to the uploaded files
            // context: {alt: "user_uploaded"}, //add the given context data to the uploaded files
            // clientAllowedFormats: ["images"], //restrict uploading to image files only
            // maxImageFileSize: 2000000,  //restrict file size to less than 2MB
            maxImageWidth: 500, //Scales the image down to a width of 2000 pixels before uploading
            // theme: "purple", //change to a purple theme
        },
        async (error, result) => {
            if (!error && result && result.event === "success") {
                setIsLoading(false);
                let image = {
                    url: result.info.url,
                    img_id: result.info.public_id,
                };
                if (single) setImages(image);
                else if (!single) {
                    setImages(images => [...images, image]);
                }
                if (cloudName === secret.BANNER_CLOUDINARY_NAME && result.info) changeBanner(image);
                if (cloudName === secret.PROFILE_CLOUDINARY_NAME && result.info) changeProfile(image);
            }
        }
    );
    const changeBanner = async (_img) => {
        try {
            const urlR = "/users/uploadBanner";
            let res = await doApiMethod(urlR, "PATCH", _img);
            await deleteBannerImage(cover_img?.img_id);
            dispatch(uploadBanner(_img));
            successHandler(res);
        } catch (err) {
            return errorHandler(err.response.data.msg);
        }

    };
    const changeProfile = async (_img) => {
        try {
            const urlR = "/users/uploadProfile";
            let res = await doApiMethod(urlR, "PATCH", _img);
            await deleteProfileImage(profile_img?.img_id);
            dispatch(uploadProfileImage(_img));
            successHandler(res);
        } catch (err) {
            return errorHandler(err.response.data.msg);
        }
    };
    return [images, myWidget, loading];

}
