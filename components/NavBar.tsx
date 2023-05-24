import { useRouter } from "next/router";
import Link from "next/link";

const options = [
    {name:"Default", route:"/"},
    {name:"Home", route:"/home"},
  ]

export default function NavBar(){
    const router = useRouter()

    function isSelected(route:string){
        return router.asPath.split('/')[1] == route.split('/')[1];
    }

    return(
        <nav style={{backgroundColor:'#2986CC'}}>
            <span style={{fontSize:'24px', color:'white'}}>LOGO</span>
            <ul>
                {options.map(option => 
                    <Link key={ option.name} href={option.route} >
                        <li style={{fontSize:'20px', borderBottom: isSelected(option.route)?'solid 5px':'solid 5px transparent'}} >
                            {option.name}
                        </li>  
                    </Link>
                )}
            </ul>
        </nav>
    )
}