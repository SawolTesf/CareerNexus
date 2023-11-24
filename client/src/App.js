import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import HomePage from "scenes/homePage";
import LoginPage from "scenes/loginPage";
import ProfilePage from "scenes/profilePage";
import { useMemo } from "react"; // useMemo is used to prevent the theme from being recreated on every render.
import { useSelector } from "react-redux";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { themeSettings } from "theme";

function App() {
  const mode = useSelector((state) => state.mode); // Get the mode from the Redux store.
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]); // Create the theme using the mode.

  return <div className="app">
    <BrowserRouter>
    <ThemeProvider theme={theme}>
      <CssBaseline /> {/* CssBaseline is used to reset the CSS. */}
    </ThemeProvider>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/profile/:userId" element={<ProfilePage />} />
      </Routes>
    </BrowserRouter>
  </div>;
}

export default App;
