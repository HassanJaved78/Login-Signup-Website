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

export default function Register() {
    return (
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

            <Stack spacing={2} sx={{ paddingY: 2 }} >
                <Grid container columnSpacing={3} width="100%">
                    <Grid size={{ xs: 12, md: 6 }}>
                        <InputField name="First Name" />
                    </Grid>
                    <Grid size={{ xs: 12, md: 6 }}>
                        <InputField name="Last Name" />
                    </Grid>
                </Grid>

                <InputField name="Email" type="email" />
                <PasswordField name="Password" />
            </Stack>

            <RoundButton text="Create Account" clickHandler={() => console.log("hi")} />

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