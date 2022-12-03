import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    user: null,
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
        }
       

    }
})

export const { onRegister, onLogin, changeRole, onLogout, uploadBanner, uploadProfileImage,upload } = userSlice.actions
export default userSlice.reducer
