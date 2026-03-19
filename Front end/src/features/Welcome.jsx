import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import { Link as RouterLink } from "react-router-dom";
import { logout } from "../app/services/auth/authSlice.js";
import { useSelector, useDispatch } from "react-redux";

export default function MainLayout() {

    const { user, isAuthenticated } = useSelector(state => state.auth);
    const dispatch = useDispatch();

    return (
        <>
            <Container maxWidth="md">
                <Box
                    sx={{
                        mt: 10,
                        textAlign: "center",
                    }}
                >
                    <Typography variant="h3" gutterBottom>
                        Welcome to Our Platform
                    </Typography>

                    {!isAuthenticated ? (
                        <Stack spacing={3} alignItems="center">
                            <Typography variant="h6" color="text.secondary">
                                Please login to continue.
                            </Typography>

                            <Button
                                variant="contained"
                                size="large"
                                component={RouterLink}
                                to="/login"
                            >
                                Login
                            </Button>
                        </Stack>
                    ) : (
                        <Stack spacing={3} alignItems="center">
                            <Typography variant="h6">
                                Hello, {user?.name || "User"} 👋
                            </Typography>

                            <Button
                                variant="contained"
                                color="error"
                                size="large"
                                onClick={() => dispatch(logout())}
                            >
                                Logout
                            </Button>
                        </Stack>
                    )}
                </Box>
            </Container>
        </>
    )
}