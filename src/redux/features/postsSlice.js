import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { doApiMethod, doGetApiMethod } from "../../services/service";

export const getPosts = createAsyncThunk(
  "posts/get",
  async ({
    search = "",
    option = "createdAt",
    page = 1,
    min=0,
    max= 1000,
    range,
    endScreenEnd,
    setPage,
  }) => {
    
    try {
      if(page===1) clearPosts();
      let url = `/posts/search?s=${search}&page=${page}&sort=${option}&min=${min}&max=${max}&reverse=yes`;
      // let url = `/posts?page=${page}&sort=${option}&reverse=yes`;
      let { data } = await doGetApiMethod(url);
      if (data.length > 0) {
        endScreenEnd();
        setPage(page + 1);
      }
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
export const uploadPost = createAsyncThunk(
  "uploadPost/upload",
  async (post) => {
    try {
      const url = "/posts";
      let { data } = await doApiMethod(url, "POST", post);
      return data;
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
const initialState = {
  posts: [],
  loading: false,
  error: null,
};

const postsSlice = createSlice({
  name: "posts",
  initialState: initialState,
  reducers: {
    clearPosts: (state) => {
      state.posts = []
    }
  },
  extraReducers(builder) {
    builder.
    // get posts
    addCase(getPosts.pending, (state, action) => {
      state.loading = true;
    })
    .addCase(getPosts.fulfilled, (state, action) => {
      state.loading = false;
      state.posts = [...state.posts, ...action.payload];
      state.posts = state.posts.filter(element => {
        const isDuplicate = state.posts.includes(element._id);
        if (!isDuplicate) {
          state.posts.push(element._id);
          return true;
        }
        return false;
      });
    })
    .addCase(getPosts.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
    // delete post
    .addCase(deletePost.pending, (state, action) => {
      state.loading = true;
    })
    .addCase(deletePost.fulfilled, (state, action) => {
      state.loading = false;
      state.posts = state.posts.filter((post) => post._id !== action.payload);
    })
    .addCase(deletePost.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
    .addCase(likePost.pending, (state, action) => {
      state.loading = true;
    })
    .addCase(likePost.fulfilled, (state, action) => {
      state.loading = false;
      state.posts.forEach((post, i) => {
        if (post._id === action.payload.id) state.posts[i].likes = action.payload.data.posts
      })
    })
    .addCase(likePost.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
    .addCase(uploadPost.pending, (state, action) => {
      state.loading = true;
    })
    .addCase(uploadPost.fulfilled, (state, action) => {
      state.loading = false;
      state.posts.unshift(action.payload);
    })
    .addCase(uploadPost.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
  },
});

export const { clearPosts } = postsSlice.actions;
export default postsSlice.reducer;
