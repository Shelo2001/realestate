import { configureStore } from "@reduxjs/toolkit";
import homesSlice from "./services/homesSlice";
import usersSlice from "./services/usersSlice";

export default configureStore({
    reducer: {
        homes: homesSlice,
        users: usersSlice,
    },
});
