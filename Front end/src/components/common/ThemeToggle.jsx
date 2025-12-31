import Box from "@mui/material/Box";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Typography from "@mui/material/Typography";

import { useColorScheme } from "@mui/material";

export default function ThemeToggle() {
    const { mode = "system", setMode } = useColorScheme();

    return (
        <Box sx={{ width: 180, display: "flex", alignItems:"center", gap: 2 }}>
            <Typography>Theme</Typography>
            <FormControl fullWidth size="small" >
                <Select
                    value={mode}
                    onChange={(event) => setMode(event.target.value)}
                    onClose={(event) => event.target}
                    sx={{
                        color: "white", 
                        ".MuiSelect-icon": { color: "white" }, // make dropdown arrow white
                    }}
                >
                    <MenuItem value="system" >System</MenuItem>
                    <MenuItem value="light" >Light</MenuItem>
                    <MenuItem value="dark" >Dark</MenuItem>
                </Select>
            </FormControl>
        </Box>
    )
}