import { useEffect, useState } from "react";
import {Container,ThemeProvider,createTheme,CssBaseline,CircularProgress,} from "@mui/material";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import ResponsiveAppBar from "./components/Navbar/ResponsiveAppBar";
import MuiBottomNavigators from "./components/MuiBottomNavigators";
import SecondaryAppBar from "./components/Navbar/SecondaryAppBar";
import Router from "./routes/Router";
import { useSelector } from "react-redux";
import useLoggedIn from "./hooks/useLoggedIn";
import AutoLogoutPage from "./pages/AutoLogoutPage";

const light = {
  palette: {
    primary: {
      main: '#229742'
    }, 
      mode: "light",
    
    
  },
};

const dark = {
  palette: {
    mode: "dark",
  },
};

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const loggedIn = useLoggedIn();
 
  
  useEffect(() => {
    (async () => {
      await loggedIn();
      setIsLoading(false);
    })();
  }, []);

  const isDarkTheme = useSelector(
    (bigPie) => bigPie.darkThemeSlice.isDarkTheme
  );
  return (
    <ThemeProvider theme={isDarkTheme ? createTheme(dark) : createTheme(light)}>
      <CssBaseline />
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <Container>
        <header>
          <ResponsiveAppBar />
          

        </header>
        <main>
          {isLoading ? <CircularProgress /> : <Router />}
          <AutoLogoutPage logoutTimeInMs={ 4 * 60 * 60 * 1000} /> 
          
        </main>
        
        <footer >
         {/*  <ThemeProvider theme={isDarkTheme ? createTheme(dark) : createTheme(light)}>
          <MuiBottomNavigators/>
          </ThemeProvider> */}
          {/* <div style={{ textAlign: 'center', marginTop: '10px' }}>
          <span>&copy; {new Date().getFullYear()} created by Dikla Shaked</span>
        </div> */}
        <MuiBottomNavigators/>
        </footer>
        
      </Container>
    </ThemeProvider>
  );
}

export default App;
