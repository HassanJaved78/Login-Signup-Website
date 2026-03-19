import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import LogoutIcon from "@mui/icons-material/Logout";
import LoginIcon from "@mui/icons-material/Login";
import { Outlet } from "react-router-dom";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import { Link as RouterLink } from "react-router-dom";
import ThemeToggle from "../common/ThemeToggle";

import { useLogoutMutation } from "../../app/services/auth/authAPI.js";
import { useNavigate } from "react-router-dom";

import { logout } from "../../app/services/auth/authSlice.js";
import { useSelector, useDispatch } from "react-redux";

export default function MainLayout() {

    const { user, isAuthenticated } = useSelector(state => state.auth);
    const dispatch = useDispatch();

    const [logoutUser] = useLogoutMutation();
    const navigate = useNavigate();

    const handleLogin = async () => {
        navigate("/login");
    };

    const handleLogout = async () => {
        try {
            await logoutUser().unwrap();
            alert("Logout Successfull");
            dispatch(logout());

        } catch (err) {
            // console.error("Logout failed:", err);
            alert("Not logged in.")
        }
    };

    return (
        <>
            <AppBar position="static" >
                {/* <AppBar position="static" > */}
                <Toolbar
                    sx={{
                        justifyContent: "space-between",
                        alignItems: "text-baseline",
                    }}
                >
                    <Typography>
                        Signup & Login
                    </Typography>

                    <Stack direction={"row"} spacing={2} alignItems={"center"}>
                        {/* Theme Toggler */}
                        <ThemeToggle />

                        {
                            isAuthenticated ?
                                (
                                    <Button
                                        color="inherit"
                                        startIcon={<LogoutIcon />}
                                        onClick={handleLogout}
                                    >
                                        Logout
                                    </Button>
                                ) : (
                                    <Button
                                        color="inherit"
                                        startIcon={<LoginIcon />}
                                        onClick={handleLogin}
                                    >
                                        Login
                                    </Button>
                                )
                        }
                    </Stack>

                </Toolbar>
            </AppBar>

            <Outlet />
        </>
    )
}