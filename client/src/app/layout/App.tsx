import { Container, CssBaseline, ThemeProvider, Typography, createTheme } from "@mui/material";
import Header from "./Header";
import { useState } from "react";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export default function App() {
  const [darkmode, setDarkMode] = useState(false);
  const paletteType = darkmode? 'dark' : 'light';

  const theme = createTheme({
    palette: {
      mode: paletteType,
      background: {
        default: paletteType === 'light' ? '#eaeaea' : '#121212'
      }
    }
  })

  function ThemeSwitchHandler(){
    setDarkMode(prev => !prev)
  }

  return (
    <>
      <ThemeProvider theme={theme}>
        <ToastContainer position="bottom-right" hideProgressBar theme="colored"/>
        <CssBaseline />
        <Header darkMode={darkmode} ThemeChangeHandler={ThemeSwitchHandler}/>
        <Container>
          <Outlet />
        </Container>
      </ThemeProvider>
    </>
  );
}

