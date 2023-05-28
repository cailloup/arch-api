import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

import { Nav,DivContainer,OptionsContainer } from "@/components/assets";
import { utils } from "@/utils/utils";

import styles from '@/styles/NavBar.module.sass'

const options = [
    {name:"Mapa", route:"/"},
    {name:"Registrar edificio", route:"/register"},
    {name:"Panel", route:"/dashboard"},
    {name:"Temas", route:"/themes"},
];

export default function NavBar(){
    const router = useRouter()
    const [showMenu, setShowMenu] = useState(false);

    const isSelected = (route:string) => {
        return router.asPath.split('/')[1] == route.split('/')[1] ? `${styles.activeOption} active` : '';
    }

    return(
        <Nav $primary={false}>
            <DivContainer className={styles.navBody}>
                <Link href={'/'}>
                    <span className={styles.logo}>Arch-Soft</span>
                </Link>
                <svg onClick={() => setShowMenu(true)} height="32px" viewBox="0 0 32 32" width="32px" className={`${styles.button} ${showMenu ? styles.hide : ''}`} >
                    <path d={utils.paths.haburgerButton}/>
                </svg>
                <svg onClick={() => setShowMenu(false)} height="32px" viewBox="0 0 512 512" width="32px" className={`${styles.button} ${showMenu ? '' : styles.hide}`}>
                    <path d={utils.paths.closeButton}/>
                </svg>
            </DivContainer>
            <OptionsContainer className={`${styles.menu} ${showMenu ? styles.decompress : ''}`}>
                {options.map(option => 
                    <Link key={option.name} href={option.route} className={`${styles.align}  `}>
                        <li onClick={() => setShowMenu(false)} className={`${styles.option} option ${isSelected(option.route)}`}>
                            {option.name}
                        </li>  
                    </Link>
                )}
            </OptionsContainer>
            <div onClick={() => setShowMenu(false)} className= {`${styles.filter} ${showMenu?styles.visible:styles.invisible }` }>
            </div>
        </Nav>
    )
}