import Button from "@mui/material/Button";

export default function RoundButton({ text, clickHandler, disabled }) {
    return (
        <Button
            variant="contained"
            sx={{
                borderRadius: 30,
                height: 52,
            }}
            onClick={clickHandler}
            disabled={disabled}
        >
            {text}
        </Button>
    )
}