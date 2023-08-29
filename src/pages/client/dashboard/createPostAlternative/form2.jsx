import { OpenStreetMapProvider } from "leaflet-geosearch";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import Minus from "../../../../assets/icons/minus";
import Plus from "../../../../assets/icons/plus";
import { uploadPost } from "../../../../redux/features/postsSlice";
import { doGetApiMethod } from "../../../../services/axios-service/axios-service";
import { deleteOnCancel } from "../../../../services/cloudinary-service/cloudinary-service";
import { errorHandler } from "../../../../services/extra-services/extra-services";

const Form2 = ({
  col,
  setCol,
  data,
  setData,
  setDisplay,
  handleOnChange,
  setOnAdd,
  images
}) => {
  let searchProvider = new OpenStreetMapProvider();
  const dispatch = useDispatch();
  const colRef = useRef();
  const [category, setCategory] = useState();
  let [collections, setCollections] = useState([]);
  const [collection, setCollection] = useState({ val: "", i: 0 });
  useEffect(() => {
    allCategories();
  }, []);

  const allCategories = async () => {
    const url = "/categories";
    const { data } = await doGetApiMethod(url);
    setCategory(data);
  };
  const handleCollectionPoints = async () => {
    if (collection.val === "")
      return errorHandler("Please provide valid address");
    let result = await searchProvider.search({ query: collection.val });
    if (result.length === 0) return errorHandler("Couldn't find the adrress");
    else if (collections.some((el) => el.label === result[0].label))
      return errorHandler("Address is already exists or not valid");
    else {
      let res = { x: result[0].x, y: result[0].y, label: result[0].label };
      setCollections([...collections, (collections[collection.i] = res)]);
      setData({ ...data, collect_points: [...collections] });
      if (col >= 1) setCol(col + 1);
    }
  };
  const handleRemoveCollectPoint = (index) => {
    collections = collections.filter((col, i) => i !== index);
    setCollections(collections);
    setData({ ...data, collect_points: [...collections] });
    if (col !== 1) setCol(col - 1);
  };
  const handleUpload = async () => {
    if (data.collect_points.length === 0)
      return errorHandler("You must provide at list one collection point");
    if (data.price === "") return errorHandler("You must provide a price");
    if (data.category_url === "")
      return errorHandler("You must choose category");
    if (data.collect_points[0] === "Collection point number 1")
      return errorHandler("You must provide at list one collection point");
    if (data.country === "") return errorHandler("You must provide country");
    if (data.city === "") return errorHandler("You must provide city");
    dispatch(uploadPost(data));
    setOnAdd(false);
  };

  const closeUploadSection = () => {
    setOnAdd(false);
    if (images && images.length > 0) deleteOnCancel(images);
  };

  return (
    <React.Fragment>
      <form className="min-h-min mb-4 overflow-y-scroll capitalize">
        <div className="flex-flex-col content-between w-full ">
          <div className="flex w-full">
            <input
              value={data?.price}
              className="mt-2 mr-1"
              name="price"
              type="number"
              placeholder="Price"
              onChange={handleOnChange}
              min={0}
            />
            <select
              value={data?.category_url ? data.category_url : "Choose Category"}
              name="category_url"
              className="mt-2"
              onChange={handleOnChange}
            >
              <option value="Choose Category" className="capitalize">
                Choose Category
              </option>
              {category?.map((category, i) => (
                <option
                  value={category?.url_name}
                  key={i}
                  className="capitalize"
                >
                  {category.name}
                </option>
              ))}
            </select>
          </div>
          <div className="filters w-full flex ">
            <div className="w-1/2 mr-1">
              <input
                value={data?.country}
                type="text"
                name="country"
                placeholder="Country"
                onChange={handleOnChange}
              />
            </div>
            <div className="w-full md:w-1/2 px-1 mt-2  md:mb-0 ">
              <input
                value={data?.city}
                type="text"
                name="city"
                placeholder="City"
                onChange={handleOnChange}
              />
            </div>
          </div>
          <div className="w-full text-start px-1 mt-2  md:mb-0 ">
            <small className="ml-1">available from</small>
            <input
              value={data?.available_from}
              type="date"
              name="available_from"
              onChange={handleOnChange}
            />
          </div>
          <div className="border rounded bg-gray-200 p-2 flex w-full">
            <div className="w-full">
              <h2>Collection Points</h2>
              {[...Array(col)].map((collect, i) => (
                <div key={i} className="flex items-center justify-between">
                  <div className="w-full md:mb-0">
                    <input
                      onChange={() =>
                        setCollection({ val: colRef.current.value, i })
                      }
                      ref={colRef}
                      name="collect_points"
                      type="text"
                      placeholder={`Collection point number ${i + 1}`}
                    />
                  </div>
                  {col === i + 1 ? (
                    <div className="flex items-center justufy-center">
                      <span
                        onClick={() => {
                          handleCollectionPoints();
                        }}
                        className="pl-2 cursor-pointer"
                      >
                        <Plus color="green" />
                      </span>
                      <small
                        onClick={() => handleCollectionPoints()}
                        className="rounded-xl bg-green-200 p-1 text-xs cursor-pointer"
                      >
                        Check
                      </small>
                    </div>
                  ) : (
                    <span
                      onClick={() => {
                        handleRemoveCollectPoint(i);
                      }}
                      className="pl-2 cursor-pointer"
                    >
                      <Minus color="red" />
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </form>
      <div className="flex justify-between px-2">
        <button onClick={() => setDisplay(false)} className="flex-shrink-0 border-transparent py-2 border-4 px-6 md:px-8 md:py-2 text-sm md:text-base cursor-pointer text-blue-400 hover:text-blue-700 rounded-xl" type="button">
          Back
        </button>
        <div className="flex items-center">
          <button className="flex-shrink-0 border-transparent py-2 border-4 px-6 md:px-8 md:py-2 text-sm md:text-base cursor-pointer text-blue-400 hover:text-blue-700 rounded-xl" type="button"
            onClick={() => closeUploadSection()}>
            Cancel
          </button>
          <button
            onClick={() => {
              handleUpload();
            }}
            className="flex-shrink-0 border-transparent hover:border-transparent active:border-transparent bg-blue-400 hover:bg-blue-700 px-6 md:px-8 md:py-2 text-sm md:text-base cursor-pointer text-white rounded-xl"
            type="submit"
          >
            Upload
          </button>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Form2;
