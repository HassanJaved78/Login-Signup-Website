import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import styled from "@emotion/styled";

import RoundButton from "../../components/common/RoundButton";

const CustomInput = styled(TextField) ({
    "& .MuiOutlinedInput-root": {
        borderRadius: 30,
        height: 52,
    },
    "& .MuiOutlinedInput-input": {
        textAlign: "center",
        padding: 0,
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
    return (
        <Stack spacing={3}>

            <Typography variant="h3" >Verification Code</Typography>

            <Typography variant="body2">
                We sent you a verification code on 
                <Typography sx={{ fontWeight: 700 }} variant="body 2">...abc@gmail.com</Typography>
            </Typography>

            <Stack spacing={2} sx={{ paddingY: 2 }} >
                
                <Stack direction="row" spacing={2} >
                    <CustomInput placeholder="0" type="number" />
                    <CustomInput placeholder="0" type="number" />
                    <CustomInput placeholder="0" type="number" />
                    <CustomInput placeholder="0" type="number" />
                </Stack>
                
                <Typography sx={{ textAlign: "end" }} variant="body2">
                    Resend Code in:{" "}
                    <Typography sx={{ fontWeight: 700 }} variant="body 2">00:24</Typography>
                </Typography>

            </Stack>
            <RoundButton text="Verify Code" clickHandler={() => console.log("hi")} />

        </Stack> 
    )
}