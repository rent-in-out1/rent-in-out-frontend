import { createSlice } from "@reduxjs/toolkit";
    const initialstate = {
        register: false,
        error : {
            status: false,
            massege :""
        },
        bar: false
    }

const toggleSlice = createSlice({
    name: "toggle",
    initialState: initialstate,
    reducers :{
        onRegisterToggle: (state) =>{
            state.register = true;
        },
        onLogout: (state) =>{
            state.register = false;
        },
        onErrorToggle: (state, action) =>{
            state.error.status = !state.error.status
            state.error.message = action.payload.error.message
        },

    }
})

export const {onToggle , onRegisterToggle, onLogout} = toggleSlice.actions
export default toggleSlice.reducer