import NavBar from "@/components/NavBar";
import { ThemeProvider } from "styled-components";
import themes, { ThemesKey } from "@/styles/themes";
import { BodyConainer } from "./assets";
import { useState, createContext } from "react";
import { ToastContainer } from "react-toastify";
import { useLoadScript } from "@react-google-maps/api";
import GoogleMapsConfig from "@/configs/mapsApi";

export const ThemeContext = createContext({
  theme: 'default' as ThemesKey,
  setTheme: (theme:ThemesKey ) => {},
});

const libraries: ('places')[] = ['places']

export default function Layout({children}: {children: React.ReactNode;}) {
  const {isLoaded} = useLoadScript({
    libraries:libraries,
    googleMapsApiKey:'AIzaSyATNDswrRQLqhoxDwYh9B9W0Jp90NVGcEY'
  });
  const [theme, setTheme] = useState('default' as ThemesKey);
  if(isLoaded)
    return (
      <>
          <ToastContainer
            position="top-center"
            autoClose={2000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme= {theme=="default"?"light":"dark"}
          />
        <ThemeProvider theme={themes[theme]}>
          <NavBar/>
            <BodyConainer>
              <ThemeContext.Provider value={{ theme, setTheme }}>
                {children}
              </ThemeContext.Provider>
            </BodyConainer>
        </ThemeProvider>
      </>
    ); 
  }