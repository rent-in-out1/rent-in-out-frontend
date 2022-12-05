import axios from 'axios';
import { doApiMethod, errorHandler, successHandler } from './../services/service';
    export const uploadBanner = async (file) => {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", "rentinoutprofile");
        formData.append("cloud_name", "dpmpi8dwb");
        try{
            const resp = await axios.post(
                "https://api.cloudinary.com/v1_1/dpmpi8dwb/image/upload",
                formData
            );
           return ({url:resp.data.url , img_id: resp.data.asset_id })
        }
        catch(err){
            console.log(err)
        }
    }
    export const uploadProfile = async (file) => {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", "profilpreset");
        formData.append("cloud_name", "dgxzsxpoe");
        try{
            const resp = await axios.post(
                "https://api.cloudinary.com/v1_1/dgxzsxpoe/image/upload",
                formData
            );
           return ({url:resp.data.url , img_id: resp.data.public_id })
        }
        catch(err){
            console.log(err)
        }
    }
    export const deleteProfileImage = async (img_id) => {
        let url = "/cloudinary/profileDel/?id=" + img_id
        try {
            await doApiMethod(url , "POST")
            return successHandler(resp.data.response)
        } catch (error) {
            errorHandler(err.response.data.msg)
        }
    }
    export const deleteBannerImage = async (img_id) => {
        let url = "/cloudinary/bannerDel/?id=" + img_id
        try {
            await doApiMethod(url , "POST")
            return successHandler(resp.data.response)
        } catch (error) {
            errorHandler(err.response.data.msg)
        }
    }