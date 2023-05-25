import styled, { css } from "styled-components";

interface NavProps extends React.HTMLAttributes<HTMLElement> {
    $primary?: boolean;
}
interface DivProps extends React.HTMLAttributes<HTMLElement> {
    $primary?: boolean;
}
interface InputProps extends React.HTMLAttributes<HTMLElement> {
    $notDisplay?: boolean;
}

export const Nav = styled.nav<NavProps>`
    background-color: ${props => props.theme.secondary};

    *{
        color: ${props => props.theme.secondaryContrast};
        fill: ${props => props.theme.secondaryContrast};
    }

    li::before{
        background-color: ${props => props.theme.secondaryContrast};
    }

    ${props => props.$primary && css`
        background-color: ${props => props.theme.primary};
        *{
            color: ${props => props.theme.generalText};
            fill: ${props => props.theme.generalText};
        }
        li::before{
            background-color: ${props => props.theme.primaryContrast};
        }
    `}

`;

export const DivContainer = styled.div<DivProps>`
    background-color: ${props => props.theme.secondary};

    *{
        color: ${props => props.theme.secondaryContrast};
        fill: ${props => props.theme.secondaryContrast};
    }

    ${props => props.$primary && css`
    background-color: ${props => props.theme.primary};
    *{
        color: ${props => props.theme.generalText};
        fill: ${props => props.theme.generalText};
    }
    li::before{
        background-color: ${props => props.theme.primaryContrast};
    }
`}

    `;
export const OptionsContainer = styled.ul<DivProps>`
    background-color: ${props => props.theme.secondary};

    *{
        color: ${props => props.theme.secondaryContrast};
        fill: ${props => props.theme.secondaryContrast};
    }

    ${props => props.$primary && css`
    background-color: ${props => props.theme.primary};
    *{
        color: ${props => props.theme.generalText};
        fill: ${props => props.theme.generalText};
    }
    li::before{
        background-color: ${props => props.theme.primaryContrast};
    }
`}

    `;
export const BodyConainer = styled.main`
    background-color: ${props => props.theme.primary};

    & *{
    color:${props => props.theme.generalText};
    }


    `;
    export const Input = styled.input<InputProps>`
    background-color: ${props => props.theme.primary};
    border: none;
    border-bottom: solid 2px  ${props => props.theme.secondary};
    border-radius: 0;
    transition:240ms;
    &:hover{
      border: none;
      border-bottom: solid 2px  ${props => props.theme.secondary};
    }
    
    &:focus{
      border: none;
      border-bottom: solid 4px  ${props => props.theme.primaryContrast};
    }
    
    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
    
    
    ${props => props.$notDisplay && css`
     display:none;
    
    ` }
    
    `;
    export const Select = styled.select`
    background-color: ${props => props.theme.primary};
    border: none;
    border-bottom: solid 2px  ${props => props.theme.secondary};
    border-radius: 0;
    transition:240ms;
    &:hover{
      border: none;
      border-bottom: solid 2px  ${props => props.theme.secondary};
    }
    
    &:focus{
      border: none;
      border-bottom: solid 2px  ${props => props.theme.primaryContrast};
    }
    `;
  
    export const Button = styled.button<DivProps>`
      padding: 10px 20px;
      font-size: 18px;
      font-weight: 600;
      background-color: ${props => props.theme.secondary};
      color: ${props => props.theme.secondaryContrast};
      border: none;
      border-radius: 5px;
      cursor: pointer;
      box-shadow: 0px 0px 5px 0px rgba(0,0,0,0.75);
      
      
      ${props => !props.$primary && css`
      background-color: transparent;
      color:  ${props => props.theme.primaryContrast};
      box-shadow: unset;
      box-shadow: inset 0 0 0 2px ${props => props.theme.primaryContrast};
    ` }
    
      &:hover:not(:disabled) {
        filter: brightness(120%);
      }
      &:disabled {
        opacity: 0.5;
        cursor: not-allowed;
      }
    `;