import { createSlice } from "@reduxjs/toolkit";
import { useDispatch } from 'react-redux';
import { clearPosts } from "./postsSlice";
const initialState = {
    user: null,
};


const userSlice = createSlice(
    {
    name: "user",
    initialState: initialState,
    reducers: {
        onRegister: (state, action) => {
            state.user = action.payload.user
        },
        onLogin: (state, action) => {
            state.user = action.payload
        },
        onLogout: (state) => {
            state.user = null
        },

        uploadBanner: (state, action) => {
            state.user.cover_img = action.payload
        },

        uploadProfileImage: (state, action) => {
            state.user.profile_img = action.payload
        },

        upload: (state, action) => {
            state.user = action.payload 
        },
        updateWishList: (state, action) => {
            // const dispatch = useDispatch()
            clearPosts()
            let like = state.user.wishList.some(post=> post._id === action.payload._id)
            if (like) state.user.wishList = state.user.wishList.filter(post=> post._id !== action.payload._id)
            else state.user.wishList.push(action.payload)
        },

    }
})

export const { onRegister, onLogin, changeRole, onLogout, uploadBanner, uploadProfileImage,upload ,updateWishList} = userSlice.actions
export default userSlice.reducer
