import { createSlice } from "@reduxjs/toolkit";

const errorsSlice = createSlice({
    name: "errors",
    initialState: {
        isError: false,
        messege : ""
    },
    reducers :{
        isError: (state , action) =>{

        },
    }
})

export const {isError} = errorsSlice.actions
export default errorsSlice.reducer