import { createTheme, responsiveFontSizes } from "@mui/material";

let theme = createTheme({
  palette: {
    primary: {
      main: "#fbd5d5",
      ewan: "#fbd5d5",
    },
    secondary: {
      main: "#e78686",
    },
  },
});

theme = responsiveFontSizes(theme);

export default theme;
