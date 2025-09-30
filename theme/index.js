// theme.js
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#16a34a",
      light: "#63a4ff",
      dark: "#0d2329",
      contrastText: "#fff",
    },
    background: {
      default: "#f5f5f5",
      paper: "#ffffff",
    },
    text: {
      primary: "#212121",
      secondary: "#757575",
    },
  },
  typography: {
    fontFamily: "'Inter', 'Roboto', 'Helvetica', 'Arial', sans-serif",
    fontSize: 16,

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
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 4,
          padding: "4px 16px",
        },
        containedPrimary: ({ theme }) => ({
          backgroundColor: theme.palette.primary.main,
          "&:hover": {
            backgroundColor: theme.palette.primary.main,
          },
        }),
        text: ({ theme }) => ({
          fontSize: theme.typography.fontSize * 0.8,
          fontWeight: 600,
          "&:hover": {
            backgroundColor: "transparent",
          },
          "&.Mui-focusVisible": {
            backgroundColor: "transparent",
          },
          "&:active": {
            backgroundColor: "transparent",
          },
        }),
      },
    },
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
        root: ({ theme }) => ({
          fontSize: "1.4rem",
          color: theme.palette.grey["700"],
        }),
      },
    },
    MuiCheckbox: {
      styleOverrides: {
        root: ({ theme }) => ({
          padding: "4px 4px 4px 0",
          "&.Mui-checked": {
            color: theme.palette.primary.main,
          },
        }),
      },
    },
    MuiSlider: {
      styleOverrides: {
        root: ({ theme }) => ({
          color: theme.palette.primary.main,
        }),
      },
    },
    MuiFilledInput: {
      styleOverrides: {
        input: () => ({
          paddingTop: "8px",
          fontSize: "1.4rem",
        }),
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: ({ theme }) => ({
          fontSize: theme.typography.fontSize * 0.9,
        }),
      },
    },
    MuiSvgIcon: {
      styleOverrides: {
        root: ({ theme }) => ({
          fontSize: theme.typography.fontSize * 1.2,
        }),
      },
    },
    MuiFormControlLabel: {
      styleOverrides: {
        label: ({ theme }) => ({
          fontSize: theme.typography.fontSize * 0.9,
        }),
      },
    },
    MuiRadio: {
      styleOverrides: {
        root: ({ theme }) => ({
          paddingBlock: 4,
          paddingInline: 10,
        }),
      },
    },
  },
});

export default theme;
