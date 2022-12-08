import { createSlice } from "@reduxjs/toolkit";
import { doApiMethod } from "../../services/service";
const initialState = {
    posts: [],
};

const postsSlice = createSlice({
    name: "posts",
    initialState: initialState,
    reducers: {
        onLoad: (state, action) => {
            state.posts = action.payload
        },
        addPost: (state, action) => {
            state.posts = action.payload
        },
        removePost: (state, action) => {
            state.posts = action.payload
        },
        editPost: (state, action) => {
            state.posts = action.payload
        },
        likePost: async(state, action) => {
            console.log(action.payload.likes)
            // let url = "/posts/likePost/" + action.payload.id;
            // let likes = await doApiMethod(url, "POST");
            // console.log(likes)
            // state.posts[action.payload.key].likes = likes;
        },
        clear: (state, action) => {
            state.posts = []
        },
        
        
    }
})

export const { onLoad, addPost, editPost, removePost,likePost, clear } = postsSlice.actions
export default postsSlice.reducer