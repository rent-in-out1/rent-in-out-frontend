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
            state.register = !state.register;
        },
        onErrorToggle: (state, action) =>{
            state.error.status = !state.error.status
            state.error.massege = action.payload.error.massege
        },
        onBarToggle : (state) => {
            state.bar = !state.bar
        }
    }
})

export const {onToggle , onRegisterToggle} = toggleSlice.actions
export default toggleSlice.reducer