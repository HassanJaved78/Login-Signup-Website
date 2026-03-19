import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "./services/auth/authAPI.js";
import authReducer from "./services/auth/authSlice.js";

export const store = configureStore({
    reducer: {
        [authApi.reducerPath]: authApi.reducer,
        auth: authReducer
    },

    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware().concat(authApi.middleware),
})