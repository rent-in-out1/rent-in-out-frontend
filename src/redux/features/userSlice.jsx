import { createSlice } from "@reduxjs/toolkit";

const key = "userData"

const initialState =
localStorage[key] ? {
    isLoggedIn: true ,
    role: JSON.parse(localStorage[key]).role,
}: {
    isLoggedIn: false,
    role: ""
}

const userSlice = createSlice({
    name: "user",
    initialState: initialState,
    reducers :{

    }
})

export default userSlice.reducer
