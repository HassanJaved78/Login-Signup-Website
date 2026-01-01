import Button from "@mui/material/Button";

export default function RoundButton({ text, clickHandler }) {
    return (
        <Button
            variant="contained"
            sx={{
                borderRadius: 30,
                height: 52,
            }}
            onClick={clickHandler}
        >
            {text}
        </Button>
    )
}