import React, { useEffect, useState } from "react";
import { doGetApiMethod } from "../../../services/service";
import { Wrapper } from "../../../components/style/wrappers/table";
import CategoryItem from "./categoryItem";
import { Input } from "./../../../components/style/wrappers/category";

import AddCategoryForm from "../../../components/general/addCategoryForm/addCategoryForm";
const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [isChange, setIsChange] = useState(false);
  const [onAdd, setOnAdd] = useState(false);

  const getAllcategories = async () => {
    let url = "/categories";
    const { data } = await doGetApiMethod(url);
    setCategories(data);
    setIsChange(false);
  };
  useEffect(() => {
    getAllcategories();
  }, [isChange, onAdd]);
  return (
      <Wrapper className="mb-4">
        <Input>
          <h1>Categories</h1>
          <main className="container-fluid">
            <table className="m-auto">
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
                  />
                ))}
              </tbody>
            </table>
            
            {!onAdd ? (
              <button type="button" onClick={() => setOnAdd(true)}>
                
                Add New Category
              </button>
            ): null}
          {onAdd && <AddCategoryForm setOnAdd={setOnAdd} setIsChange={setIsChange}/>}
          </main>
        </Input>
      </Wrapper>
  );
};

export default Categories;
