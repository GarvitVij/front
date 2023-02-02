import { createTheme } from "@mui/material/styles";
let theme = createTheme();
theme = createTheme(theme, {
    paleete: {
        ...theme.palette,
        primary: {
            main: "#8AAAE5",
            dark: "#8AAAE5",
        },
    },
    components: {
        MuiTableBody: {
            styleOverrides: {
                root: {
                    // overrides here
                },
            },
        },
    },
});
export default theme;
