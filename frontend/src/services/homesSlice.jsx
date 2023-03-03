import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    loading: false,
    allHomes: [],
};

export const getListings = createAsyncThunk("orders/getListings", async () => {
    try {
        const { data } = await axios.get(
            `${import.meta.env.VITE_BASE_URL}/api/home/listings`
        );
        return data.homes.data;
    } catch (error) {
        console.log(error);
    }
});

export const homesSlice = createSlice({
    name: "homes",
    initialState,
    reducers: {},
    extraReducers: {
        [getListings.pending]: (state) => {
            state.loading = true;
        },
        [getListings.fulfilled]: (state, { payload }) => {
            state.loading = false;
            state.allHomes = payload;
            state.success = true;
        },
        [getListings.rejected]: (state) => {
            state.loading = false;
        },
    },
});

export default homesSlice.reducer;
