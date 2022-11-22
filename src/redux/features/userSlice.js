import { createSlice } from "@reduxjs/toolkit";
const initialState = {
        userId: "",
        fullName : {
            firstname: "",
            lastname: "",
        },
        email: "",
        phone : "",
        profile_img: "",
        cover_img: "",
        role: "",
        birthdate: "",
        location: "",
        rank: [],
        productList : [],
        createdAt : "",
        active: false,
        accessToken: ""
    };

const userSlice = createSlice({
    name: "user",
    initialState: initialState,
    reducers: {
        onRegister: (state, action) => {
            state.phone = action.payload.phone
            state.birthdate = action.payload.birthdate
            state.email = action.payload.email
            state.fullName = {
                firstname: action.payload.fullName.firstName,
                lastname: action.payload.fullName.lastName
            }
            state.profile_img = action.payload.profile_img
            state.role = action.payload.role
            state.createdAt = action.payload.craetedAt
        },
        onLogin: (state, action) => {
            state.phone = action.payload.phone
            state.birthdate = action.payload.birthdate
            state.email = action.payload.email
            state.fullName = {
                firstname: action.payload.fullName.firstName,
                lastname: action.payload.fullName.lastName
            }
            state.profile_img = action.payload.profile_img
            state.role = action.payload.role
            state.userId = action.payload._id
            state.createdAt = action.payload.craetedAt
            state.active = action.payload.active 
            state.accessToken = action.payload.token
        },
        onLogout : (state) =>{
            state.phone = ""
            state.birthdate = ""
            state.email = ""
            state.fullName= {
                firstname : "",
                lastname : ""
            }
            state.profile_img = ""
            state.role = ""
            state.userId = ""
            state.createdAt = ""
            state.active = "" 
            state.accessToken =""
        },
    }
})

export const { onRegister, onLogin, changeRole, onLogout } = userSlice.actions
export default userSlice.reducer
