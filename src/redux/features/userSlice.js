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
        onLogout : (state) =>{
            state.user = {active:false}
        },
    }
})

export const { onRegister, onLogin, changeRole, onLogout } = userSlice.actions
export default userSlice.reducer
