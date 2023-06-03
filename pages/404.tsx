import { Container, ContainerColor } from "@/components/assets";

export default function Custom404() {
    return (
        <ContainerColor $color="secondary" style={ {height:'100%'}}>
        <div style={{fontStyle: 'oblique 23deg', height:'100%',display:'flex', justifyContent: 'center',alignItems: 'center'}}>
            <h1>  
                <i style={{fontSize:'50vh'}} className="icon-charly"/><br/>
                Ya ves que yo no te puedo dar,<br/>
                las cosas que quisiste dejar
            </h1>
        </div>
        </ContainerColor>)
  }