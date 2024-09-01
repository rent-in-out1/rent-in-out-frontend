import React, { useEffect, useState } from "react";
import ImageFill from "../../../../../assets/icons/imageFill";
import {
  deleteOnCancel,
  deleteSingleImage,
} from "../../../../../api/services/cloudinary-service/cloudinary-service";
import { errorHandler } from "../../../../../util/functions";
import { ImagePreview } from "../../../../../shared/components/image-preview/ImagePreview";
const CreatePostAlternativeFirstForm = ({
  data,
  setDisplay,
  setImages,
  images,
  handleOnChange,
  setOnAdd,
  cloudinaryModal,
}) => {
  const [isDisable, setIsDisable] = useState(true);

  useEffect(() => {
    setIsDisable(
      !(data.title.length > 0 && data.info.length > 0 && data.img.length > 0)
    );
  }, [data]);

  const handleNext = () => {
    if (data.title === "") return errorHandler("You must provide a title");
    if (data.info === "") return errorHandler("You must provide a post info");
    if (data.img.length === 0)
      return errorHandler("You must provide at list one photo");
    setDisplay(true);
  };

  const closeUploadSection = () => {
    setOnAdd(false);
    if (images && images.length > 0) deleteOnCancel(images);
  };

  const handleDeleteImg = (imgId) => {
    const updatedImageList = images.filter((img) => img.img_id !== imgId);
    setImages(updatedImageList);
    deleteSingleImage(imgId);
  };

  return (
    <>
      <form className="h-80 capitalize overflow-auto flex flex-col gap-2">
        <div className="flex flex-col w-full gap-2">
          {/* post title */}
          <input
            type="text"
            name="title"
            onChange={handleOnChange}
            placeholder="Post title"
            value={data?.title}
          />

          {/* description */}
          <textarea
            className="p-2 w-full border border-gray-200 rounded-lg"
            rows={3}
            onChange={handleOnChange}
            placeholder="What do you want to share?"
            name="info"
            value={data?.info}
          ></textarea>

          {/* term options */}
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
        {/* upload post */}
        {!images.length > 0 ? (
          <div
            className="flex flex-col w-full"
            onClick={() => cloudinaryModal.open()}
          >
            <div className="cursor-pointer text-gray-500 flex flex-col items-center justify-center bg-white w-full rounded-xl p-3 h-full border border-gray-200">
              <h3 className="mb-2">Upload Images</h3>
              {images && images.length > 0 ? (
                <h2 className="text-gray-900 top-4">Upload More</h2>
              ) : null}
              <ImageFill width={"60px"} height="60px" />
            </div>
          </div>
        ) : (
          // images uploaded
          <div className="overflow-auto border flex gap-5 p-4">
            {images.map((img) => (
              <ImagePreview
                key={img.img_id}
                id={img.img_id}
                src={img.url}
                alt={img.alt}
                onDeleteImg={() => handleDeleteImg(img.img_id)}
              ></ImagePreview>
            ))}
          </div>
        )}
      </form>
      <div className="flex justify-end mt-2 mr-4">
        <button
          className="flex-shrink-0 border-transparent focus:outline-none py-2 px-6 md:px-8 md:py-2 text-sm md:text-base cursor-pointer text-blue-400 hover:text-blue-700 rounded-xl"
          type="button"
          onClick={() => closeUploadSection()}
        >
          Cancel
        </button>
        <button
          disabled={isDisable}
          className="flex-shrink-0 border-transparent focus:outline-none hover:border-transparent active:border-transparent bg-blue-400 hover:bg-blue-700 px-6 md:px-8 md:py-2 text-sm md:text-base cursor-pointer text-white rounded-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:text disabled:hover:bg-blue-400"
          type="submit"
          onClick={() => {
            handleNext();
          }}
        >
          Next
        </button>
      </div>
    </>
  );
};

export default CreatePostAlternativeFirstForm;
