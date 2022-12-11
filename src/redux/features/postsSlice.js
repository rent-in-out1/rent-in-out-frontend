import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { doApiMethod, doGetApiMethod } from "../../services/service";

export const getPosts = createAsyncThunk(
  "posts/get",
  async ({
    search = "",
    option = "",
    page = 1,
    min = 0,
    max = 10000,
    endScreenEnd,
    setPage,
  }) => {
    try {
      console.log(page);
      let url = `/posts/search/?s=${search}&sort=${option}&page=${page}&min=${min}&max=${max}`;
      let { data } = await doGetApiMethod(url);
      endScreenEnd();
      setPage(page + 1);
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);
export const deletePost = createAsyncThunk(
  "deletePost/delete",
  async ({ id, name }) => {
    try {
      if (window.confirm(`Are you sure you want to delete${name}`)) {
        const url = "/posts/" + id;
        await doApiMethod(url, "DELETE");
        return id;
      }
    } catch (error) {
      console.log(error);
    }
  }
);
export const likePost = createAsyncThunk("likePost/like", async ({ id }) => {
  try {
    const url = "/posts/likePost/" + id;
    let { data } = await doApiMethod(url, "POST");
    // console.log(data);
    return { data, id };
  } catch (error) {
    console.log(error);
  }
});
export const clearPosts = createAsyncThunk("deletePost/delete", async () => {
  return;
});
const initialState = {
  posts: [],
  loading: false,
  error: null,
};

const postsSlice = createSlice({
  name: "posts",
  initialState: initialState,
  extraReducers: {
    // get posts
    [getPosts.pending]: (state, action) => {
      state.loading = true;
    },
    [getPosts.fulfilled]: (state, action) => {
      state.loading = false;
      state.posts = [...state.posts, ...action.payload];
    },
    [getPosts.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    // delete post
    [deletePost.pending]: (state, action) => {
      state.loading = true;
    },
    [deletePost.fulfilled]: (state, action) => {
      state.loading = false;
      state.posts = state.posts.filter((post) => post._id !== action.payload);
    },
    [deletePost.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    [deletePost.fulfilled]: (state) => {
      state.posts = [];
    },
    [likePost.pending]: (state, action) => {
      state.loading = true;
    },
    [likePost.fulfilled]: (state, action) => {
        state.loading = false;
        state.posts.forEach((post,i) =>{
          if(post._id === action.payload.id) state.posts[i].likes = action.payload.data.posts
        })
      },
    [likePost.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

  },
});

// export const { clearPosts } = postsSlice.actions;
export default postsSlice.reducer;
