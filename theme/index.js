// theme.js
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  //   palette: {
  //     primary: {
  //       main: "#1976d2", // custom primary color
  //     },
  //     secondary: {
  //       main: "#ff4081", // custom secondary color
  //     },
  //     background: {
  //       default: "#f9f9f9",
  //       paper: "#ffffff",
  //     },
  //     text: {
  //       primary: "#222",
  //       secondary: "#555",
  //     },
  //   },
  typography: {
    fontFamily: "'Inter', 'Roboto', 'Helvetica', 'Arial', sans-serif",

    // Global font sizes
    fontSize: 16, // default (MUI default is 14)

    h1: { fontSize: "2.5rem", fontWeight: 600 },
    h2: { fontSize: "2rem", fontWeight: 600 },
    h3: { fontSize: "1.75rem", fontWeight: 600 },
    h4: { fontSize: "1.5rem", fontWeight: 600 },
    h5: { fontSize: "1.25rem", fontWeight: 500 },
    h6: { fontSize: "1.125rem", fontWeight: 500 },

    span: { fontSize: "1rem" }, // normal text
    body1: { fontSize: "1rem" }, // normal text
    body2: { fontSize: "0.875rem" }, // secondary text
    button: { fontSize: "2", textTransform: "none" },
  },
  components: {
    // Button customization
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "12px",
          padding: "10px 20px",
        },
        containedPrimary: {
          backgroundColor: "#1976d2",
          "&:hover": {
            backgroundColor: "#115293",
          },
        },
      },
    },
    // TextField customization
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            borderRadius: "10px",
          },
        },
      },
    },
    MuiAccordion: {
      styleOverrides: {
        root: {
          boxShadow: "none",
          "&:before": {
            display: "none",
          },
          "&.Mui-expanded": {
            margin: 0,
          },
        },
      },
    },
    MuiAccordionSummary: {
      styleOverrides: {
        root: {
          "& .MuiTypography-root": {
            fontSize: "1.4rem", // default accordion text size
          },
          minHeight: "initial",
          "&.Mui-expanded": {
            minHeight: "initial",
          },
          margin: 0,
        },
        content: {
          margin: "8px 0px",
          "&.Mui-expanded": {
            margin: "8px 0px",
          },
        },
      },
    },
    MuiAccordionDetails: {
      styleOverrides: {
        root: {
          fontSize: "1.4rem", // details text size
          color: "#444",
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          fontSize: "1.2rem", // details text size
        },
      },
    },
    MuiCheckbox: {
      styleOverrides: {
        root: {
          color: "green", // details text size
          padding: "6px 6px 6px 0",
          "&.Mui-checked": {
            color: "green", // checked state
          },
        },
      },
    },
    MuiSlider: {
      color: "red",
    },
  },
});

export default theme;
