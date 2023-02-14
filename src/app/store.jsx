import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/authSlice";
import userReducer from "../features/userSlice";
import postReducer from "../features/postSlice";
import categoryReducer from "../features/categorySlice";
import commentReducer from "../features/commentSlice";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        users: userReducer,
        posts: postReducer,
        categories: categoryReducer,
        comments: commentReducer
    },
});
