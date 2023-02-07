import {createSlice} from "@reduxjs/toolkit";

const errorsSlice = createSlice({
    name: "errors",
    initialState: {
        isError: false,
        messege: ""
    },
    reducers: {}
})

export const {isError} = errorsSlice.actions
export default errorsSlice.reducer