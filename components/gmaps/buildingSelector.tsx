import { Marker, Polygon, useGoogleMap } from "@react-google-maps/api";
import { useEffect, useState } from "react";
import { County, selectBuildingoptions } from "./gMapFunctions";
import ArchytecstApi, { Building } from "@/utils/builddingsApi";
import { assests } from "@/utils/utils";
import { toast } from "react-toastify";

interface BuildingSelectorProps {
    setBuilding: (building:any) => void;
    selectedCounty: County;
};

export function BuildingSelector({ ...props }: BuildingSelectorProps) {
    const map = useGoogleMap()
    const [buildings,setBuildings] = useState<Building[]>()
    const api = new ArchytecstApi()

    useEffect(() => {
        
       
        map?.setOptions(selectBuildingoptions(props.selectedCounty.bounds))
        console.log('zoom');
        

        toast.promise(
            api.getBuildingsByCity(props.selectedCounty.name)
            .then( buildings => setBuildings(buildings) ),
            {
              pending: 'Buscando edificios en la zona',
              success: 'Edificios encontrados correctamente 👌',
              error: 'Hubo un error al obtener los edificios 🤯'
            }
        )

    }, [map])

    function handleBuildingSelect(building:Building){
        props.setBuilding(building);
        map?.setZoom(17)
        map?.panTo(building.location)
    }

    return (
        <>

            {buildings &&buildings.map( (building) => (
                  <Marker
                    icon={assests.icons.mapPoint( building.refColor )}
                    key={building.uuid}
                    label={{
                        text: building.name,
                        fontSize: '18px',
                        color:"white",
                        className:"markerLabel"
                    }}
                    position={building.location}
                    onClick={() =>handleBuildingSelect(building)}
                  />
            ) )}

            <Polygon
                path ={props.selectedCounty.paths}
                options={{
                  strokeColor: 'black',
                  strokeOpacity: 1,
                  strokeWeight: 2,
                  fillColor: "transparent",
                  fillOpacity: 0,
                }}
            />
        </>)
}