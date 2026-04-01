import {
  CssBaseline,
  GlobalStyles,
  ThemeProvider,
  createTheme,
  alpha,
} from "@mui/material";
import { useAuth } from "../context/AuthContext";

function AppThemeProvider({ children }) {
  const { mode } = useAuth();

  const theme = createTheme({
    palette: {
      mode,
      primary: { main: "#2563eb" },
      secondary: { main: "#f59e0b" },
      background: {
        default: mode === "light" ? "#f8fafc" : "#0f172a",
        paper: mode === "light" ? "#ffffff" : "#111c34",
      },
    },
    spacing: 8,
    shape: { borderRadius: 12 },
    typography: {
      fontFamily: "Inter, system-ui, -apple-system, Segoe UI, Roboto, sans-serif",
      h1: { fontSize: "2.8rem", fontWeight: 700, lineHeight: 1.2 },
      h2: { fontSize: "2.25rem", fontWeight: 700, lineHeight: 1.25 },
      h3: { fontSize: "1.9rem", fontWeight: 700, lineHeight: 1.25 },
      h4: { fontSize: "1.55rem", fontWeight: 600, lineHeight: 1.3 },
      h5: { fontSize: "1.25rem", fontWeight: 600, lineHeight: 1.35 },
      h6: { fontSize: "1rem", fontWeight: 600, lineHeight: 1.4 },
      body1: { fontSize: "1rem", lineHeight: 1.65 },
      body2: { fontSize: "0.875rem", lineHeight: 1.6 },
    },
    shadows: [
      "none",
      "0 2px 8px rgba(15, 23, 42, 0.06)",
      "0 4px 12px rgba(15, 23, 42, 0.07)",
      "0 8px 20px rgba(15, 23, 42, 0.08)",
      "0 10px 24px rgba(15, 23, 42, 0.09)",
      "0 12px 28px rgba(15, 23, 42, 0.1)",
      "0 14px 32px rgba(15, 23, 42, 0.11)",
      "0 16px 36px rgba(15, 23, 42, 0.12)",
      "0 18px 40px rgba(15, 23, 42, 0.13)",
      "0 20px 44px rgba(15, 23, 42, 0.14)",
      "0 22px 48px rgba(15, 23, 42, 0.15)",
      "0 24px 52px rgba(15, 23, 42, 0.16)",
      "0 26px 56px rgba(15, 23, 42, 0.17)",
      "0 28px 60px rgba(15, 23, 42, 0.18)",
      "0 30px 64px rgba(15, 23, 42, 0.19)",
      "0 32px 68px rgba(15, 23, 42, 0.2)",
      "0 34px 72px rgba(15, 23, 42, 0.21)",
      "0 36px 76px rgba(15, 23, 42, 0.22)",
      "0 38px 80px rgba(15, 23, 42, 0.23)",
      "0 40px 84px rgba(15, 23, 42, 0.24)",
      "0 42px 88px rgba(15, 23, 42, 0.25)",
      "0 44px 92px rgba(15, 23, 42, 0.26)",
      "0 46px 96px rgba(15, 23, 42, 0.27)",
      "0 48px 100px rgba(15, 23, 42, 0.28)",
      "0 50px 104px rgba(15, 23, 42, 0.29)",
    ],
    components: {
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: 12,
          },
        },
      },
      MuiDialog: {
        styleOverrides: {
          paper: {
            borderRadius: 16,
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            backgroundImage: "none",
          },
        },
      },
      MuiButton: {
        defaultProps: { disableElevation: true },
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <GlobalStyles
        styles={{
          body: {
            backgroundColor: theme.palette.background.default,
            color: theme.palette.text.primary,
          },
          "*": {
            scrollbarWidth: "thin",
            scrollbarColor: `${alpha(theme.palette.primary.main, 0.35)} transparent`,
          },
        }}
      />
      {children}
    </ThemeProvider>
  );
}

export default AppThemeProvider;
