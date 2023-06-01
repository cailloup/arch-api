import themes, { MyTheme } from "@/styles/themes";
import { Marker, Polygon, StreetViewPanorama, useGoogleMap } from "@react-google-maps/api";
import { useEffect, useState } from "react";
import { County, selectBuildingoptions } from "./gMapFunctions";
import ArchytecstApi, { Building, BuildingType, assignColor } from "@/utils/builddingsApi";
import { assests, buildingTypes } from "@/utils/utils";
import { toast } from "react-toastify";
import { Button } from "../assets";
import { useTheme } from 'styled-components';

interface BuildingSelectorProps {
    setBuilding: (building:any) => void;
    selectedCounty: County;
    scapeDown: ()=> void;
    setBuildings: (buildings: Building[]) => void;
    building: Building | null;
    buildings: Building[] | null;
    filterBuildings: any;
};

export function BuildingSelector({ ...props }: BuildingSelectorProps) {
    const map = useGoogleMap()
    const api = new ArchytecstApi()
    const [streetView, setStreetView] = useState(false)
    const theme = useTheme();
    
    useEffect(() => {
        map?.setOptions(selectBuildingoptions(props.selectedCounty.bounds))
        toast.promise(
            api.getBuildingsByCity(props.selectedCounty.name)
            .then( buildings => props.setBuildings(buildings) ),
            {
              pending: 'Buscando edificios en la zona ',
              success: 'Edificios encontrados correctamente 👌',
              error: 'Hubo un error al obtener los edificios 🤯'
            }
        )

    }, [map])

    useEffect(() => {   //Scape capture
        function handleEscapeKeyPress(event: { key: string; }) {
          if (event.key === 'Escape') {
            props.scapeDown()
            props.setBuilding(null);
          }
        }
        
        document.addEventListener('keydown', handleEscapeKeyPress);
        
        return () => {
          document.removeEventListener('keydown', handleEscapeKeyPress);
        };
    }, []); 

    useEffect(() => {  
        if(props.building){
            map?.setZoom(19)
            map?.panTo(props.building.location)
        }
    }, [props.building]); 

    function handleBuildingSelect(building:Building){
        props.setBuilding(building);
    }

    return (
        <>
        <div className='button-back'>
        <Button $primary onClick={()=> {  streetView?setStreetView(!streetView):props.scapeDown()}} > Volver </Button>
            
        {props.building && !streetView && <Button style={{marginLeft:'15px'}} $primary onClick={() => setStreetView(!streetView) }> StreetView </Button>}
        </div>
           
            { props.building && <StreetViewPanorama options={{position:props.building.location , visible:streetView, enableCloseButton:false,addressControl:false  } } />}
            {props.buildings &&props.filterBuildings(props.buildings.map( b => ({object:b}) )).map( ({object}:{ object: Building }) => (
                  <Marker
                    icon={assests.icons.mapPoint( object.refColor )}
                    key={object.uuid}
                    label={{
                        text: object.name,
                        fontSize: '18px',
                        color:"white",
                        className:"markerLabel"
                    }}
                    position={object.location}
                    onClick={() =>handleBuildingSelect(object)}
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
                    }}/>
        </>)
}