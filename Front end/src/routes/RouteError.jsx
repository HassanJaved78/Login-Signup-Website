import { useRouteError } from "react-router-dom";
import {
  Box,
  Typography,
  Button,
  Paper,
} from "@mui/material";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { useNavigate } from "react-router-dom";

function RouteError() {
    const error = useRouteError();
    const navigate = useNavigate();

    // console.log(error)
    // console.log(window.history);

    const handleBack = () => {
        if (window.history.length > 3) {
            navigate(-1);
        } else {
            navigate("/", { replace: true });
        }
    };

    return (
        <Box
        sx={{
            minHeight: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            bgcolor: "background.default",
            px: 2,
        }}
        >
            <Paper
                elevation={6}
                sx={{
                    maxWidth: 420,
                    width: "100%",
                    p: 4,
                    textAlign: "center",
                    borderRadius: 3,
                }}
            >
                <ErrorOutlineIcon
                    color="error"
                    sx={{ fontSize: 64, mb: 2 }}
                />

                <Typography variant="h4" gutterBottom>
                    OOPS
                </Typography>

                <Typography
                    variant="body1"
                    color="text.secondary"
                    sx={{ mb: 3 }}
                >
                    <Typography>Something went Wrong</Typography>
                    <Typography>{error.status && error.status != undefined ? `${error.status} - ${error.statusText}` : ""}</Typography>
                </Typography>

                <Box sx={{ display: "flex", gap: 2, justifyContent: "center" }}>
                    <Button
                        variant="contained"
                        onClick={() => navigate("/", { replace: true })}
                    >
                        Go Home
                    </Button>

                    <Button
                        variant="outlined"
                        onClick={handleBack}
                    >
                        Go Back
                    </Button>
                </Box>
            </Paper>
        </Box>
    );
}

export default RouteError;
