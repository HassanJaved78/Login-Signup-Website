import { fetchBaseQuery } from "@reduxjs/toolkit/query";

const baseQuery = fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL,
    credentials: "include"
})

export const baseQueryWithReAuth = async (args, api, extraOptions) => {
    
    let result = await baseQuery(args, api, extraOptions);

    // if (!result) {
    //     return {
    //         error: {
    //             status: "FETCH_ERROR",
    //             data: "No response from server"
    //         }
    //     };
    // }

    // if token expired (401) 
    if (result?.error?.status === 401 && result?.error?.data?.message === "Token expired") {
        console.log("Access token expired. Trying refresh...");

        // Call refresh endpoint
        const refreshResult = await baseQuery(
            {
                url: "/auth/refresh",
                method: "POST"
            },
            api,
            extraOptions
        );

        if (refreshResult?.data) {
            result = await baseQuery(args, api, extraOptions);
        } else {
            api.dispatch(logout());
            // return refreshResult;
        }
    }

    return result;
}