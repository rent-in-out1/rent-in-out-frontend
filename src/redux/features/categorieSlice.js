import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { doApiMethod, doGetApiMethod } from "./../../services/service";
import { errorHandler } from "./../../services/service";
export const getCatgories = createAsyncThunk(
  "categories/get",
  async ({ search, option, page }) => {
    try {
      let url = `/categories/search/?s=${search}&sort=${option}&page=${page}`;
      const { data } = await doGetApiMethod(url);
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);
export const deleteCategory = createAsyncThunk(
  "deleteCategory/delete",
  async ({ id, name }) => {
    try {
      if (window.confirm(`Are you sure you want to delete${name}`)) {
        const url = "/categories/" + id;
        await doApiMethod(url, "DELETE");
        return id;
      }
    } catch (error) {
      console.log(error);
    }
  }
);

export const editCategory = createAsyncThunk(
  "editCategory/edit",
  async ({ id, editData, setOnEdit }) => {
    const url = "/categories/" + id;
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
        const {data} = await doApiMethod(url, "PUT", editData);
        // console.log(data)
        setOnEdit(false);
        return { data, id };
      }
    } catch (error) {
      console.log(error);
    }
  }
);
export const addCategory = createAsyncThunk(
  "addCategory/add",
  async ( addData ) => {
    console.log(addData)
    try {
      let url = "/categories";
      const {data} = await doApiMethod(url, "POST", addData);
      // console.log(data)
      return data
    } catch (error) {
      console.log(error);
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
  extraReducers: {
    // get categories status
    [getCatgories.pending]: (state, action) => {
      state.loading = true;
    },
    [getCatgories.fulfilled]: (state, action) => {
      state.loading = false;
      state.categories = action.payload;
    },
    [getCatgories.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    // delete categories
    [deleteCategory.pending]: (state, action) => {
      state.loading = true;
    },
    [deleteCategory.fulfilled]: (state, action) => {
      state.loading = false;
      state.categories = state.categories.filter(
        (category) => category._id !== action.payload
      );
    },
    [deleteCategory.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    // edit categories status
    [editCategory.pending]: (state, action) => {
      state.loading = true;
    },
    [editCategory.fulfilled]: (state, action) => {
      state.loading = false;
      state.categories = state.categories.filter(
        (category) => category._id !== action.payload.id
      );
      state.categories= [...state.categories,action.payload.data.category]
    },
    [editCategory.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    [addCategory.pending]: (state, action) => {
      state.loading = true;
    },
    [addCategory.fulfilled]: (state, action) => {
      state.loading = false;
      state.categories= [...state.categories,action.payload]
    },
    [addCategory.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});
// export const { createNewCategory } = categoriesSlice.actions;
export default categoriesSlice.reducer;
