import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import userService from "../services/user.service";

const initialState = {
    users: [],
    user_detail: null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
};

export const getAllUsers = createAsyncThunk(
    "users/getAll",
    async (_, thunkAPI) => {
        try {
            return await userService.GETALL();
        } catch (error) {
            const message = 
            (error.response && 
                error.response.data && 
                error.response.data.errors.map((err) => err.msg)) || 
                error.message || 
                error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
);

export const getUser = createAsyncThunk(
    "user/get",
    async (id, thunkAPI) => {
        try {
            return await userService.GET(id);
        } catch (error) {
            const message = 
            (error.response && 
                error.response.data && 
                error.response.data.errors.map((err) => err.msg)) || 
                error.message || 
                error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
);

export const uploadPhoto = createAsyncThunk(
    "user/uploadPhoto",
    async (data, thunkAPI) => {
        try {
            
            const token = thunkAPI.getState().auth.user.token;
            return await userService.UPLOAD_IMAGE(data, token);

        } catch (error) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.errors.map((err) => err.msg)) ||
                error.message ||
                error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
);

export const updateProfile = createAsyncThunk(
    "user/updateProfile",
    async (data, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token;
            return await userService.UPDATE_PROFILE(data, token);
        } catch (error) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.errors.map((err) => err.msg)) ||
                error.message ||
                error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
);

export const userSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
        reset : () => initialState,
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllUsers.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getAllUsers.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.users = action.payload;
            })
            .addCase(getAllUsers.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(getUser.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.user_detail = action.payload;
            })
            .addCase(getUser.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(uploadPhoto.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(uploadPhoto.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.user_detail = action.payload;
            })
            .addCase(uploadPhoto.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(updateProfile.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updateProfile.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.user_detail = action.payload;
            })
            .addCase(updateProfile.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
    }
})

export const { reset } = userSlice.actions;
export default userSlice.reducer;