import { apiSlice } from "../apiSlice";

export const authApi = apiSlice.injectEndpoints({

    endpoints: (builder) => ({
        register: builder.mutation({
            query: (data) => ({
                url: '/auth/register',
                method: 'POST',
                body: data
            })
        }),

        login: builder.mutation({
            query: (data) => ({
                url: '/auth/login',
                method: 'POST',
                body: data
            })
        }),

        logout: builder.mutation({
            query: (data) => ({
                url: '/auth/logout',
                method: 'POST',
                body: data
            })
        }),

        forgotPassword: builder.mutation({
            query: (data) => ({
                url: '/auth/forgot-password',
                method: 'POST',
                body: data
            })
        }),

        verifyOTP: builder.mutation({
            query: (data) => ({
                url: '/auth/verify-otp',
                method: 'POST',
                body: data
            })
        }),

        resetPassword: builder.mutation({
            query: (data) => ({
                url: '/auth/reset-password',
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