import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { doGetApiMethod } from "./../../services/service";
const initialState = {
  user: null,
  inbox: [],
  loading: false,
  error: "",
};
export const getUserInbox = createAsyncThunk("getUserInbox/get", async () => {
  try {
    const url = "/users/getAllChat";
    let { data } = await doGetApiMethod(url);
    return data;
  } catch (error) {
    console.log(error);
  }
});

const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    onRegister: (state, action) => {
      state.user = action.payload.user;
    },
    onLogin: (state, action) => {
      state.user = action.payload;
    },
    onLogout: (state) => {
      state.user = null;
    },

    uploadBanner: (state, action) => {
      state.user.cover_img = action.payload;
    },

    uploadProfileImage: (state, action) => {
      state.user.profile_img = action.payload;
    },

    upload: (state, action) => {
      state.user = action.payload;
    },
    updateWishList: (state, action) => {
      let like = state.user.wishList.some(
        (post) => post._id === action.payload._id
      );
      if (like)
        state.user.wishList = state.user.wishList.filter(
          (post) => post._id !== action.payload._id
        );
      else state.user.wishList.push(action.payload);
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getUserInbox.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getUserInbox.fulfilled, (state, action) => {
        state.loading = false;
        state.inbox = action.payload;
      })
      .addCase(getUserInbox.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const {
  onRegister,
  onLogin,
  changeRole,
  onLogout,
  uploadBanner,
  uploadProfileImage,
  upload,
  updateWishList,
} = userSlice.actions;
export default userSlice.reducer;
