import themes, { MyTheme } from "@/styles/themes";
import { Marker, Polygon, StreetViewPanorama, useGoogleMap } from "@react-google-maps/api";
import { useCallback, useEffect, useState } from "react";
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
    buildings: Building[] | undefined | null;
    setFilteredTypes: (types: string[]) => void
};

export function BuildingSelector({ ...props }: BuildingSelectorProps) {
    const map = useGoogleMap()
    const api = new ArchytecstApi()
    const [filteredTypes,setFilteredTypes] = useState(assests.buildingTypes);
    const theme = useTheme();
    const [allTypes,setTypes] = useState<string[]>([])

    useEffect(() => {
        map?.setOptions(selectBuildingoptions(props.selectedCounty.bounds))
        toast.promise(
            api.getBuildingsByCity(props.selectedCounty.name)
            .then( buildings => { props.setBuildings(buildings); setTypes(buildings.map(({type}) => type))} ),
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

    function  getQuantityTypes(buildingType:BuildingType){
      let count = 0;
      allTypes.forEach((type) => {if( type==buildingType){count++}})
      return count
    }
    function toggleType(type:string){
      const index = filteredTypes.indexOf(type);
      if (index !== -1) {
        // El tipo ya está presente, lo eliminamos
        const updatedTypes = [...filteredTypes];
        updatedTypes.splice(index, 1);
        setFilteredTypes(updatedTypes);
        props.setFilteredTypes(updatedTypes);
      } else {
        // El tipo no está presente, lo insertamos
        setFilteredTypes([...filteredTypes, type]);
        props.setFilteredTypes([...filteredTypes, type]);
      }
    };

    const handleBuildingSelect = useCallback((building:Building) => {
      props.setBuilding(building);
  }, [props.setBuilding]);

  function onBackClik(){
    if(props.building){
      props.setBuilding(null);
    }else{
      props.scapeDown()
    }
  }

    return (
        <>
        <div className='button-back'>
        <Button $primary onClick={onBackClik}> Volver </Button>
            
        </div>
           
            {props.building && <StreetViewPanorama options={{position:props.building.location , visible:true, enableCloseButton:false,addressControl:false  } } />}
            {props.buildings && props.buildings.map( building => (
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
                    }}/>
        </>)
}

