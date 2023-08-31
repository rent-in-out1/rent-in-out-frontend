import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { doGetApiMethod } from "../../api/services/axios-service/axios-service";
import { errorHandler } from "../../util/functions";

const initialState = {
    user: null,
    inbox: [],
    wishList: [],
    loading: false,
    error: "",
};
export const getUserInbox = createAsyncThunk("getUserInbox/get", async () => {
    try {
        const url = "/users/getAllChat";
        let { data } = await doGetApiMethod(url);
        return data;
    } catch (error) {
        errorHandler(error);
    }
});
export const getUserWishList = createAsyncThunk("getUserWishList/get", async () => {
    try {
        const url = "/users/getWishList";
        let { data } = await doGetApiMethod(url);
        return data;
    } catch (error) {
        errorHandler(error);
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
            let like = state.wishList.some(
                (post) => post._id === action.payload._id
            );
            if (like)
                state.wishList = state.wishList.filter(
                    (post) => post._id !== action.payload._id
                );
            else state.wishList.push(action.payload);
        },
    },
    extraReducers(builder) {
        builder
            .addCase(getUserInbox.pending, (state) => {
                state.loading = true;
            })
            .addCase(getUserInbox.fulfilled, (state, action) => {
                state.loading = false;
                state.inbox = action.payload;
            })
            .addCase(getUserInbox.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(getUserWishList.pending, (state) => {
                state.loading = true;
            })
            .addCase(getUserWishList.fulfilled, (state, action) => {
                state.loading = false;
                state.wishList = action.payload;
            })
            .addCase(getUserWishList.rejected, (state, action) => {
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
    updateInbox
} = userSlice.actions;
export default userSlice.reducer;
