import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  doApiMethod,
  doGetApiMethod,
} from "../../api/services/axios-service/axios-service";
import { errorHandler } from "../../util/functions";

export const getPosts = createAsyncThunk(
  "posts/get",
  async ({
    option = "createdAt",
    page = 1,
    endScreenEnd,
    setPage,
    searchParams,
  }) => {
    try {
      if (page === 1) clearPosts();
      let url = `/posts/search?searchQ=${searchParams.get(
        "s"
      )}&page=${page}&reverse=yes&sort=${option}&max=${searchParams.get(
        "price_max"
      )}&min=${searchParams.get("price_min")}&categories=${searchParams.get(
        "categories"
      )}`;
      let { data } = await doGetApiMethod(url);
      if (data.count > 0) {
        endScreenEnd();
        setPage(page + 1);
      }
      return data;
    } catch (error) {
      errorHandler(error);
    }
  }
);
export const deletePost = createAsyncThunk(
  "posts/delete",
  async ({ id, name }) => {
    try {
      if (window.confirm(`Are you sure you want to delete "${name}"`)) {
        const url = `/posts/${id}`;
        await doApiMethod(url, "DELETE");
        return id;
      }
    } catch (error) {
      errorHandler(error);
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
      errorHandler(error);
    }
  }
);
export const likePost = createAsyncThunk("likePost/like", async ({ id }) => {
  try {
    const url = `/posts/likePost/${id}`;
    let { data } = await doApiMethod(url, "POST");
    return { data, id };
  } catch (error) {
    errorHandler(error);
  }
});

// Initial values for state
const initialState = {
  posts: [],
  loading: false,
  error: null,
  isChange: false,
  editablePost: {},
};

const postsSlice = createSlice({
  name: "posts",
  initialState: initialState,
  reducers: {
    clearPosts: (state) => {
      state.posts = [];
    },
    setIsChange: (state) => {
      state.isChange = !state.isChange;
    },
    setPostEdit: (state, action) => {
      state.editablePost = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getPosts.pending, (state) => {
        state.loading = true;
      })
      .addCase(getPosts.fulfilled, (state, action) => {
        state.loading = false;
        if (action?.payload?.count > 0) {
          state.posts = [...state.posts, ...action.payload.posts];
          state.posts = state.posts?.filter((element) => {
            const isDuplicate = state.posts.includes(element._id);
            if (!isDuplicate) {
              state.posts.push(element._id);
              return true;
            }
            return false;
          });
        }
      })
      .addCase(getPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // delete post
      .addCase(deletePost.pending, (state) => {
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
      .addCase(likePost.pending, (state) => {
        state.loading = false;
      })
      .addCase(likePost.fulfilled, (state, action) => {
        state.loading = false;
        state.posts.forEach((post, i) => {
          if (post?._id === action.payload.id)
            state.posts[i].likes = action.payload.data.posts;
        });
      })
      .addCase(likePost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(uploadPost.pending, (state) => {
        state.loading = true;
      })
      .addCase(uploadPost.fulfilled, (state, action) => {
        state.loading = false;
        state.posts.unshift(action.payload);
      })
      .addCase(uploadPost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearPosts, setIsChange, setPostEdit } = postsSlice.actions;
export default postsSlice.reducer;
