import React, { useEffect, useState } from "react";
import { doGetApiMethod } from "../../../services/service";
import { Wrapper } from "../../../components/style/wrappers/table";
import CategoryItem from './categoryItem';

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [isChange , setIsChange] = useState(false);
  
  const getAllcategories = async () => {
    let url = "/categories";
    const { data } = await doGetApiMethod(url);
    console.log(data)
    setCategories(data);
    setIsChange(false)
  };
  useEffect(() => {
    getAllcategories()
  }, [isChange]);
  return (
    <>
    <Wrapper>
      <h1>Categories</h1>
      <div className="flex justify-center">
        <table>
          <thead>
            <tr>
              <th>Title</th>
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
              <CategoryItem key={category._id} item={category} setIsChange={setIsChange} />
            ))}
          </tbody>
        </table>
      </div>
    </Wrapper>

</>
  )
}

export default Categories