import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import PasswordField from "../../components/common/PasswordField";
import RoundButton from "../../components/common/RoundButton";

export default function ResetPassword() {
    return (
        <Stack spacing={3}>

            <Typography variant="h3" >Reset Password</Typography>

            <Typography variant="body2">
                Your new password must be different from your previous passwords.
            </Typography>

            <Stack spacing={2} sx={{ paddingY: 2 }} >
                <PasswordField name="New Password" />
                <PasswordField name="Confirm Password" />
            </Stack>

            <RoundButton text="Reset Password" clickHandler={() => console.log("hi")} />

        </Stack> 
    )
}