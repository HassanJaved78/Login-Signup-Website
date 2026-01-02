import { createBrowserRouter } from "react-router-dom";

import MainLayout from "../components/layout/MainLayout";
import AuthLayout from '../components/layout/AuthLayout';
import Register from '../features/auth/Register';
import Login from '../features/auth/Login';
import ForgotPassword from '../features/auth/ForgotPassword';
import ResetPassword from '../features/auth/ResetPassword';
import OtpVerification from '../features/auth/OtpVerification';
import RouteError from "./RouteError";

const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout />,
        errorElement: <RouteError />,
        children: [
            {
                element: <AuthLayout />,
                children: [
                    {
                        path: "login",
                        element: <Login />
                    },
                    {
                        path: "register",
                        element: <Register />
                    },
                    {
                        path: "resetpassword",
                        element: <ResetPassword />
                    },
                    {
                        path: "forgotpassword",
                        element: <ForgotPassword />
                    },
                    {
                        path: "otpverification",
                        element: <OtpVerification />
                    }
                ]
            }
        ]
    }
])

export default router;