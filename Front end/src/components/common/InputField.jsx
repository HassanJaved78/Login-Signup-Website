import styled from "@emotion/styled";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";

const StytledTextField = styled(TextField)({
    "& .MuiOutlinedInput-root": {
        borderRadius: 30,
        height: 52,
    },
    "& .MuiFormHelperText-root": {
        marginLeft: 0,       // align left with input box
        height: "0.5rem"
    },
});

export default function InputField({ name, label, type = "text", value, changeHandler, error }) {
    return (
        <FormControl fullWidth>
            <InputLabel
                shrink
                // error={error}
                htmlFor={label}
                sx={{
                    color: "text.primary",
                    fontWeight: 500,
                    mb: 0.5,
                    position: "static",
                    transform: "none",
                }}
            >
                {label}
            </InputLabel>

            <StytledTextField
                // error
                // helperText="error"
                variant="outlined"
                fullWidth
                value={value}
                onChange={changeHandler}
                error={error}
                helperText={error || " "}
                id={label}
                placeholder={label}
                type={type}
                name={name}
            />
        </FormControl>
    );
}