import { Autocomplete, Marker, Polygon, useGoogleMap } from "@react-google-maps/api";
import { useEffect, useState } from "react";
import { County, selectBuildingoptions,Location } from "./gMapFunctions";

interface AddressSelectorProps {
    selectedCounty: County;
    onClick: (location:Location) =>void;
    markerPosition: google.maps.LatLngLiteral | undefined;
};

export default function AddressSelector({ ...props }: AddressSelectorProps) {
    const map = useGoogleMap()
    const [marKerPosition,setMarkerPosition] = useState<google.maps.LatLngLiteral | null | undefined>(null)

    useEffect(() => {
        map?.setOptions(selectBuildingoptions(props.selectedCounty.bounds))
    }, [map])

    const handleMapClick = (event: google.maps.MapMouseEvent) => {
        const position =  event.latLng?.toJSON(); 
        const geocoder = new google.maps.Geocoder()
        geocoder.geocode({ location: position }, (results, status) => {
            if (status === 'OK' && results) {
                const number = results[0].address_components[0].long_name;
                const street = results[0].address_components[1].long_name;
                const city = results[0].address_components[2].long_name;
                const streetNCity =  ` ${street} ${number}, (${city})`;
                setMarkerPosition(position)
                props.onClick({ address:streetNCity, position:position })
            } else {
                console.error('Geocode was not successful for the following reason: ' + status);
            }
        })
    }

    useEffect( ()=>{
       if(props.markerPosition){
            setMarkerPosition(props.markerPosition)
       }

    },[props.markerPosition] )


    return (
        <>
        <Polygon
            onClick={handleMapClick}
            path ={props.selectedCounty.paths}
            options={{
                strokeColor: 'black',
                strokeOpacity: 1,
                strokeWeight: 2,
                fillColor: "transparent",
                fillOpacity: 0,
        }}/>
        {marKerPosition && <Marker position={marKerPosition} />}
        </>  
        
        )
}

export function InputMap({onTextChange,children,bounds}){
    const [autocomplete, setAutocomplete] = useState(null);
  
    return(
      <Autocomplete
                  bounds={!bounds ? undefined : bounds}
                  
                  onLoad={(auto) =>  setAutocomplete(auto)}
                  onPlaceChanged={() => {
                    const place = autocomplete.getPlace();
                    if (place.geometry) {
                      const newPosition = {
                        lat: place.geometry.location.lat(),
                        lng: place.geometry.location.lng(),
                      };
                      const location = { position: newPosition, address: place.formatted_address };
                      onTextChange(location);
                    } else {
                      console.error('No se ha encontrado la dirección seleccionada');
                    }
                  }}
                  options={!bounds? undefined:{strictBounds: true}}  
                  
            >
            {children}
              
      </Autocomplete>
    )
  }