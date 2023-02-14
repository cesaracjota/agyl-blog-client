import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "../services/auth.service";

const user = JSON.parse(localStorage.getItem('user_agyl_post'));

const initialState = {
    user: user ? user : null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
    ROLE: null,
}

export const register = createAsyncThunk(
    'auth/register', 
    async (user, thunkAPI) => {
        try {
            return await authService.register(user);
        } catch (error) {
            const message = 
            (error.response && 
                error.response.data && 
                error.response.data.errors.map((err) => err.msg)) || 
                error.message || 
                error.toString();
            return thunkAPI.rejectWithValue(message);
        }
});

export const login = createAsyncThunk(
    'auth/login',
    async (user, thunkAPI) => {
        try {
            return await authService.login(user)
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
)

// Logout user

export const logout = createAsyncThunk('auth/logout', async () => {
    await authService.logout();
})

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        reset: (state) => {
            state.isError = false;
            state.isSuccess = false;
            state.isLoading = false;
            state.message = '';
            state.ROLE = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(register.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(register.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.user = action.payload;
                state.ROLE = action.payload.data.role;
            })
            .addCase(register.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
                state.user = null;
                state.ROLE = null;
            })
            .addCase(login.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.user = action.payload;
                state.ROLE = action.payload.data.role;
            })
            .addCase(login.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
                state.user = null;
                state.ROLE = null;
            })
            .addCase(logout.pending, (state) => {
                state.user = null;
            })
    }
    
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;