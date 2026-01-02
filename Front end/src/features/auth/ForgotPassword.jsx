import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import InputField from "../../components/common/InputField";
import RoundButton from "../../components/common/RoundButton";

export default function ForgotPassword() {
    return (
        <Stack spacing={3}>

            <Typography variant="h3" >Forgot Password</Typography>

            <Typography variant="body2">
                We'll send a verification code to your email address
            </Typography>

            <Stack spacing={2} sx={{ paddingY: 2 }} >
                <InputField label="Email Address" type="email" />
            </Stack>

            <RoundButton text="Send Verification Code" clickHandler={() => console.log("hi")} />

        </Stack> 
    )
}