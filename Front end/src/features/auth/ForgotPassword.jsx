import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import InputField from "../../components/common/InputField";
import RoundButton from "../../components/common/RoundButton";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ForgotPassword() {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [emailError, setEmailError] = useState("");

    const validateEmail = (value) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (!regex.test(value)){
            setEmailError("Invalid Email");
            return false;
        }
        else {
            setEmailError("");
            return true;
        }
    };

    const handleChange = (e) => {
        const {value} = e.target;
        setEmail(value);
        validateEmail(value);
    }

    const handleButtonClick = () => {
        if(validateEmail(email)) {
            alert("Verification code sent");
            navigate("/otpverification")
        }
    }

    return (
        <Stack spacing={3}>

            <Typography variant="h3" >Forgot Password</Typography>

            <Typography variant="body2">
                We'll send a verification code to your email address
            </Typography>

            <Stack spacing={2} sx={{ paddingY: 2 }} >
                <InputField 
                    name="email"
                    label="Email Address" 
                    type="email" 
                    value={email}
                    changeHandler={handleChange}
                    error={emailError}
                />
            </Stack>

            <RoundButton text="Send Verification Code" clickHandler={handleButtonClick} />

        </Stack> 
    )
}