/* eslint-disable no-undef */
import L from "leaflet";
import { OpenStreetMapProvider } from "leaflet-geosearch";
import "leaflet/dist/leaflet.css"; // Import Leaflet's CSS
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { doGetApiMethod } from "../../../../../api/services/axios-service/axios-service";
import { deleteOnCancel } from "../../../../../api/services/cloudinary-service/cloudinary-service";
import Minus from "../../../../../assets/icons/minus";
import { uploadPost } from "../../../../../redux/features/postsSlice";
import { dateToString, errorHandler } from "../../../../../util/functions";
import { getButtonsProps } from "./createPostAlternativeSecondFormProps";

const CreatePostAlternativeSecondForm = ({
  data,
  setData,
  setDisplay,
  handleOnChange,
  setOnAdd,
  images,
}) => {
  const dispatch = useDispatch();
  const [isDisable, setIsDisable] = useState(true);
  const [category, setCategory] = useState();
  const [provider] = useState(new OpenStreetMapProvider());
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [selectedAddresses, setSelectedAddresses] = useState([]);
  const [marker, setMarker] = useState(null);
  const [map, setMap] = useState(null);

  useEffect(() => {
    getCategories();
    const mapInstance = L.map("map").setView([32.0853, 34.7818], 13); // Coordinates for the center of the map
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "© OpenStreetMap contributors",
    }).addTo(mapInstance);
    setMap(mapInstance);

    return () => mapInstance.remove();
  }, []);

  useEffect(() => {
    setIsDisable(
      !(
        data.country.length > 0 &&
        data.city.length > 0 &&
        data.collect_points.length > 0 &&
        data.category_url.length > 0 &&
        data.price > 0
      )
    );
  }, [data]);

  const getCategories = () => {
    const url = "/categories";
    doGetApiMethod(url).then((response) => {
      setCategory(response.data);
    });
  };

  const handleInputChange = async (e) => {
    const inputValue = e.target.value;
    setQuery(inputValue);

    if (inputValue.length > 2) {
      const results = await provider.search({ query: inputValue });
      setSuggestions(results);
    } else {
      setSuggestions([]);
    }
  };

  const handleSelectSuggestion = (suggestion) => {
    const { x, y, label } = suggestion;
    setSuggestions([]);

    setSelectedAddresses((prevAddresses) => [...prevAddresses, suggestion]);
    setData((prevData) => ({
      ...prevData,
      collect_points: [...prevData.collect_points, suggestion],
    }));

    if (map) {
      if (marker) marker.remove();
      map.setView([y, x], 13);
      const newMarker = L.marker([y, x])
        .addTo(map)
        .bindPopup(label)
        .openPopup();
      setMarker(newMarker);
    }
    setQuery("");
  };

  const handleUpload = () => {
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

  const handleDeleteAddress = (selectedAddress) => {
    const updatedSelectedAddresses = selectedAddresses.filter(
      (address) => address.label !== selectedAddress.label
    );
    setSelectedAddresses(updatedSelectedAddresses);
    setData((prevData) => ({
      ...prevData,
      collect_points: updatedSelectedAddresses,
    }));
  };

  return (
    <React.Fragment>
      <form className="min-h-min mb-4 capitalize flex flex-col gap-3">
        <div className="flex gap-2 w-full">
          <input
            value={data?.price || ""}
            name="price"
            type="number"
            placeholder="Price"
            onChange={handleOnChange}
            min={0}
          />
          <select
            value={data?.category_url ?? "Choose Category"}
            name="category_url"
            onChange={handleOnChange}
          >
            <option value="Choose Category" className="capitalize">
              Choose Category
            </option>
            {category?.map((category) => (
              <option
                value={category?.url_name}
                key={category.name}
                className="capitalize"
              >
                {category.name}
              </option>
            ))}
          </select>
        </div>
        <div className="filters w-full flex gap-2">
          <input
            value={data?.country}
            type="text"
            name="country"
            placeholder="Country"
            onChange={handleOnChange}
          />
          <input
            value={data?.city}
            type="text"
            name="city"
            placeholder="City"
            onChange={handleOnChange}
          />
        </div>
        <div className="w-full text-start">
          <small className="ml-1">available from</small>
          <input
            value={dateToString(data?.available_from)}
            type="date"
            name="available_from"
            onChange={handleOnChange}
          />
        </div>
        <div>
          {selectedAddresses.length > 0 && (
            <>
              <small className="block text-left ml-1">
                Selected Collection Points
              </small>
              <ul className="mb-2 flex flex-col gap-1">
                {selectedAddresses.map((address) => (
                  <div
                    className="flex justify-between border rounded p-2"
                    key={address.label}
                  >
                    <li>{address.label}</li>
                    <span
                      className="cursor-pointer"
                      onClick={() => handleDeleteAddress(address)}
                    >
                      <Minus color="red" />
                    </span>
                  </div>
                ))}
              </ul>
            </>
          )}
          <div className="relative">
            <input
              type="text"
              value={query}
              onChange={handleInputChange}
              placeholder="Type an Address"
              style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
            />
            {suggestions.length > 0 && (
              <ul
                className="absolute z-[10000] w-full"
                style={{ listStyleType: "none", padding: "0", margin: "0" }}
              >
                {suggestions.map((suggestion) => (
                  <li
                    key={suggestion.label}
                    onClick={() => handleSelectSuggestion(suggestion)}
                    style={{
                      padding: "10px",
                      backgroundColor: "#fff",
                      border: "1px solid #ddd",
                      cursor: "pointer",
                    }}
                  >
                    {suggestion.label}
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div id="map" style={{ height: "500px", width: "100%" }}></div>
        </div>
      </form>
      <div className="flex justify-between px-2">
        {getButtonsProps(
          setDisplay,
          closeUploadSection,
          handleUpload,
          isDisable
        ).map((buttonsGroup, i) => (
          <div key={i}>
            {buttonsGroup.map(
              ({ handleClick, disabled, className, type, text }) => (
                <button
                  key={text}
                  onClick={handleClick}
                  disabled={disabled}
                  className={className}
                  type={type}
                >
                  {text}
                </button>
              )
            )}
          </div>
        ))}
      </div>
    </React.Fragment>
  );
};

export default CreatePostAlternativeSecondForm;
