import React ,{ useState, useEffect } from 'react'
import { BsTrash , BsHammer } from 'react-icons/bs';
import { doApiMethod } from '../../../services/service';
import { doGetApiMethod } from './../../../services/service';

const CategoryItem = (props) => {
  const [creator, setCreator] = useState({});
  const [editor, setEditor] = useState({});
  const category = props.item
  useEffect(() => {
    getCreator();
    getEditor()
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
  const editCategory = async (_id, categoryName) => {
    const url = "/categories/" + _id;
    if (window.confirm(`Are you sure you want to edit ${categoryName}`)) {
      await doApiMethod(url, "PUT");
    }
  };
  return (
    <tr>
    <td>
      <div className="flex items-center">
        <div className="flex-shrink-0 w-8 h-8">
          <img
            className="w-full h-full rounded-full"
            src={category?.img_url}
            alt={category?.img_url}
          />
        </div>
        <div className="ml-3">
          <p className="text-gray-900 whitespace-no-wrap">{category?.name}</p>
        </div>
      </div>
    </td>
    <td>
      <p className="text-gray-900 whitespace-no-wrap">          
      {creator.data?.userInfo.fullName.firstName}{" "}
      {creator.data?.userInfo.fullName.lastName}</p>
    </td>
    <td>
      <p className="text-gray-900 whitespace-no-wrap">{category?.category_url}</p>
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
        <span className="relative">
          <BsHammer />
        </span>
      </span>
    </td>
    <td>
      <p className="text-gray-900 whitespace-no-wrap">          
      {editor.data?.userInfo.fullName.firstName}{" "}
      {editor.data?.userInfo.fullName.lastName}</p>
    </td>
    <td>
      <span
        onClick={() => {
          deleteCategory(category._id, category.title);
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
  )
}

export default CategoryItem