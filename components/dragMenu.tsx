import styles from "@/styles/dragMenu.module.sass"
import React, { useState,forwardRef, useImperativeHandle, Ref, ReactNode, useEffect } from 'react';
import { Container,LeftBarLine,LeftBar } from "./assets";

interface DragMenuProps {
    defaultWidth: number;
    free?: boolean;
    children?: ReactNode;
    hidden?:boolean
    screenRef: React.MutableRefObject<HTMLDivElement | null>;
  }
interface DragMenuHandle {
    setClose: (value: boolean) => void;
    setHide: (value: boolean) => void;
  }

export const DragMenu = forwardRef<DragMenuHandle, DragMenuProps>(({defaultWidth,children,free,hidden,screenRef},ref: Ref<DragMenuHandle>) => {
    const componentRef = React.useRef();
    const [close, setClose] = useState(true);
    const [hide, setHide] = useState(hidden?hidden:false);
    const [windowWidth, setWindowWidth] = useState<number | undefined>();

    function togleForm(){
        setClose(!close);
    }
    const handleResize = () => {
        setWindowWidth(window.innerWidth);
      };
      
    useEffect(()=>{
        setWindowWidth(window.innerWidth)
        window.addEventListener("resize", handleResize);
        // Limpia el listener cuando el componente se desmonta
        return () => {
         window.removeEventListener("resize", handleResize);
        };
    },[])

    useEffect(()=>{
        const divElement = screenRef.current;
        if(!divElement || !windowWidth)
        return
        if(windowWidth<768){
            divElement.style.width='100%'
        }else{
            divElement.style.width= `${100 - defaultWidth}%`
        }
    },[windowWidth])
    
    useImperativeHandle(ref, () => ({
        setClose,
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