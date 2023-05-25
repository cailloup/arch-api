import { useRouter } from "next/router";
import Link from "next/link";
import styles from '@/styles/NavBar.module.sass'
import { utils } from "@/utils/utils";
import { Nav,DivContainer,OptionsContainer } from "./assests";
import { useMemo, useState } from "react";



export default function NavBar(){
    const router = useRouter()
    const [showMenu,setShowMenu] = useState(`${styles.compress}`)
    const options = useMemo(() => [
        {name:"Mapa", route:"/"},
        {name:"Registrar edificio", route:"/register"},
        {name:"Panel", route:"/dashboard"},
        {name:"Temas", route:"/themes"},
    ], []);
    
    function isSelected(route:string){
        return router.asPath.split('/')[1] == route.split('/')[1]?styles.selected:'';
    }

    return(
        <Nav  $primary={false}>
            <DivContainer className={styles.navBody}>
                <Link  href={'/'}><span className={styles.logo}>Arch-Soft</span></Link>
                <svg onClick={() => setShowMenu(styles.decompress) } height="32px" viewBox="0 0 32 32" width="32px" className={`${styles.button} ${`${styles.compress}`!=showMenu?styles.hide:''}`} >
                        <path d={utils.paths.haburgerButton}/>
                </svg>
                <svg onClick={() => setShowMenu(`${styles.compress}`) } height="32px" viewBox="0 0 512 512" width="32px" className={`${styles.button} ${`${styles.compress}`==showMenu?styles.hide:''}`} >
                    <path d={utils.paths.closeButton}/>
                </svg>
            </DivContainer>
            <OptionsContainer className={`${styles.menu} ${showMenu}`}>
                {options.map(option => 
                    <Link key={ option.name} href={option.route} className={`${styles.align}  `}>
                        <li className={`${styles.option} ${isSelected(option.route)}`}>
                            {option.name}
                        </li>  
                    </Link>
                )}
            </OptionsContainer>
        </Nav>
    )
}