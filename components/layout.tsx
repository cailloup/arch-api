import NavBar from "@/components/NavBar";
import { ThemeProvider } from "styled-components";
import themes from "@/styles/themes";
import { BodyConainer } from "./assests";


export default function Layout({children}: {children: React.ReactNode;}) {

    return (
      <ThemeProvider theme={themes.default}>
        <NavBar/>
          <BodyConainer>
            {children}
          </BodyConainer>
      </ThemeProvider>

    ); 
  }