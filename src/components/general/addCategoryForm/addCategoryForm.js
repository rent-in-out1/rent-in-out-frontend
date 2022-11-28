
import React from "react";
import { useForm } from "react-hook-form";
import { errorHandler , doApiMethod, successHandler } from './../../../services/service';

const AddCategoryForm = (props) => {
  let {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSub = (_dataBody) => {
    let data = {
      name: _dataBody.name,
      url_name: _dataBody.url_name,
      info: _dataBody.info,
    };
    addNewCategory(data);
  };
  const addNewCategory = async (_data) => {
    let url = "/categories"
    try {
        const data = await doApiMethod(url ,"POST", _data)
        console.log(data)
        props.setIsChange(true)
        props.onAdd(false)
        // successHandler("Added new category successfully")
    }catch(err) {
        errorHandler(err.data);
    }
  };

  return (
    <div className="main m-0 p-0 w-full md:w-11/12">
    <form onSubmit={handleSubmit(onSub)}>
      <div className="w-full md:w-1/4 mb-2 p-0 md:mb-0 flex justify-center">
        <input
          {...register("name", {
            required: true,
            minLength: 2,
            maxLength: 25,
          })}
          type="text"
          placeholder="Category name"
        />
        {errors.name && <small>Enter valid category name.</small>}
      </div>
      <div className="w-full md:w-1/4 mb-2 md:mb-0 flex justify-center">
        <input
          {...register("url_name", {
            required: true,
            minLength: 2,
            maxLength: 25,
          })}
          type="text"
          placeholder="Category url name"
        />
        {errors.url_name && <small>Enter valid category url name.</small>}
      </div>
      <div className="w-full md:w-1/4 mb-2 md:mb-0 flex justify-center">
        <input
          {...register("info", {
            required: true,
            minLength: 2,
            maxLength: 25,
          })}
          type="text"
          placeholder="Category information"
        />
        {errors.info && <small>Enter valid category info.</small>}
      </div>
      <button className="w-full md:w-2/12">Save New Category</button>
    </form>
    </div>
  );
};

export default AddCategoryForm;
