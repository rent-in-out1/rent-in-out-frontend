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
    }
})

export const { onRegister, onLogin, changeRole, onLogout } = userSlice.actions
export default userSlice.reducer
