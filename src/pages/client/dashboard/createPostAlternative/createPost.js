import React, {useState, useEffect} from "react";
import {useSelector} from "react-redux";
import Form1 from "./form1";
import Form2 from "./form2";
import {Wrapper} from "../../../../assets/styles/wrappers/postUi";
import {secret} from "../../../../services/secrets";
import {useUploadWidget} from "../../../../shared/components/uploadWidget";
import {deleteOnCancel} from "../../../../services/cloudinary-service/cloudinary-service";

const CreatePost = ({setOnAdd}) => {
    const [display, setDisplay] = useState(false);
    const [col, setCol] = useState(1);
    const [data, setData] = useState({
        title: data?.title || "",
        range: "short-term",
        info: "",
        available_from: Date.now(),
        collect_points: [],
        price: 0,
        category_url: "",
        city: "",
        country: "",
    });
    const {user} = useSelector((state) => state.userSlice);
    const [images, setImages] = useUploadWidget({
        userID: user._id,
        cloudName: secret.POST_CLOUDINARY_NAME,
        uploadPreset: secret.POST_CLOUDINARY_PRESET,
        single: false,
        postTitle: data?.title
    });

    useEffect(() => {
        setData({...data, img: images});
    }, [images]);

    const handleOnChange = (e) => {
        if (e) {
            setData({...data, [e.target.name]: e.target.value});
        } else {
            setData({...data, img: images});
        }
        console.log(data)
    };

    return (
        <Wrapper>
            <main className="mx-auto md:w-2/3 p-3 bg-white w-full rounded-xl drop-shadow-xl">
                <div className="flex items-center p-2 mx-auto space-x-2 justify-center capitalize">
                    <div>
                        {user?.fullName.firstName} {user?.fullName.lastName}
                    </div>
                    <div className="rounded-full w-8 h-8 overflow-hidden ">
                        <img
                            className="object-cover w-full h-full"
                            src={user?.profile_img.url}
                            alt="avatar"
                        />
                    </div>
                </div>
                {!display && (
                    <Form1
                        data={data}
                        handleOnChange={handleOnChange}
                        setDisplay={setDisplay}
                        setImages={setImages}
                        images={images}
                    />
                )}
                {display && (
                    <Form2
                        col={col}
                        setCol={setCol}
                        handleOnChange={handleOnChange}
                        setData={setData}
                        data={data}
                        images={images}
                        setDisplay={setDisplay}
                        setOnAdd={setOnAdd}
                    />
                )}
                <div className="  flex justify-center "></div>
            </main>
            <button
                className="btn mt-2 cursor-pointer bg-blue-400 opacity-50 rounded-full w-1/2 md:w-1/6 inline-block px-2 py-3 font-semibold leading-tight hover:text-white hover:bg-blue-600"
                type="button"
                onClick={() => {
                    setOnAdd(false);
                    // setData(initialState);
                    if (images && images.length > 0) deleteOnCancel(images);
                }}
            >
                Cancel
            </button>
        </Wrapper>
    );
};

export default CreatePost;
