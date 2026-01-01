import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    colorSchemes: {
        light: {
            palette: {
                primary: {
                    main: "#000000", // Deep Blue
                    contrastText: "#ffffff",
                },
                secondary: {
                    main: "#64748B", // Slate Grey
                },
                background: {
                    default: "white", // Soft grey background
                    paper: "#FFFFFF",   // Pure white for cards
                },
                text: {
                    primary: "#111827", // Dark grey text (softer than pure black)
                    secondary: "#6B7280",
                },
            },
        },

        dark: {
            palette: {
                primary: {
                    main: "#ffffffff", // Lighter Blue (better visibility on dark bg)
                    contrastText: "#000000",
                },
                secondary: {
                    main: "#94A3B8",
                },
                background: {
                    default: "#0F172A", // Deep Slate Blue background
                    paper: "#1E293B",   // Slightly lighter slate for cards
                },
                text: {
                    primary: "#F9FAFB", // Off-white text
                    secondary: "#9CA3AF",
                },
            },
        },
    },

    // 3. Global Typography Settings
    typography: {
        fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',

        button: {
            textTransform: "none",
        },
    },

    // 4. Global Components Setting
    components: {
        MuiOutlinedInput: {
            styleOverrides: {
                input: {
                    textIndent: 6
                },
            }
        }
    }
    }
);
    

export default theme;

// xs, extra-small: 0px
// sm, small: 600px
// md, medium: 900px
// lg, large: 1200px
// xl, extra-large: 1536px