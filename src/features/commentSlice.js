import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import commentService from "../services/comment.service";

const initialState = {
    comments: [],
    comment: null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
};

export const createComment = createAsyncThunk(
    "comment/create",
    async ( data, thunkAPI ) => {
        try {
            const token = thunkAPI.getState().auth.user.token;
            return await commentService.CREATE(data, token);
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

export const getComments = createAsyncThunk(
    "comments/get",
    async (_, thunkAPI) => {
        try {
            return await commentService.GETALL();
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

// export const getCategory = createAsyncThunk(
//     "category/get",
//     async (id, thunkAPI) => {
//         try {
//             return await commentService.GET(id);
//         } catch (error) {
//             const message = 
//             (error.response && 
//                 error.response.data && 
//                 error.response.data.message) || 
//                 error.message || 
//                 error.toString();
//             return thunkAPI.rejectWithValue(message);
//         }
//     }
// );

export const updateComment = createAsyncThunk(
    "comment/update",
    async (data, thunkAPI ) => {
        try {
            const token = thunkAPI.getState().auth.user.token;
            return await commentService.UPDATE(data, token);
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

export const deleteComment = createAsyncThunk(
    "comment/delete",
    async (id, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token;
            return await commentService.DELETE(id, token);
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

export const commentSlice = createSlice({
    name: "comments",
    initialState,
    reducers: {
        reset : () => initialState,
    },
    extraReducers: (builder) => {
        builder
            .addCase(getComments.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getComments.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.comments = action.payload;
            })
            .addCase(getComments.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(createComment.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createComment.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.comments.push(action.payload);
            })
            .addCase(createComment.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(deleteComment.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deleteComment.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.comments = state.comments.filter((comment) => 
                    comment._id !== action.payload._id);
            })
            .addCase(deleteComment.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(updateComment.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updateComment.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.comments = state.comments.map((comment) => 
                    comment._id === action.payload._id ? action.payload : comment);
            })
            .addCase(updateComment.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
    }
})

export const { reset } = commentSlice.actions;
export default commentSlice.reducer;