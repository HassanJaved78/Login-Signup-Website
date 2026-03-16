import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import LogoutIcon from "@mui/icons-material/Logout";

import { Outlet } from "react-router-dom";

import ThemeToggle from "../common/ThemeToggle";

import { useLogoutMutation } from "../../app/services/authSlice";
import { useNavigate } from "react-router-dom";

export default function MainLayout() {

    const [logoutUser] = useLogoutMutation();
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await logoutUser().unwrap();
            navigate("/login");
            alert("Logout Successfull");
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
                            // isAuthenticated  // check here if logged in
                            true &&
                            <Button
                                color="inherit"
                                startIcon={<LogoutIcon />}
                                onClick={handleLogout}
                            >
                                Logout
                            </Button>
                        }
                    </Stack>

                </Toolbar>
            </AppBar>

            <Outlet />
        </>
    )
}