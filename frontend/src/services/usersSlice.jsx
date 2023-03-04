import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    loading: false,
    user: {},
    profile: {},
};

export const registerUser = createAsyncThunk(
    "orders/registerUser",
    async (userData) => {
        const { data } = await axios.post(
            `${import.meta.env.VITE_BASE_URL}/api/register`,
            userData
        );
        localStorage.setItem("user", JSON.stringify(data.user));
        localStorage.setItem("token", JSON.stringify(data.token));
        document.location.href = "/";
        return data;
    }
);

export const login = createAsyncThunk("users/login", async (values) => {
    try {
        const { data } = await axios.post(
            `${import.meta.env.VITE_BASE_URL}/api/login`,
            values
        );
        localStorage.setItem("user", JSON.stringify(data?.user));
        localStorage.setItem("token", JSON.stringify(data?.token));
        if (data?.token) {
            document.location.href = "/";
        }
        return data;
    } catch (error) {
        return error;
    }
});

export const getProfile = createAsyncThunk("users/getProfile", async () => {
    try {
        const token = JSON.parse(localStorage.getItem("token"));
        const data = await axios.get(
            `${import.meta.env.VITE_BASE_URL}/api/profile`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        return data;
    } catch (error) {
        return error;
    }
});

export const logout = createAsyncThunk("users/logout", async () => {
    try {
        const token = JSON.parse(localStorage.getItem("token"));
        const { data } = await axios.get(
            `${import.meta.env.VITE_BASE_URL}/api/logout`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        localStorage.removeItem("user", JSON.stringify(data?.user));
        localStorage.removeItem("token", JSON.stringify(data?.token));
        document.location.href = "/signin";
        return data;
    } catch (error) {
        return error;
    }
});
export const usersSlice = createSlice({
    name: "users",
    initialState,
    reducers: {},
    extraReducers: {
        [registerUser.pending]: (state) => {
            state.loading = true;
        },
        [registerUser.fulfilled]: (state, { payload }) => {
            state.loading = false;
            state.user = payload;
            state.success = true;
        },
        [registerUser.rejected]: (state) => {
            state.loading = false;
        },
        [login.pending]: (state) => {
            state.loading = true;
        },
        [login.fulfilled]: (state, { payload }) => {
            state.loading = false;
            state.user = payload;
        },
        [login.rejected]: (state, { payload }) => {
            state.loading = false;
            state.error = payload;
        },
        [logout.pending]: (state) => {
            state.loading = true;
        },
        [logout.fulfilled]: (state) => {
            state.loading = false;
            state.user = {};
        },
        [logout.rejected]: (state, { payload }) => {
            state.loading = false;
            state.error = payload;
        },
        [getProfile.pending]: (state) => {
            state.loading = true;
        },
        [getProfile.fulfilled]: (state, { payload }) => {
            state.loading = false;
            state.profile = payload.data[0];
        },
        [getProfile.rejected]: (state, { payload }) => {
            state.loading = false;
            state.error = payload;
        },
    },
});

export default usersSlice.reducer;
