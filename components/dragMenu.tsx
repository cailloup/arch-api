import styles from "@/styles/dragMenu.module.sass"
import React, { useState,forwardRef, useImperativeHandle, Ref, ReactNode } from 'react';
import { Container,LeftBarLine,LeftBar } from "./assests";


interface DragMenuProps {
    defaultWidth: number;
    free?: boolean;
    children?: ReactNode;
    hidden?:boolean
  }
interface DragMenuHandle {
    setOpen: (value: boolean) => void;
    setHide: (value: boolean) => void;
  }

export const DragMenu = forwardRef<DragMenuHandle, DragMenuProps>(({defaultWidth,children,free,hidden},ref: Ref<DragMenuHandle>) => {
    const componentRef = React.useRef();
    const [close, setOpen] = useState(false);
    const [hide, setHide] = useState(hidden?hidden:false);
    
    function togleForm(){
        setOpen(!close);
    }

    useImperativeHandle(ref, () => ({
        setOpen,
        setHide,
    }));

    return (
        <Container  style={{width: `${defaultWidth}%`}} className={`${styles.menuContainer}  ${close?styles.close:''} ${hide?styles.hide:''} `} >
            <LeftBar  className={styles.leftBar}  onClick={togleForm}>
                <LeftBarLine className={styles.leftBarLine}/> 
            </LeftBar>
            {children}
        </Container>
    )
})