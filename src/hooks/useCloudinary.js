import axios from 'axios';
import React, { useState } from 'react'
import { ReactFileInputCustom } from 'react-file-input-custom';

const Cloudinary = () => {
    const [courseImagFile, setCourseImagFile] = useState(false);

    const uploadImage = async () => {
        const formData = new FormData();
        formData.append("file", courseImagFile);
        formData.append("upload_preset", "profilpreset");

        const resp = await axios.post(
            "https://api.cloudinary.com/v1_1/dgxzsxpoe/image/upload",
            formData
        );
       console.log(resp)
       return resp.data.url
    };
 
    console.log(courseImagFile)
    return (
        <div className='d-flex flex-column align-items-center   p-5'>
            <h1>Cloudinary</h1>
            <div className='col-4 col-md-3 col-lg-2 row'>
                <ReactFileInputCustom
            
                    handleChange={(e) => setCourseImagFile(e.target.files[0])}
                    classes={"p-2 w-100 w-lg-auto "}
                    text="Add picture"
                    textColor="white"
                    backgroundColor="hsl(118, 31%, 79%)"
                />
                
                <button className='btn btn-dark mt-2' onClick={uploadImage}>submit</button>
            </div>

        </div>
    )
}

export default Cloudinary