import { Container, CssBaseline, ThemeProvider, Typography, createTheme } from "@mui/material";
import Catalog from "../../features/catalog/Catalog";
import Header from "./Header";
import { useState } from "react";

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
        <CssBaseline />
        <Header darkMode={darkmode} ThemeChangeHandler={ThemeSwitchHandler}/>
        <Container>
          <Catalog />
        </Container>
      </ThemeProvider>
    </>
  );
}

