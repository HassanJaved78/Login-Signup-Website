import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import Button from "@mui/material/Button";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";

import GoogleIcon from "../../assets/Svg/google-logo.svg";
import FacebookIcon from "../../assets/Svg/facebook-logo.svg";

import InputField from "../../components/common/InputField";
import PasswordField from "../../components/common/PasswordField";
import RoundButton from "../../components/common/RoundButton";

import { useNavigation, NavLink } from "react-router-dom";

export default function Login() {

    const navigate = useNavigation();

    return (
        <Stack spacing={3}>

            <Typography variant="h3" >Log in</Typography>

            <Typography variant="body2">
                Don't have an account
                <NavLink to="/register" style={{
                    textDecoration: "underline",
                    textUnderlineOffset: 2,
                    fontWeight: "700",
                    marginLeft: "4px",
                    color: "inherit"
                }}>
                    Create an account
                </NavLink>
            </Typography>

            <Stack spacing={2} sx={{ paddingY: 2 }} >
                <InputField name="Email Address" type="email" />
                <PasswordField name="Password" />
                <NavLink to="/forgotpassword" style={{
                    textDecoration: "underline",
                    textUnderlineOffset: 2,
                    fontWeight: "700",
                    color: "inherit",
                    textAlign: "end",
                    fontSize: "14px"
                }}>
                    Forgot Password?
                </NavLink>
            </Stack>

            <RoundButton text="Log in" clickHandler={() => console.log("hi")} />

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
                            onClick={(e) => e.stopPropagation()} //
                        >
                            <Typography variant="body2" sx={{ fontWeight: 600 }} >Terms & Condition</Typography>
                        </Link>
                    </Stack>
                }
            />

            <Divider>
                <Typography sx={{ color: "grey" }}>or</Typography>
            </Divider>

            <Grid container spacing={2}>
                <Grid size={{ xs: 12, md: 6 }}>
                    <Button
                        variant="outlined"
                        fullWidth
                        disableRipple
                        sx={{
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
                        sx={{
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
    )
}