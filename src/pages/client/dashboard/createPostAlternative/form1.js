import React from "react";
import {errorHandler} from "../../../../services/extra-services/extra-services";
import ImageFill from "../../../../assets/icons/imageFill";

const Form1 = ({
                   data,
                   setDisplay,
                   setImages,
                   images,
                   handleOnChange,
               }) => {
    const handleNext = () => {
        if (data.title === "") return errorHandler("You must provide a title");
        if (data.info === "") return errorHandler("You must provide a post info");
        if (data.img.length === 0)
            return errorHandler("You must provide at list one photo");
        setDisplay(true);
    }

    return (
        <React.Fragment>
            <form className="h-80 capitalize overflow-y-scroll">
                <div className="flex flex-col w-full">
                    <input
                        type="text"
                        name="title"
                        onChange={handleOnChange}
                        placeholder="Post title"
                        value={data?.title}
                    />
                    <textarea
                        className="p-2 w-full border border-gray-200 rounded-lg"
                        rows={3}
                        onChange={handleOnChange}
                        placeholder="What do you want to share?"
                        name="info"
                        value={data?.info}
                    ></textarea>
                    <select
                        onChange={handleOnChange}
                        value={data?.range}
                        className="m-0 capitalize"
                        name="range"
                    >
                        <option value="short-term">short-term</option>
                        <option value="long-term">long-term</option>
                    </select>
                </div>
                <div className="flex flex-col w-full" onClick={() => setImages.open()}>
                    <div
                        className="cursor-pointer flex flex-col items-center justify-center bg-white w-full rounded-xl p-3 h-full border border-gray-200">
                        <h2>Choose some photos</h2>
                        {images && images.length > 0 ? (
                            <h2 className="text-gray-900 top-4">Add More Photos</h2>
                        ) : null}
                        <ImageFill width={"60px"} height="60px"/>
                    </div>
                </div>
            </form>
            <div className="flex justify-end w-full mt-2">
                <button
                    onClick={() => {
                        handleNext()
                    }}
                >
                    Next
                </button>
            </div>
        </React.Fragment>
    );
};

export default Form1;
