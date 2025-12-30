import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    colorSchemes: {
        light: {
        palette: {
            primary: {
                main: '#000000',
            },
            background: {
                default: '#F5F6FA',
                paper: '#FFFFFF',
            },
            text: {
                primary: '#111111',
                secondary: '#6B7280',
            },
            divider: '#E5E7EB',
        },
        },

        dark: {
        palette: {
            primary: {
                main: '#FFFFFF',
            },
            background: {
                default: '#0B0D12',
                paper: '#12151C',
            },
            text: {
                primary: '#F9FAFB',
                secondary: '#9CA3AF',
            },
            divider: '#1F2937',
        },
        },
    },

    typography: {
        fontFamily: `'Inter', sans-serif`,
        h4: {
        fontWeight: 600,
            ontSize: '32px',
        },
        body1: {
            ntSize: '14px',
        },
        button: {
            textTransform: 'none',
            fontWeight: 500,
        },
    },

    // shape: {
    //     borderRadius: 24,
    // },

    // components: {
    //     MuiOutlinedInput: {
    //     styleOverrides: {
    //         root: {
    //             borderRadius: 28,
    //             height: 52,
    //         },
    //     },
    //     },

    //     MuiButton: {
    //     styleOverrides: {
    //         root: {
    //             borderRadius: 28,
    //             height: 52,
    //         },
    //     },
    //     },
    // },
    });

export default theme;



// xs, extra-small: 0px
// sm, small: 600px
// md, medium: 900px
// lg, large: 1200px
// xl, extra-large: 1536px