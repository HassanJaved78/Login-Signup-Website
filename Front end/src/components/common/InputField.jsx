import styled from "@emotion/styled";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";

const StytledTextField = styled(TextField)({
    "& .MuiOutlinedInput-root": {
        borderRadius: 30,
        height: 52,
    },
});

export default function InputField({ name, type = "text" }) {
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

            <StytledTextField
                variant="outlined"
                fullWidth
                id={name}
                placeholder={name}
                type={type}
            />
        </FormControl>
    );
}