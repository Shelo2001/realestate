import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    loading: false,
    allHomes: [],
    similarListings: [],
    home: {},
    message: null,
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

export const getSingleListing = createAsyncThunk(
    "orders/getSingleListing",
    async (id) => {
        try {
            const { data } = await axios.get(
                `${import.meta.env.VITE_BASE_URL}/api/home/listing/${id}`
            );
            return data.home;
        } catch (error) {
            console.log(error);
        }
    }
);

export const getSimilarListing = createAsyncThunk(
    "orders/getSimilarListing",
    async ({ city, id }) => {
        try {
            const { data } = await axios.get(
                `${
                    import.meta.env.VITE_BASE_URL
                }/api/home/similar/${city}/${id}`
            );
            return data.similarHomes;
        } catch (error) {
            console.log(error);
        }
    }
);

export const sendMessage = createAsyncThunk(
    "orders/sendMessage",
    async (messageData) => {
        try {
            const { data } = await axios.post(
                `${import.meta.env.VITE_BASE_URL}/api/contact`,
                messageData
            );
            return data.message;
        } catch (error) {
            console.log(error);
        }
    }
);

export const createListing = createAsyncThunk(
    "orders/createListing",
    async (listingData) => {
        try {
            const { data } = await axios.post(
                `${import.meta.env.VITE_BASE_URL}/api/home/createlisting`,
                listingData
            );
            document.location.href = "/";
            return data;
        } catch (error) {
            console.log(error);
        }
    }
);

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
            state.message = null;
            state.home = {};
            state.allHomes = payload;
            state.success = true;
        },
        [getListings.rejected]: (state) => {
            state.loading = false;
        },
        [getSingleListing.pending]: (state) => {
            state.loading = true;
        },
        [getSingleListing.fulfilled]: (state, { payload }) => {
            state.loading = false;
            state.home = payload;
            state.message = null;
            state.success = true;
        },
        [getSingleListing.rejected]: (state) => {
            state.loading = false;
        },
        [getSimilarListing.pending]: (state) => {
            state.loading = true;
        },
        [getSimilarListing.fulfilled]: (state, { payload }) => {
            state.loading = false;
            state.similarListings = payload;
            state.success = true;
        },
        [getSimilarListing.rejected]: (state) => {
            state.loading = false;
        },
        [sendMessage.pending]: (state) => {
            state.loading = true;
        },
        [sendMessage.fulfilled]: (state, { payload }) => {
            state.loading = false;
            state.message = payload;
            state.success = true;
        },
        [sendMessage.rejected]: (state) => {
            state.loading = false;
        },
        [createListing.pending]: (state) => {
            state.loading = true;
        },
        [createListing.fulfilled]: (state, { payload }) => {
            state.loading = false;
        },
        [createListing.rejected]: (state) => {
            state.loading = false;
        },
    },
});

export default homesSlice.reducer;
