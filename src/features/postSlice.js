import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import postService from "../services/post.service";

const initialState = {
    posts: [],
    post: null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
};

export const createPost = createAsyncThunk(
    "post/create",
    async ( data, thunkAPI ) => {
        try {
            const token = thunkAPI.getState().auth.user.token;
            return await postService.CREATE(data, token);
        } catch (error) {
            const message = 
            (error.response && 
                error.response.data && 
                error.response.data.message) || 
                error.message || 
                error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
);

export const getPosts = createAsyncThunk(
    "posts/get",
    async (_, thunkAPI) => {
        try {
            return await postService.GETALL();
        } catch (error) {
            const message = 
            (error.response && 
                error.response.data && 
                error.response.data.message) || 
                error.message || 
                error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
);

export const getPost = createAsyncThunk(
    "post/get",
    async (slug, thunkAPI) => {
        try {
            return await postService.GET(slug);
        } catch (error) {
            const message = 
            (error.response && 
                error.response.data && 
                error.response.data.message) || 
                error.message || 
                error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
);

export const updatePost = createAsyncThunk(
    "post/update",
    async (data, thunkAPI ) => {
        try {
            const token = thunkAPI.getState().auth.user.token;
            return await postService.UPDATE(data, token);
        } catch (error) {
            const message = (error.response && 
                error.response.data && 
                error.response.data.message) || 
                error.message || 
                error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
);

export const deletePost = createAsyncThunk(
    "post/delete",
    async (id, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token;
            return await postService.DELETE(id, token);
        } catch (error) {
            const message = 
            (error.response && 
                error.response.data && 
                error.response.data.message) || 
                error.message || 
                error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
);

export const postSlice = createSlice({
    name: "posts",
    initialState,
    reducers: {
        reset : () => initialState,
    },
    extraReducers: (builder) => {
        builder
            .addCase(getPosts.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getPosts.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.posts = action.payload;
            })
            .addCase(getPosts.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(getPost.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getPost.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.post = action.payload;
            })
            .addCase(getPost.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(createPost.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createPost.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.posts.push(action.payload);
            })
            .addCase(createPost.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(deletePost.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deletePost.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.posts = state.posts.filter((post) => 
                    post._id !== action.payload._id);
            })
            .addCase(deletePost.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(updatePost.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updatePost.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.posts = state.posts.map((post) => 
                    post._id === action.payload._id ? action.payload : post);
            })
            .addCase(updatePost.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
    }
})

export const { reset } = postSlice.actions;
export default postSlice.reducer;