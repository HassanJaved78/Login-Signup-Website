import Box from "@mui/material/Box";
import Container from "@mui/material/Container";

import image from "../../assets/images/AuthImages/Login _ Sign up 2.png";

import InputField from "../common/InputField";
import PasswordField from "../common/PasswordField";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import Button from "@mui/material/Button";

export default function AuthLayout(login = true) {
    return (
        <Box
            sx={{
                minHeight: "100vh",
                background: 'linear-gradient(135deg, #1E3A8A, #64748B)',
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
                    backgroundColor: "white",
                    height: "700px",
                    borderRadius: 10,
                    display: "flex",
                    maxWidth: "1100px"
                }}
            >
                {/* container for form and image */}

                <Box
                    sx={{
                        display: "block",
                        backgroundImage: `url(${image})`,
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
                        backgroundColor: "success.main",
                        width: "50%",
                        marginY: 1,
                    }}
                >
                    {/* form */}
                    <Box
                        sx={{
                            p: 2
                        }}
                    >
                        <Stack spacing={3}>
                            <Typography variant="h4">Create an Account</Typography>

                            <Typography>
                                Alreay have an account?
                                <Link sx={{
                                    color: "black",
                                    textDecoration: "underline",
                                    textUnderlineOffset: 2,
                                    fontWeight: "bold",
                                    marginLeft: 0.5
                                }}>
                                    Log in
                                </Link>
                            </Typography>

                            <Stack spacing={2}>
                                <Grid container columnSpacing={3} width="100%"> 
                                    <Grid size={{ xs:12, md:6 }}>
                                        <InputField name="First Name" />
                                    </Grid>
                                    <Grid size={{ xs:12, md:6 }}>
                                        <InputField name="Last Name" />
                                    </Grid>
                                </Grid>

                                <InputField name="Email" type="email" />
                                <PasswordField name="Password" />
                            </Stack>

                            <Button
                                    sx={{
                                        bgcolor: "black",
                                        borderRadius: 30,
                                        height: 52,
                                        color: "white",
                                        textTransform: "inherit",
                                    }}
                                >
                                    Create Account
                            </Button>
                            
                            

                        </Stack>    

                    </Box>
                </Box>

            </Container>

        </Box>
    )
}