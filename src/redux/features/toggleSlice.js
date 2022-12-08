import { createSlice } from "@reduxjs/toolkit";
    const initialstate = {
        register: false,
        messege : {
            isShow: false,
            info :"",
            approve: false,
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
        onMessegeToggle: async(state, action) =>{
            state.messege.isShow = !state.messege.isShow
            state.messege.info = action.payload.info
            state.messege.approve = action.payload.approve
        },

    }
})

export const {onToggle , onRegisterToggle,onSearchToggle, onLogout , onRegisterShow, onLikesToggle , onMessegeToggle } = toggleSlice.actions
export default toggleSlice.reducer