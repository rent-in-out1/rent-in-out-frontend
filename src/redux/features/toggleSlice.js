import { createSlice } from "@reduxjs/toolkit";
    const initialstate = {
        register: false,
        error : {
            status: false,
            massege :""
        },
        search: false,
        likes:{
            active: false,
            likesArr:[]
        } 
    }

const toggleSlice = createSlice({
    name: "toggle",
    initialState: initialstate,
    reducers :{
        onRegisterToggle: (state) =>{
            state.register = true;
        },
        onRegisterShow: (state) =>{
            state.register = !state.register;
        },
        onLogout: (state) =>{
            state.register = false;
        },
        onSearchToggle: (state) =>{
            state.search = !state.search;
        },
        onLikesToggle: (state, action) =>{
            state.likes.active = !state.likes.active
            state.likes.likesArr = action.payload
        },
        onErrorToggle: (state, action) =>{
            state.error.status = !state.error.status
            state.error.message = action.payload.error.message
        },

    }
})

export const {onToggle , onRegisterToggle,onSearchToggle, onLogout , onRegisterShow, onLikesToggle } = toggleSlice.actions
export default toggleSlice.reducer