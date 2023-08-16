import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Wrapper } from "../../../assets/styles/wrappers/table";
import { getCatgories } from "../../../redux/features/categorieSlice";
import PageNav from '../../../shared/UI/page-nav';
import Controllers from "../../../shared/components/controllers";
import AddCategoryForm from "./addCategoryForm";
import CategoryItem from "./categoryItem";

const Categories = () => {
    const dispatch = useDispatch();
    const { categories } = useSelector((state) => state.categoriesSlice);
    const [isChange, setIsChange] = useState(false);
    const [onAdd, setOnAdd] = useState(false);
    const [search, setSearch] = useState("");
    const [option, setOption] = useState();
    const [page, setPage] = useState(1);

    const options = [
        { name: "Title", value: "name" },
        { name: "Date created", value: "createdAt" },
        { name: "Date updated", value: "updatedAt" },
    ];
    const categories_headers = [
        "Title", "url name", "Created by", "info", "created at", "updated at", "edit", "last edit by", "delete"
    ];

    useEffect(() => {
        dispatch(getCatgories({ search, option, page }));
    }, [page, option, search]);
    return (
        <Wrapper className="mb-2">
            <Controllers
                title={"Categories"}
                options={options}
                setSearch={setSearch}
                setOption={setOption}
            />
            <PageNav
                urlPageApi={"/categories/count"}
                perPage={10}
                setPage={setPage}
                page={page}
                setIsChange={setIsChange}
                cssClass="flex justify-center justify-between p-3 items-center justify-center w-10/12 md:w-8/12 mx-auto"
            />
            <div className="wrapper">
                <table>
                    <thead>
                        <tr>
                            {categories_headers.map((header, i) => (
                                <th key={i}>{header}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {categories?.map((category) => (
                            <CategoryItem
                                key={category?._id}
                                item={category}
                                setIsChange={setIsChange}
                                isChange={isChange}
                            />
                        ))}
                        {onAdd && (
                            <AddCategoryForm setOnAdd={setOnAdd} setIsChange={setIsChange} />
                        )}
                    </tbody>
                </table>
            </div>
            {!onAdd ? (
                <div className="flex justify-center mt-2 mb-8">
                    <button
                        className="btn cursor-pointer bg-blue-400 opacity-50 rounded-full w-full md:w-1/6 inline-block px-2 py-3 font-semibold leading-tight hover:text-white hover:bg-blue-600"
                        type="button"
                        onClick={() => setOnAdd(true)}
                    >
                        Add New Category
                    </button>
                </div>
            ) : null}
        </Wrapper>
    );
};

export default Categories;
