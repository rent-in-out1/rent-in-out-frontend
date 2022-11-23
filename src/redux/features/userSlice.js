import { createSlice } from "@reduxjs/toolkit";
const initialState = {


    user: {}
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
        onLogout : (state) =>{
            state.user = {}
            window.location.replace('http://localhost:3000/');
        },

        bannerImage : (state,action) =>{
            state.banner_image = action.payload
        },

        profileImage : (state,action) =>{
            state.profile_img = action.payload
        },
       
    }
})

export const { onRegister, onLogin, changeRole, onLogout,bannerImage,  profileImage} = userSlice.actions
export default userSlice.reducer
