import axios from 'axios';
    export const uploadImage = async (file) => {
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
    export const deleteImage = async (file) => {
        // cloudinary.v2.uploader.destroy(imageData.public_id, function(error,result) {
        // console.log(result, error) })
        // .then(resp => console.log(resp))
        // .catch(_err=> console.log("Something went wrong, please try again later."));
    }