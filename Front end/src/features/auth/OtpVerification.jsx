import { useState } from "react";

import Stack from "@mui/material/Stack";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import styled from "@emotion/styled";

import RoundButton from "../../components/common/RoundButton";

import { useVerifyOTPMutation } from "../../app/services/auth/authAPI";

import { useNavigate } from "react-router-dom";

const CustomInput = styled(TextField)({
    "& .MuiOutlinedInput-root": {
        borderRadius: 30,
        height: 52,
    },
    "& .MuiOutlinedInput-input": {
        textAlign: "center",
        padding: 0,
        paddingRight: 5,
        /* Remove number input arrows for all browsers */
        MozAppearance: "textfield",  // Firefox
    },
    /* Chrome, Edge, Safari */
    "& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button": {
        WebkitAppearance: "none",
        margin: 2,
    },
})

export default function OtpVerification() {

    const [verifyOtp, { isLoading }] = useVerifyOTPMutation();
    const navigate = useNavigate();

    const [otp, setOtp] = useState(["", "", "", ""]);
    const [error, setError] = useState("");
    const [openAlert, setOpenAlert] = useState(false);

    const handleChange = (index, e) => {
        const { value } = e.target;
        const newValue = value.slice(-1);

        const regex = /^\d$/;

        if (regex.test(newValue)) {
            const newOtp = [...otp];
            newOtp[index] = newValue;
            setOtp(newOtp);

            // move to next input
            if (index < otp.length - 1) {
                document.getElementById(`otp-${index + 1}`)?.focus();
            }
            // if last input remove focus
            else {
                document.getElementById(`otp-${index}`)?.blur();
            }
        }
    }

    const handleKeyDown = (index, e) => {
        if (e.key === "Backspace") {
            e.preventDefault(); // stop default behavior
            const newOtp = [...otp];

            if (newOtp[index]) {
                newOtp[index] = ""; // clear current box
                setOtp(newOtp);
            }
        }
    };

    const verifyCode = async () => {

        if (otp.some(value => value === "")) {
            setError("Please fill all fields");
            setOpenAlert(true);
            return;
        }

        const otpCode = otp.join("");
        try {
            let email = localStorage.getItem("email");
            console.log(email)
            localStorage.clear();
            await verifyOtp({ email, otp: otpCode }).unwrap();
            alert("Code verified successfully");
            navigate("/resetpassword");
        } catch (err) {
            setError(err?.data?.message || "Invalid code");
            setOpenAlert(true);

            if( err?.data?.code === "OTP_EXPIRED" ) {
                navigate("/forgotpassword");
            }
        }
    }

    return (
        <Stack spacing={3}>

            <Typography variant="h3" >Verification Code</Typography>

            <Typography variant="body2">
                We sent you a verification code on
                <Typography sx={{ fontWeight: 700 }} variant="body2">...abc@gmail.com</Typography>
            </Typography>

            <Stack spacing={2} sx={{ paddingY: 2 }} >

                <Stack direction="row" spacing={2} >

                    {
                        otp.map((value, index) => (
                            <CustomInput
                                key={index}
                                error={error && !value}
                                id={`otp-${index}`}
                                placeholder="0"
                                type="text"
                                value={value}
                                onChange={e => handleChange(index, e)}
                                onKeyDown={e => handleKeyDown(index, e)}
                            />
                        ))
                    }
                </Stack>

                <Typography sx={{ textAlign: "end" }} variant="body2">
                    Resend Code in:{" "}
                    <Typography sx={{ fontWeight: 700 }} variant="body 2">00:24</Typography>
                </Typography>

            </Stack>
            <RoundButton text={ isLoading ? "Verifying" : "Verify Code" } disabled={isLoading} clickHandler={verifyCode} />

            <Snackbar
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                open={openAlert}
                autoHideDuration={3000}
                onClose={() => setOpenAlert(false)}
            >
                <Alert variant="filled" severity="error" onClose={() => setOpenAlert(false)} sx={{ minWidth: '250px' }} >
                    {error}
                </Alert>
            </Snackbar>

        </Stack>
    )
}