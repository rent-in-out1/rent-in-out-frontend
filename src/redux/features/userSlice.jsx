import { createSlice } from "@reduxjs/toolkit";

const user_key = "userData"
const initialState =
localStorage[user_key] ? {
    isLoggedIn: true ,
    role: JSON.parse(localStorage[user_key]).role
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
