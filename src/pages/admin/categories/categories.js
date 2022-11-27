import React, { useEffect, useState } from "react";
import { doGetApiMethod } from "../../../services/service";
import { Wrapper } from "../../../components/style/wrappers/table";
import CategoryItem from "./categoryItem";
import { Input } from "./../../../components/style/wrappers/category";
import { useForm } from "react-hook-form";
const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [isChange, setIsChange] = useState(false);
  const [onAdd, setOnAdd] = useState(true);
  let {
    register,
    getValues,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const getAllcategories = async () => {
    let url = "/categories";
    const { data } = await doGetApiMethod(url);
    console.log(data);
    setCategories(data);
    setIsChange(false);
  };
  useEffect(() => {
    getAllcategories();
  }, [isChange]);
  return (
    <>
      <Wrapper>
        <Input>
          <h1>Categories</h1>
          <div className="flex justify-center">
            <table>
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
{ onAdd && <tr>
                  <td>
                    <div className="w-full mb-2 md:mb-0 flex justify-center">
                      <input
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
                  </td>
                  <td>
                    <div className="w-full mb-2 md:mb-0 flex justify-center">
                      <input
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
                  </td>
                  <td>
                    <div className="w-full mb-2 md:mb-0 flex justify-center">
                      <input
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
                  </td>
                  <td>
                    <div className="w-full mb-2 md:mb-0 flex justify-center">
                      <input
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
                  </td>
                  <td>
                    <div className="w-full mb-2 md:mb-0 flex justify-center">
                      <input
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
                  </td>
                  <td>
                    <div className="w-full mb-2 md:mb-0 flex justify-center">
                      <input
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
                  </td>
                  <td>
                    <div className="w-full mb-2 md:mb-0 flex justify-center">
                      <input
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
                  </td>
                  <td>
                    <div className="w-full mb-2 md:mb-0 flex justify-center">
                      <input
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
                  </td>
                </tr>}
              </tbody>
            </table>
          </div>
        </Input>
      </Wrapper>
    </>
  );
};

export default Categories;
