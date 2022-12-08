import { createAsyncThunk , createSlice } from "@reduxjs/toolkit";
import { doApiMethod, doGetApiMethod } from './../../services/service';

export const getCatgories = createAsyncThunk(
  "categories/get",
  async ({ search, option , page}) => {
    try {
      let url = `/categories/search/?s=${search}&sort=${option}&page=${page}`;
      const { data } = await doGetApiMethod(url);
      return data
    } catch (error) {
      console.log(error);
    }
  }
);

const categoriesSlice = createSlice({
    name: 'catgories',
    initialState: {
        categories: [],
        error: "",
        loading: false
    },
    reducers:{
        createNewCategory: async (state , action)=>{
            try {
                let url = "/categories";
                await doApiMethod(url, "POST", action.payload);  
            } catch (error) {
                console.log(error)
            }
        },
        deleteCategory: (state , action)=>{

        },
        editCategory: (state , action)=>{

        },
    },
    extraReducers:{
        [getCatgories.pending] :(state , action)=>{
            state.loading = true;
        },
        [getCatgories.fulfilled] :(state, action) =>{
            state.loading = false;
            state.categories = action.payload
            console.log(action.payload)
        },
        [getCatgories.rejected] :(state , action) =>{
            state.loading = false;
            state.error = action.payload
        }

    }
})
export const { createNewCategory , editCategory , deleteCategory} = categoriesSlice.actions
export default categoriesSlice.reducer