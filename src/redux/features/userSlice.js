import { createSlice } from "@reduxjs/toolkit";
import { useNavigate } from "react-router-dom";
const initialState = {
    user: null
};

const userSlice = createSlice({
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
            state.user = { active: false }
        },

        bannerImage: (state, action) => {
            state.banner_image = action.payload
        },

        profileImage: (state, action) => {
            state.profile_img = action.payload
        },

    }
})

export const { onRegister, onLogin, changeRole, onLogout, bannerImage, profileImage } = userSlice.actions
export default userSlice.reducer
