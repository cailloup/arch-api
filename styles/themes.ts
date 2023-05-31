import { DefaultTheme } from 'styled-components';

export interface MyTheme {
  primary: string,
  secondary: string,
  secondaryContrast: string,
  generalText: string,
  primaryContrast: string,
}

declare module 'styled-components' {
  export interface DefaultTheme extends MyTheme {}
}


const themes = {

    blueDark: {
      primary: 'rgb(255, 255, 255)',
      secondary: "rgb(45, 58, 72)",
      generalText: 'rgb(0, 0, 0)',
      secondaryContrast: 'rgb(255, 255, 255)',
      primaryContrast:'rgb(45, 58, 72)',
    },
    default:{
      primary: 'rgb(255, 255, 255)',
      secondary: 'rgb(41, 134, 204)',
      secondaryContrast: 'rgb(255, 255, 255)',
      generalText: 'rgb(0, 0, 0)',
      primaryContrast: 'rgb(41, 134, 204)',
    },
    dark: {
      primary: 'rgb(24, 24, 24)',
      secondary: "rgb(31, 31, 31)",
      generalText: 'rgb(255, 255, 255)',
      secondaryContrast: 'rgb(255, 255, 255)',
      primaryContrast:'rgb(255, 255, 255)',
    },
  
  };
  
  export default themes;

  export type ThemesKey = keyof typeof themes;