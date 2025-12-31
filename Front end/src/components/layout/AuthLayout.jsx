import Box from "@mui/material/Box";
import Container from "@mui/material/Container";

import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";

import ThemeToggle from "../common/ThemeToggle";

import image from "../../assets/images/AuthImages/Login _ Sign up 2.png";
import KeyboardBackspaceRounded from "@mui/icons-material/KeyboardBackspaceRounded";

import InputField from "../common/InputField";
import PasswordField from "../common/PasswordField";
import Stack from "@mui/material/Stack";
import Icon from "@mui/material/Icon";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Divider from "@mui/material/Divider";

import GoogleIcon from "../../assets/Svg/google-logo.svg";
import FacebookIcon from "../../assets/Svg/facebook-logo.svg";

export default function AuthLayout(login = true) {
    return (
        <>
            <AppBar position="sticky" >
                <Toolbar
                    sx={{
                        justifyContent: "space-between",
                        alignItems: "center"
                    }} 
                >
                    <Typography>
                        Signup & Login
                    </Typography>

                    {/* Theme Toggler */}
                    <ThemeToggle />
                </Toolbar>
            </AppBar>

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
                    backgroundColor: "background.default",
                    borderRadius: 10,
                    display: "flex",
                    maxWidth: "1200px"
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
                        width: "50%",
                        marginY: 1,
                        display: "flex",
                        alignItems: "center",
                    }}
                >
                    {/* form */}
                    <Box
                        sx={{
                            p: 2,
                            marginLeft: 5,
                            marginY: 6,
                        }}
                    >
                        <KeyboardBackspaceRounded sx={{ fontSize: 20, cursor: "pointer", marginBottom: 4 }} />
                        
                        <Stack spacing={3}>

                            <Typography variant="h3" >Create an Account</Typography>

                            <Typography variant="body2">
                                Alreay have an account?
                                <Link sx={{
                                    textDecoration: "underline",
                                    textUnderlineOffset: 2,
                                    fontWeight: "700",
                                    marginLeft: 0.5,
                                    color: "inherit"
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
                                variant="contained"
                                sx={{
                                    borderRadius: 30,
                                    height: 52,
                                }}
                            >
                                Create Account
                            </Button>
                            
                            <FormControlLabel
                                control={
                                    <Checkbox
                                    sx={{
                                        marginLeft: -1.5,
                                        color: "inherit",
                                        "&.Mui-checked": {
                                            color: "inherit"
                                        },
                                    }}
                                    />
                                }
                                label={
                                    <Stack direction={"row"}>
                                        <Typography variant="body2">I agree to the</Typography>
                                        <Link
                                            sx={{
                                                color: "inherit",
                                                textDecoration: "underline",
                                                textUnderlineOffset: 2,
                                                marginLeft: 0.5,
                                            }}
                                            href="#"
                                            onClick={(e) => e.stopPropagation()} // ✅ stop toggling the checkbox
                                        >
                                            <Typography variant="body2" sx={{ fontWeight: 600 }} >Terms & Condition</Typography>
                                        </Link>
                                    </Stack>
                                }
                            />

                            <Divider>
                                <Typography sx={{ color:"grey" }}>or</Typography>
                            </Divider>

                            <Grid container spacing={2}>
                                <Grid size={{ xs: 12, md: 6 }}>
                                    <Button
                                        variant="outlined"
                                        fullWidth
                                        disableRipple
                                        sx = {{
                                            borderRadius: "50px",  
                                            height: 52,
                                            color: "inherit",
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: 1,
                                            borderColor: "#E0E0E0",
                                        }}
                                        startIcon={
                                            <Box
                                                component="img"
                                                src={GoogleIcon}
                                                alt="Google"
                                                sx={{ width: 20, height: 20 }}
                                            />
                                        }
                                    >
                                        <Typography variant="body2" >Continue with Google</Typography>
                                    </Button>
                                </Grid>
                                <Grid size={{ xs: 12, md: 6 }} alignItems={"center"}>
                                    <Button
                                        variant="outlined"
                                        fullWidth
                                        disableRipple
                                        sx = {{
                                            borderRadius: "50px",  
                                            height: 52,
                                            color: "inherit",
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: 1,
                                            borderColor: "#E0E0E0",
                                        }}
                                        startIcon={
                                            <Box
                                                component="img"
                                                src={FacebookIcon}
                                                alt="Facebook"
                                                sx={{ width: 20, height: 20 }}
                                            />
                                        }
                                    >
                                        <Typography variant="body2" >Continue with Facebook</Typography>
                                    </Button>
                                </Grid>
                            </Grid>

                        </Stack>    

                    </Box>
                </Box>

            </Container>

        </Box>
        </>
        
    )
}