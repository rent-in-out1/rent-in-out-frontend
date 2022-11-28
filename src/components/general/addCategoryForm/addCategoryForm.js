import React, { useRef, useState } from "react";
import { doApiMethod, successHandler } from "../../../services/service";
import { errorHandler } from "./../../../services/service";
import { FaCheckCircle, FaBan } from "react-icons/fa";

const AddCategoryForm = (props) => {
  const infoRef = useRef();
  const nameRef = useRef();
  const urlRef = useRef();
  const [addData, setAddData] = useState({});
  const addNewCategory = async () => {
    let url = "/categories";
    console.log(addData)
    try {
      if (
        !addData ||
        addData.name === "" ||
        addData.url_name === "" ||
        addData.info === ""
      ) {
        errorHandler("Please fill in all fields");
        return;
      }
      await doApiMethod(url, "POST", addData);
      props.setIsChange(true);
      props.setOnAdd(false);
      successHandler("Added new category successfully");
    } catch (err) {
      errorHandler(err.data);
    }
  };

  return (
    <tr>
      <td>
        <div className="w-full mb-2 md:mb-0 flex justify-center">
          <input
            onChange={() => {
              setAddData({
                name: nameRef.current.value,
                url_name: urlRef.current.value,
                info: infoRef.current.value,
              });
            }}
            ref={nameRef}
            type="text"
            max="25"
            min="2"
            placeholder="Category Name"
          />
        </div>
      </td>
      <td>
        <div className="w-full mb-2 md:mb-0 flex justify-center">
          <input
            onChange={() => {
              setAddData({
                name: nameRef.current.value,
                url_name: urlRef.current.value,
                info: infoRef.current.value,
              });
            }}
            ref={urlRef}
            type="text"
            max="25"
            min="2"
            placeholder="Category URL name"
          />
        </div>
      </td>
      <td>
        <p>***********</p>
      </td>
      <td>
        <div className="w-full mb-2 md:mb-0 flex justify-center">
          <input
            onChange={() => {
              setAddData({
                name: nameRef.current.value,
                url_name: urlRef.current.value,
                info: infoRef.current.value,
              });
            }}
            ref={infoRef}
            type="text"
            max="25"
            min="2"
            placeholder="Category Info"
          />
        </div>
      </td>
      <td>
        <p>***********</p>
      </td>
      <td>
        <p>***********</p>
      </td>
      <td>
        <p>***********</p>
      </td>
      <td>
        <p>***********</p>
      </td>
      <td>
        <span className="relative">
          <span className="absolute -bottom-4 -left-3 ">
            <span className="btn text-xl text-blue-300 relative cursor-pointer inline-block p-2 font-semibold leading-tight hover:text-green-900 ">
              <FaCheckCircle
                className="mx-2 absolute left-3 bottom-0 inset-0 opacity-50 rounded-full"
                onClick={async () => {
                  addNewCategory();
                }}
              />
            </span>
          </span>
          <span className="absolute -bottom-4 -left-3">
            <span>
              <span className="btn text-xl text-blue-300 relative cursor-pointer inline-block p-2 font-semibold leading-tight hover:text-red-900">
                <FaBan
                  onClick={() => {
                    props.setOnAdd(false);
                    setAddData({});
                    console.log(addData);
                  }}
                  className="absolute -left-4 -bottom-0 inset-0  opacity-50 rounded-full"
                />
              </span>
            </span>
          </span>
        </span>
      </td>
    </tr>
  );
};

export default AddCategoryForm;
