import { counties } from "@/data/counties";
import { Marker, Polygon, useGoogleMap } from "@react-google-maps/api";
import { useEffect } from "react";
import { selectCountyoptions, getCounty } from "./gMapFunctions";

interface CountySelectorProps {
    setCounty: (countie:any) => void;
};

export default function CountySelector({ ...props }: CountySelectorProps) {
    const map = useGoogleMap()

    useEffect(() => {
        
        if (map) {
            map.setOptions(selectCountyoptions)
            map.setZoom(8)
        }
    }, [map])

    return (
        <>
            { counties.map((countie) => 
                    <Marker
                        onClick={() =>getCounty(countie,props.setCounty)  }
                        key={countie.name}
                        position={countie.center}
                        label={{
                        text: countie.name,
                        fontSize: '24px',
                        color:"black"
                        }}
                        icon= {{
                        path: google.maps.SymbolPath.CIRCLE,
                        scale: 0}
                        }
                    > 
                        <Polygon
                            path ={countie.paths}
                            onClick={() => getCounty(countie,props.setCounty)}
                            options={{
                            strokeColor: 'black',
                            strokeOpacity: 1,
                            strokeWeight: 2,
                            fillColor: countie.color,
                            fillOpacity: 0.58,
                            }}
                        /> 
                    </Marker>
                )
            }
        </>
        )
}