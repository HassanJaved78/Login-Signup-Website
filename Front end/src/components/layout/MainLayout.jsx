import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

import { Outlet } from "react-router-dom";

import ThemeToggle from "../common/ThemeToggle";

export default function MainLayout() {
    return (
        <>  
            <AppBar position="sticky" >
            {/* <AppBar position="static" > */}
                <Toolbar
                    sx={{
                        justifyContent: "space-between",
                        alignItems: "text-baseline"
                    }} 
                >
                    <Typography>
                        Signup & Login
                    </Typography>

                    {/* Theme Toggler */}
                    <ThemeToggle />
                </Toolbar>
            </AppBar>

            <Outlet />
        </>
    )
}