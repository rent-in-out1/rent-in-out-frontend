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
            console.log(action.payload)
            state.user = action.payload
            console.log(state.user)
        },
        onLogout : (state) =>{
            state.user = {}
        },
    }
})

export const { onRegister, onLogin, changeRole, onLogout } = userSlice.actions
export default userSlice.reducer
