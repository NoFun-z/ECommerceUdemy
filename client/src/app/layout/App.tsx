import { Container, CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import Header from "./Header";
import { useCallback, useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import LoadingComponent from "./LoadingComponent";
import { useAppDispatch } from "../store/ConfigureStore";
import { fetchBasketAsync } from "../../features/basket/BasketSlice";
import { fetchCurrentUser } from "../../features/account/AccountSlice";

export default function App() {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(true);

  const initApp = useCallback(async () => {
    try{
      await dispatch(fetchCurrentUser());
      await dispatch(fetchBasketAsync());
    }
    catch (er){
      console.log(er)
    }
  }, [dispatch])

  useEffect(() => {
    initApp().then(() => setLoading(false));
  }, [initApp])

  const [darkmode, setDarkMode] = useState(false);
  const paletteType = darkmode ? 'dark' : 'light';

  const theme = createTheme({
    palette: {
      mode: paletteType,
      background: {
        default: paletteType === 'light' ? '#eaeaea' : '#121212'
      }
    }
  })

  function ThemeSwitchHandler() {
    setDarkMode(prev => !prev)
  }

  if (loading) return <LoadingComponent message="Initializing app..."></LoadingComponent>

  return (
    <>
      <ThemeProvider theme={theme}>
        <ToastContainer position="bottom-right" hideProgressBar theme="colored" />
        <CssBaseline />
        <Header darkMode={darkmode} ThemeChangeHandler={ThemeSwitchHandler} />
        <Container>
          <Outlet />
        </Container>
      </ThemeProvider>
    </>
  );
}

