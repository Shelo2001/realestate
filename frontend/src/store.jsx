import { configureStore } from "@reduxjs/toolkit";
import homesSlice from "./services/homesSlice";

export default configureStore({
    reducer: {
        homes: homesSlice,
    },
});
