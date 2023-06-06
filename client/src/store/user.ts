import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slice";

export const store = configureStore({
    reducer: {
        userReducer
    },
});