import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import PasswordField from "../../components/common/PasswordField";
import RoundButton from "../../components/common/RoundButton";

import { useState } from "react";

export default function ResetPassword() {

    const [ form, setForm ] = useState({
        pass: "",
        confirmPass: ""
    })

    const [error, setError] = useState({
        pass: "",
        confirmPass: ""
    });

    const validatePass = () => {
        if (form.pass === "") {
            setError(prev => ({ ...prev, pass: "Password cannot be empty" }));
            return false;
        }
        if (form.pass.length < 8) {
            setError(prev => ({ ...prev, pass: "Password must be at least 8 characters" }));
            return false;
        }
        
        setError(prev => ({ ...prev, pass: "" }));
        return true;
    }

    const validateConfirmPass = () => {
        if (form.confirmPass === "" || form.confirmPass != form.pass) {
            setError(prev => ({ ...prev, confirmPass: "Confirm password must match" }));
            return false;
        }

        setError(prev => ({ ...prev, confirmPass: "" }));
        return true;
    }

    const handleChange = (e) => {
        const { name, value } = e.target;

        setForm(prev => ({
            ...prev,
            [name]: value
        }))

        setError(prev => ({
        ...prev,
        [name]: ""
    }));
    }

    const resetPassword = () => {
        let validPass = validatePass();
        let validConfirmPass = validateConfirmPass();
        
        if(validPass && validConfirmPass) {
            alert("password resetted");
        }
    }

    return (
        <Stack spacing={3}>

            <Typography variant="h3" >Reset Password</Typography>

            <Typography variant="body2">
                Your new password must be different from your previous passwords.
            </Typography>

            <Stack spacing={2} sx={{ paddingY: 2 }} >
                <PasswordField 
                    label="New Password" 
                    name="pass"
                    value={form.pass}
                    changeHandler={handleChange}
                    error={error.pass}
                />
                <PasswordField 
                    label="Confirm Password" 
                    name="confirmPass"
                    value={form.confirmPass}
                    changeHandler={handleChange}
                    error={error.confirmPass}
                />
            </Stack>

            <RoundButton text="Reset Password" clickHandler={resetPassword} />

        </Stack> 
    )
}