import React, { useState, useEffect, useRef } from "react";
import { BsTrash, BsHammer, BsEnvelopeOpenFill } from "react-icons/bs";
import { useForm } from "react-hook-form";
import { FaRegEdit, FaServer } from "react-icons/fa";
import { uploadImage } from "../../../helpers/functions";
import { doApiMethod } from "../../../services/service";
import { doGetApiMethod } from "./../../../services/service";

const CategoryItem = (props) => {
  let {
    register,
    getValues,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const profileRef = useRef();
  const [creator, setCreator] = useState({});
  const [editor, setEditor] = useState({});
  const [image, setImage] = useState("");
  const [onEdit, setOnEdit] = useState(false);

  const category = props.item;
  useEffect(() => {
    getCreator();
    getEditor();
  }, []);
  const getCreator = async () => {
    let url = "/users/info/" + category?.creator_id;
    let data = await doGetApiMethod(url);
    setCreator(data);
  };
  const getEditor = async () => {
    let url = "/users/info/" + category?.editor_id;
    let data = await doGetApiMethod(url);
    setEditor(data);
  };
  const deleteCategory = async (_id, categoryName) => {
    if (window.confirm(`Are you sure you want to delete ${categoryName}`)) {
      const url = "/categories/" + _id;
      await doApiMethod(url, "DELETE");
    }
  };
  const changeProfile = async (file) => {
    if (file.size > 2 * 1024 * 1024) {
      return alert("file too big");
    }
    const url = await uploadImage(file);
    setImage(url);
  };
  const editCategory = async (_id, categoryName) => {
    const url = "/categories/" + _id;
    if (window.confirm(`Are you sure you want to edit ${categoryName}`)) {
      setOnEdit(true);
      await doApiMethod(url, "PUT");
    }
  };
  return (
    <tr>
      <td>
        {!onEdit ? (
          <p className="text-gray-900 whitespace-no-wrap">{category?.name}</p>
        ) : (
          <div className="w-full mb-2 md:mb-0 flex justify-center">
            <input
              defaultValue={category?.name}
              {...register("name", {
                required: true,
                minLength: 2,
                maxLength: 25,
              })}
              type="text"
            />
            {errors.name && <small>Enter valid category name.</small>}
          </div>
        )}
      </td>
      <td>
        {!onEdit ? (
          <p className="text-gray-900 whitespace-no-wrap">
            {category?.url_name}
          </p>
        ) : (
          <div className="w-full mb-2 md:mb-0 flex justify-center">
            <input
              disabled
              defaultValue={category?.name}
              {...register("name", {
                required: true,
                minLength: 2,
                maxLength: 25,
              })}
              type="text"
              placeholder=""
            />
            {errors.name && <small>Enter valid category name.</small>}
          </div>
        )}
      </td>
      <td>
        <p className="text-gray-900 whitespace-no-wrap">
          {creator.data?.userInfo.fullName.firstName}{" "}
          {creator.data?.userInfo.fullName.lastName}
        </p>
      </td>
      <td>
        {!onEdit ? (
          <p className="text-gray-900 whitespace-no-wrap">{category?.info}</p>
        ) : (
          <div className="w-full mb-2 md:mb-0 flex justify-center">
            <input
              defaultValue={category?.info}
              {...register("name", {
                required: true,
                minLength: 2,
                maxLength: 50,
              })}
              type="text"
            />
            {errors.name && <small>Enter valid category info.</small>}
          </div>
        )}
      </td>
      <td>
        <p className="text-gray-900 whitespace-no-wrap">
          {category?.craetedAt.split("T")[0]}
        </p>
      </td>
      <td>
        <p className="text-gray-900 whitespace-no-wrap">
          {category?.updatedAt.split("T")[0]}
        </p>
      </td>
      <td>
        <span
          onClick={() => {
            editCategory(category._id, category.title);
            props.setIsChange(true);
          }}
          className="btn relative cursor-pointer inline-block px-2 py-2 font-semibold leading-tight hover:text-red-900"
        >
          <span
            aria-hidden
            className={"absolute inset-0 bg-red-200 opacity-50 rounded-full"}
          ></span>
          {!onEdit ? (
            <span className="relative">
              <BsHammer
                onClick={() => {
                  setOnEdit(true);
                }}
              />
            </span>
          ) : (
            <div className="flex">
              <div>
                <FaRegEdit
                  className="mx-2"
                  onClick={() => {
                    editCategory(category?._id, category?.name);
                  }}
                />
              </div>
              <div>
                <FaServer />
              </div>
            </div>
          )}
        </span>
      </td>
      <td>
        <p className="text-gray-900 whitespace-no-wrap">
          {editor.data?.userInfo.fullName.firstName}{" "}
          {editor.data?.userInfo.fullName.lastName}
        </p>
      </td>
      <td>
        <span
          onClick={() => {
            deleteCategory(category._id, category.name);
            props.setIsChange(true);
          }}
          className="btn relative cursor-pointer inline-block px-2 py-2 font-semibold leading-tight hover:text-red-900"
        >
          <span
            aria-hidden
            className={"absolute inset-0 bg-red-200 opacity-50 rounded-full"}
          ></span>
          <span className="relative">
            <BsTrash />
          </span>
        </span>
      </td>
    </tr>
  );
};

export default CategoryItem;
