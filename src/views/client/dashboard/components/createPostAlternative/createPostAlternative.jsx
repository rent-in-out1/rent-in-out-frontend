import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Wrapper } from "../../../../../assets/styles/wrappers/postUi";
import { secret } from "../../../../../util/secrets";
import { useUploadWidget } from "../../../../../shared/components/uploadWidget";
import CreatePostAlternativeFirstForm from "../createPostAlternativeFirstForm/createPostAlternativeFirstForm";
import CreatePostAlternativeSecondForm from "../createPostAlternativeSecondForm/createPostAlternativeSecondForm";

const CreatePostAlternative = ({ setOnAdd }) => {
    const [display, setDisplay] = useState(false);
    const [col, setCol] = useState(1);
    const [data, setData] = useState({
        title: "",
        range: "short-term",
        info: "",
        available_from: Date.now(),
        collect_points: [],
        price: 0,
        category_url: "",
        city: "",
        country: "",
    });
    const { user } = useSelector((state) => state.userSlice);
    const [images, setImages] = useUploadWidget({
        userID: user._id,
        cloudName: secret.POST_CLOUDINARY_NAME,
        uploadPreset: secret.POST_CLOUDINARY_PRESET,
        single: false,
        postTitle: data?.title
    });

    useEffect(() => {
        setData({ ...data, img: images });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [images]);

    const handleOnChange = (e) => {
        if (e) {
            setData({ ...data, [e.target.name]: e.target.value });
        } else {
            setData({ ...data, img: images });
        }
    };

    return (
        <Wrapper>
            <main className="mx-auto xl:w-2/3 p-3 bg-white rounded-xl drop-shadow-xl">
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
                    <CreatePostAlternativeFirstForm
                        data={data}
                        handleOnChange={handleOnChange}
                        setDisplay={setDisplay}
                        setImages={setImages}
                        images={images}
                        setOnAdd={setOnAdd}
                    />
                )}
                {display && (
                    <CreatePostAlternativeSecondForm
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
                <div className="flex justify-center"></div>
            </main>
        </Wrapper>
    );
};

export default CreatePostAlternative;
