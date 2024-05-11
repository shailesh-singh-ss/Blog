import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    status: false,
    userPosts: null,
}

const postsSlice = createSlice({
    name: "posts",
    initialState,
    reducers: {
        saveData: (state, action) => {
            state.status = true;
            state.userPosts = action.payload;
        },
        removeData: (state) => {
            state.status = false;
            state.userPosts = null;
        }
    }
})

export const {saveData, removeData} = postsSlice.actions;

export default postsSlice.reducer