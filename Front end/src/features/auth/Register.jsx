import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormHelperText from "@mui/material/FormHelperText";
import Checkbox from "@mui/material/Checkbox";
import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";

import GoogleIcon from "../../assets/Svg/google-logo.svg";
import FacebookIcon from "../../assets/Svg/facebook-logo.svg";

import InputField from "../../components/common/InputField";
import PasswordField from "../../components/common/PasswordField";
import RoundButton from "../../components/common/RoundButton";

import { NavLink } from "react-router-dom";
import { useState } from "react";

export default function Register() {

    const [ error, setError ] = useState({
        firstName: "",
        lastName: "",
        email: "",
        pass: "",
        terms: ""
    });

    const [ form, setForm ] = useState({
        firstName: "",
        lastName: "",
        email: "",
        pass: "",
        termsChecked: false
    })

    const handleChange = (e) => {
        const { name,  value } = e.target;

        setForm((prev) => ({
            ...prev,
            [name]: value
        })
        )

        if ( name === "email" ) {
            validateEmail(value);
            return;
        }
        if ( name === "pass" ) {
            validatePass(value);
            return;
        }

        validateName(name, value);
    }

    const validateEmail = (value) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (!regex.test(value)){
            setError((prev) => ({
                ...prev,
                email: "Invalid Email"
            }))
            return false;
        }
        else {
            setError((prev) => ({
                ...prev,
                email: ""
            }))
            return true;
        }
    };

    const validatePass = (value) => {
        
        if (value.length < 8) {
            setError((prev) => ({
                ...prev,
                pass: "Password must be at least 8 characters"
            }))
            return false;
        }
        else {
            setError((prev) => ({
                ...prev,
                pass: ""
            }))
            return true;
        }
    };

    const validateName = (name, value) => {
        if (!value) {
            setError((prev) => ({
                ...prev,
                [name]: "Please fill this field"
            }));
            return false;
        } else {
            setError((prev) => ({
                ...prev,
                [name]: ""
            }));
            return true;
        }
    }

    const toogleCheckBox = () => {
        setForm((prev) => ({
            ...prev,
            termsChecked: !prev.termsChecked
        }))
        validateCheckBox();
    }

    const validateCheckBox = () => {
        if (!form.termsChecked) {
            setError((prev) => ({ ...prev, terms: "You must agree to the terms" }));
            return false;
        } else {
            setError((prev) => ({ ...prev, terms: "" }));
            return true;
        }
    }

    const createAccount = () => {
        const firstNameValid = validateName("firstName", form.firstName);
        const lastNameValid = validateName("lastName", form.lastName);
        const emailValid = validateEmail(form.email);
        const passValid = validatePass(form.pass);
        const termsValid = validateCheckBox();

        if (firstNameValid && lastNameValid && emailValid && passValid && termsValid) {
            alert("Account created successfully");
        }
    };

    return (
        <Stack spacing={2}>

            <Typography variant="h3" >Create an Account</Typography>

            <Typography variant="body2">
                Alreay have an account?{" "}
                <NavLink to="/login" style={{
                    textDecoration: "underline",
                    textUnderlineOffset: 2,
                    fontWeight: "700",
                    marginLeft: 0.5,
                    color: "inherit"
                }}>
                    Log in
                </NavLink>
            </Typography>

            <Stack spacing={2} sx={{ paddingY: 2 }} >
                <Grid container columnSpacing={3} width="100%">
                    <Grid size={{ xs: 12, md: 6 }}>
                        <InputField name="firstName" value={form.firstName} changeHandler={handleChange} error={error.firstName} label="First Name" />
                    </Grid>
                    <Grid size={{ xs: 12, md: 6 }}>
                        <InputField name="lastName" value={form.lastName} changeHandler={handleChange} error={error.lastName} label="Last Name" />
                    </Grid>
                </Grid>

                <InputField name="email" value={form.email} changeHandler={handleChange} error={error.email} label="Email" type="email" />
                <PasswordField name="pass" value={form.pass} changeHandler={handleChange} error={error.pass} label="Password" />
            </Stack>

            <RoundButton text="Create Account" clickHandler={createAccount} />

            <FormControl error={error.terms}>
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={form.termsChecked}
                            onChange={toogleCheckBox}
                            sx={{
                                // marginLeft: -1.5,
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
                                href=""
                                onClick={(e) => e.stopPropagation()} //
                            >
                                <Typography variant="body2" sx={{ fontWeight: 600 }} >Terms & Condition</Typography>
                            </Link>
                        </Stack>
                    }
                />
                <FormHelperText sx={{ marginLeft: 0, height: "0.7rem" }} >{error.terms || " "}</FormHelperText>
            </FormControl>

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