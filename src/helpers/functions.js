import axios from 'axios';
    export const uploadImage = async (file) => {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("api_key",'723814448645719');
        formData.append("upload_preset", "rentinoutprofile");
        formData.append("cloud_name", "dpmpi8dwb");
        try{
            const resp = await axios.post(
                "https://api.cloudinary.com/v1_1/dpmpi8dwb/image/upload",
                formData
            );
           return resp.data.url
        }
        catch(err){
            console.log(err)
        }
    }