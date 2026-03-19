import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReAuth } from "../baseQueryWithReAuth.js";

export const apiSlice = createApi({
    reducerPath: "api",
    baseQuery: baseQueryWithReAuth,
    endpoints: () => ({})
});