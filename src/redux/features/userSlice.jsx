import { createSlice } from "@reduxjs/toolkit";
const initialState = {
        token : "",
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
        active: false
      
    };

const userSlice = createSlice({
    name: "user",
    initialState: initialState,
    reducers :{
        onRegister: (state , action) =>{
            state.phone = action.payload.phone
            state.birthdate = action.payload.birthdate
            state.email = action.payload.email
            state.fullName= {
                firstname : action.payload.fullName.firstName,
                lastname : action.payload.fullName.lastName
            }
            state.profile_img = action.payload.profile_img
            state.role = action.payload.role
            state.createdAt = action.payload.craetedAt
        },
        onLogin: (state , action) => {
            state.phone = action.payload.phone
            state.birthdate = action.payload.birthdate
            state.email = action.payload.email
            state.fullName= {
                firstname : action.payload.fullName.firstName,
                lastname : action.payload.fullName.lastName
            }
            state.profile_img = action.payload.profile_img
            state.role = action.payload.role
            state.userId = action.payload._id
            state.createdAt = action.payload.craetedAt
            state.active = action.payload.active 
            state.token = JSON.parse(localStorage["token"])
        },

    }
})

export const {onRegister , onLogin } = userSlice.actions
export default userSlice.reducer
