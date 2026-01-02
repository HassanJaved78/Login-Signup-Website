import Box from "@mui/material/Box";
import Container from "@mui/material/Container";

import { Outlet, useLocation, useNavigate } from "react-router-dom";

import RegisterImage from "../../assets/images/AuthImages/Register_Page.png";
import LoginImage from "../../assets/images/AuthImages/Login_Page.png";
import ForgotImage from "../../assets/images/AuthImages/Forgot_Page.png";
import VerificationImage from "../../assets/images/AuthImages/Verification_Page.png";
import ResetImage from "../../assets/images/AuthImages/Reset_Page.png";

import KeyboardBackspaceRounded from "@mui/icons-material/KeyboardBackspaceRounded";

const values = {
    login: {
        image: LoginImage,
        background: 'linear-gradient(135deg, #7a1316 16%, #aa6769 29%, #7a1316 42%, #aa6769 70%, #7a1316 83%)'
    },
    register: {
        image: RegisterImage,
        background: 'linear-gradient(135deg, #1a365c 16%, #687b94 29%, #1a365c 42%, #687b94 70%, #1a365c 83%)'
    },
    resetpassword: {
        image: ResetImage,
        background: 'linear-gradient(135deg, #7d9fc9 16%, #98afd3 29%, #7d9fc9 42%, #98afd3 70%, #7d9fc9 83%)'
    },
    forgotpassword: {
        image: ForgotImage,
        background: 'linear-gradient(135deg, #552160 16%, #8b6994 29%, #552160 42%, #8b6994 70%, #552160 83%)'
    },
    otpverification: {
        image: VerificationImage,
        background: 'linear-gradient(135deg, #860c57 16%, #ab588d 29%, #860c57 42%, #ab588d 70%, #860c57 83%)'
    }
}

export default function AuthLayout() {

    const location = useLocation();
    const layout = location.pathname.split('/').reverse()[0];  //used this to split the path name on "/" and then get the last path
    // console.log(layout);

    const navigate = useNavigate();

    const goBack = () => {
        console.log("back");
        navigate(-1);
    }

    return (
        <>
            <Box
                sx={{
                    minHeight: "100vh",
                    background: values[layout].background,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    p: 2
                }}
            >
            {/* main box that spans the whole page */}
                <Container
                    maxWidth= {false}
                    sx={{
                        backgroundColor: "background.default",
                        borderRadius: 10,
                        display: "flex",
                        maxWidth: "1200px",
                        minHeight: "80vh"
                    }}
                >
                    {/* container for form and image */}

                    <Box
                        sx={{
                            display: "block",
                            backgroundImage: `url(${values[layout].image})`,
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                            backgroundRepeat: "no-repeat",
                            width: "50%",
                            margin: 1,
                            borderRadius: 10,
                            marginLeft: -2
                        }}
                    >
                        {/* image box */}
                    </Box>

                    <Box
                        sx={{
                            width: "50%",
                            marginY: 1,
                            display: "flex",
                            // alignItems: "center",
                        }}
                    >
                        {/* form */}
                        <Box
                            sx={{
                                p: 2,
                                marginLeft: 5,
                                marginY: 6,
                                width: "90%",
                            }}
                        >
                            <KeyboardBackspaceRounded onClick={goBack} sx={{ fontSize: 20, cursor: "pointer", marginBottom: 4 }} />
                            
                            {/* Page specific form */}
                            
                            <Outlet />

                        </Box>
                    </Box>

                </Container>

            </Box>
        </>
        
    )
}