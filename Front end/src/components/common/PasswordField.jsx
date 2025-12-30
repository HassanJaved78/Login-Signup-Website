import styled from "@emotion/styled";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from '@mui/material/InputAdornment';

import VisibilityOff from "@mui/icons-material/VisibilityOffOutlined"
import Visibility from "@mui/icons-material/VisibilityOutlined"

import { useState } from "react";

const StyledTextField = styled(TextField)({
    "& .MuiOutlinedInput-root": {
        borderRadius: 30,
        height: 52,
    },
});

export default function PasswordField({ name }) {

    const [ showPass, setShowPass ] = useState(false);

    const toggleShowPass = () => {
        setShowPass(!showPass);
    }

    return (
        <FormControl fullWidth>
            <InputLabel
                shrink
                htmlFor={name}
                sx={{
                    color: "black",
                    fontWeight: 500,
                    mb: 0.5,
                    position: "static",
                    transform: "none",
                }}
            >
                {name}
            </InputLabel>

            <StyledTextField
                variant="outlined"
                fullWidth
                id={name}
                type={showPass ? "text" : "password"}
                placeholder={name}
                slotProps={{
                    input: {
                        endAdornment: (
                            <InputAdornment onClick={toggleShowPass}>
                                {
                                    showPass ? <Visibility /> : <VisibilityOff />
                                }
                            </InputAdornment>
                        )
                    }
                }}
            />
        </FormControl>
    );
}