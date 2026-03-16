import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const authApi = createApi({
    reducerPath: 'authApi',

    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:5000/auth",
        credentials: "include"
    }),

    endpoints: (builder) => ({
        register: builder.mutation({
            query: (data) => ({
                url: '/register',
                method: 'POST',
                body: data
            })
        }),

        login: builder.mutation({
            query: (data) => ({
                url: '/login',
                method: 'POST',
                body: data
            })
        }),

        logout: builder.mutation({
            query: (data) => ({
                url: '/logout',
                method: 'POST',
                body: data
            })
        }),

        forgotPassword: builder.mutation({
            query: (data) => ({
                url: '/forgot-password',
                method: 'POST',
                body: data
            })
        }),

        verifyOTP: builder.mutation({
            query: (data) => ({
                url: '/verify-otp',
                method: 'POST',
                body: data
            })
        }),

        resetPassword: builder.mutation({
            query: (data) => ({
                url: '/reset-password',
                method: 'POST',
                body: data
            })
        })
    })
})

export const {
    useRegisterMutation,
    useVerifyOTPMutation,
    useLoginMutation,
    useLogoutMutation,
    useForgotPasswordMutation,
    useResetPasswordMutation
} = authApi;