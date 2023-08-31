import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { doApiMethod, doGetApiMethod } from "../../api/services/axios-service/axios-service";
import { errorHandler } from "../../util/functions";

export const getCatgories = createAsyncThunk(
    "categories/get",
    async ({ search, option, page }) => {
        try {
            let url = `/categories/search/?s=${search}&sort=${option}&page=${page}`;
            const { data } = await doGetApiMethod(url);
            return data;
        } catch (error) {
            errorHandler(error);
        }
    }
);
export const deleteCategory = createAsyncThunk(
    "deleteCategory/delete",
    async ({ id, name }) => {
        try {
            if (window.confirm(`Are you sure you want to delete${name}`)) {
                const url = `/categories/${id}`;
                await doApiMethod(url, "DELETE");
                return id;
            }
        } catch (error) {
            errorHandler(error);
        }
    }
);

export const editCategory = createAsyncThunk(
    "editCategory/edit",
    async ({ id, editData, setOnEdit }) => {
        const url = `/categories/${id}`;
        if (
            !editData ||
            editData.name === "" ||
            editData.url_name === "" ||
            editData.info === ""
        ) {
            errorHandler("Please fill in all fields");
            return;
        }
        try {
            if (window.confirm(`Are you sure you want to edit ${editData.name}`)) {
                setOnEdit(true);
                const { data } = await doApiMethod(url, "PUT", editData);
                setOnEdit(false);
                return { data, id };
            }
        } catch (error) {
            errorHandler(error);
        }
    }
);
export const addCategory = createAsyncThunk(
    "addCategory/add",
    async (addData) => {
        try {
            let url = "/categories";
            const { data } = await doApiMethod(url, "POST", addData);
            return data;
        } catch (error) {
            errorHandler(error);
        }
    }
);

const categoriesSlice = createSlice({
    name: "catgories",
    initialState: {
        categories: [],
        error: "",
        loading: false,
    },
    extraReducers(builder) {
        // get categories status
        builder.addCase(getCatgories.pending, (state) => {
            state.loading = true;
        })
            .addCase(getCatgories.fulfilled, (state, action) => {
                state.loading = false;
                state.categories = action.payload;
            })
            .addCase(getCatgories.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // delete categories
            .addCase(deleteCategory.pending, (state) => {
                state.loading = true;
            })
            .addCase(deleteCategory.fulfilled, (state, action) => {
                state.loading = false;
                state.categories = state.categories.filter(
                    (category) => category._id !== action.payload
                );
            })
            .addCase(deleteCategory.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // edit categories status
            .addCase(editCategory.pending, (state) => {
                state.loading = true;
            })
            .addCase(editCategory.fulfilled, (state, action) => {
                state.loading = false;
                state.categories = state.categories.filter(
                    (category) => category._id !== action.payload.id
                );
                state.categories = [...state.categories, action.payload.data.category];
            })
            .addCase(editCategory.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(addCategory.pending, (state) => {
                state.loading = true;
            })
            .addCase(addCategory.fulfilled, (state, action) => {
                state.loading = false;
                state.categories = [...state.categories, action.payload];
            })
            .addCase(addCategory.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});
export default categoriesSlice.reducer;
