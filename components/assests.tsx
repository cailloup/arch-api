import styled, { css } from "styled-components";

interface NavProps extends React.HTMLAttributes<HTMLElement> {
    $primary?: boolean;
}
interface DivProps extends React.HTMLAttributes<HTMLElement> {
    $primary?: boolean;
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