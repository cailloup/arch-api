import NavBar from "@/components/NavBar";
import { ThemeProvider } from "styled-components";
import themes, { ThemesKey } from "@/styles/themes";
import { BodyConainer } from "./assests";
import { useState, createContext } from "react";

export const ThemeContext = createContext({
  theme: 'default' as ThemesKey,
  setTheme: (theme:ThemesKey ) => {},
});

export default function Layout({children}: {children: React.ReactNode;}) {
  const [theme, setTheme] = useState('default' as ThemesKey);
    return (
      <ThemeProvider theme={themes[theme]}>
        <NavBar/>
          <BodyConainer>
            <ThemeContext.Provider value={{ theme, setTheme }}>
              {children}
            </ThemeContext.Provider>
          </BodyConainer>
      </ThemeProvider>

    ); 
  }