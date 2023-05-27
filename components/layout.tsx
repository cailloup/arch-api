import NavBar from "@/components/NavBar";
import { ThemeProvider } from "styled-components";
import themes, { ThemesKey } from "@/styles/themes";
import { BodyConainer } from "./assets";
import { useState, createContext } from "react";
import { ToastContainer } from "react-toastify";

export const ThemeContext = createContext({
  theme: 'default' as ThemesKey,
  setTheme: (theme:ThemesKey ) => {},
});

export default function Layout({children}: {children: React.ReactNode;}) {
  const [theme, setTheme] = useState('default' as ThemesKey);
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