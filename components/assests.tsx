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

function changeRGBToRGBA(rgbColor:string,target:number): string{
    // Extraer los valores R, G y B del color RGB
    const matches = rgbColor.match(/\d+/g);
    if (!matches || matches.length !== 3) {
        throw new Error("Invalid RGB color format");
    }
    const [r, g, b] = matches.map((value) => parseInt(value, 10));

    // Construir el color RGBA con el valor de destino
    const rgbaColor = `rgba(${r}, ${g}, ${b}, ${target})`;
    return rgbaColor;
}

export const Container = styled.div`
  background-color: ${props => props.theme.primary};
`;

export const LeftBar = styled.div`
    background-color: ${props => props.theme.secondary};
`;

export const LeftBarLine = styled.div`
    background-color: ${props => props.theme.secondaryContrast};
`;

export const TableStyled = styled.table`
    thead tr th{
        background-color:  ${props => props.theme.secondary};
        color: ${props => props.theme.secondaryContrast};
    }

    tr:nth-child(even) {
        background-color:  ${props =>changeRGBToRGBA(props.theme.secondary,.5)} ; 
        filter: brightness(100%);
    }
    tr:nth-child(2n+1) {
        background-color: ${props =>changeRGBToRGBA(props.theme.secondary,.1)} ; 
    }
    tbody tr:hover{
        background-color: ${props => changeRGBToRGBA(props.theme.primaryContrast,.8)}; 
        transform: scale(1.01);
        filter: brightness(120%);
    }

    tbody .active{
        background-color: ${props => changeRGBToRGBA(props.theme.primaryContrast,1)}; 
        filter: brightness(120%);
        color:${props => props.theme.primary};
        transform: scale(1.02);
    }
    tbody .active td{
        color:${props => props.theme.primary};
    }
`;
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
    color-scheme: ${props => props.theme.primary == 'rgb(24, 24, 24)'?'dark':'none'};
    background-color: ${props => props.theme.primary};
    border: none;
    border-bottom: solid 2px  ${props => props.theme.secondary};
    border-radius: 0;
    transition:240ms;
    font-size:18px;
    padding: 4px 8px;
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
    background-color: transparent;
    border: none;
    font-size:18px;
    border-bottom: solid 2px  ${props => props.theme.secondary};
    border-radius: 0;
    transition:240ms;

    & option{
        background-color:${props => props.theme.primary};
    }

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
      
        i{
        font-size: 18px;
        color:${props => props.theme.secondaryContrast};
        }
      
        ${props => !props.$primary && css`
            background-color: transparent;
            color:  ${props => props.theme.primaryContrast};
            box-shadow: unset;
            box-shadow: inset 0 0 0 2px ${props => props.theme.primaryContrast};
            
            i{
                font-size: 18px;
                color:${props => props.theme.primaryContrast};
                }
         
        `}
    
        &:hover:not(:disabled) {
            filter: brightness(120%);
        }

        &:disabled {
            opacity: 0.5;
            cursor: not-allowed;
        }
    `;