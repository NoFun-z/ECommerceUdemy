import { Container, CssBaseline, ThemeProvider, Typography, createTheme } from "@mui/material";
import Header from "./Header";
import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useStoreContext } from "../context/StoreContext";
import getCookie from "../util/util";
import agent from "../api/agent";
import LoadingComponent from "./LoadingComponent";
import { useAppDispatch } from "../store/ConfigureStore";
import { setBasket } from "../../features/basket/BasketSlice";

export default function App() {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const buyerId = getCookie("buyerId");
    if (buyerId) {
      agent.Basket.get()
        .then(basket => dispatch(setBasket(basket)))
        .catch(er => console.log(er))
        .finally(() => setLoading(false));
    }
    else {
      setLoading(false)
    }
  }, [dispatch])

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

