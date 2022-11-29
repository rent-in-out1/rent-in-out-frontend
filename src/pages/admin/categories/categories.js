import React, { useEffect, useState } from "react";
import { doGetApiMethod } from "../../../services/service";
import { Wrapper } from "../../../components/style/wrappers/table";
import CategoryItem from "./categoryItem";
import { Input } from "./../../../components/style/wrappers/category";

import AddCategoryForm from "../../../components/general/addCategoryForm/addCategoryForm";
import Controllers from './../../../components/controllers/controllers';
const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [isChange, setIsChange] = useState(false);
  const [onAdd, setOnAdd] = useState(false);
  const [search, setSearch] = useState("");
  const [option, setOption] = useState();
  const options =
  [{ name: "Title", value: "name" },
  { name: "Date created", value: "createdAt" },
  { name: "Date updated", value: "updatedAt" }]

  const getAllcategories = async () => {
    let url = `/categories/search/?s=${search}&sort=${option}`;
    const { data } = await doGetApiMethod(url);
    setCategories(data);
    setIsChange(false);
  };
  useEffect(() => {
    getAllcategories();
  }, [isChange, onAdd , search, option]);
  return (
    <Wrapper className="mb-4">
      <Controllers
        title={"Categories"}
        options={options}
        setSearch={setSearch}
        setOption={setOption}
      />
      <div className="justify-center">
          <table className="m-auto table-fixed">
            <thead>
              <tr>
                <th>Title</th>
                <th>url name</th>
                <th>Created by</th>
                <th>info</th>
                <th>created at</th>
                <th>updated at</th>
                <th>edit</th>
                <th>last edit by</th>
                <th>delete</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((category) => (
                <CategoryItem
                  key={category._id}
                  item={category}
                  setIsChange={setIsChange}
                  isChange={isChange}
                />
              ))}
              {onAdd && (
                <AddCategoryForm
                  setOnAdd={setOnAdd}
                  setIsChange={setIsChange}
                />
              )}
            </tbody>
          </table>

          {!onAdd ? (
            <div className="flex justify-center">
              <button
                className="btn cursor-pointer bg-blue-400 opacity-50 rounded-full w-full md:w-1/6 inline-block px-2 py-3 font-semibold leading-tight hover:text-white hover:bg-blue-600"
                type="button"
                onClick={() => setOnAdd(true)}
              >
                Add New Category
              </button>
            </div>
          ) : null}
          </div>
    </Wrapper>
  );
};

export default Categories;
