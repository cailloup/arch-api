
    /**/
export type Location = {
    address?: string; 
    position?:google.maps.LatLngLiteral;
}

const defaultCenter = {lat:-37.518117149999995, lng:-57.60741988408909}

export const selectCountyoptions= {
    mapTypeControl: true,
    streetViewControl: false,
    fullscreenControl: false,
    zoomControl: true,
    mapTypeId: 'roadmap',
    minZoom:8,
    zoom:8,
    styles: [{
        elementType: "labels",
        stylers: [{ visibility: "off" }]
    }],
    center: defaultCenter, 
    restriction: {
    latLngBounds: limitArea(defaultCenter,1200),
    strictBounds: true
    }
}
export const selectBuildingoptions = (bounds:any) => ({
    mapTypeControl: true,
    streetViewControl: false,
    fullscreenControl: false,
    zoomControl: true,
    mapTypeId: 'roadmap',
    minZoom:10,
    zoom:10,
    styles: [{
          featureType: "poi",
          elementType: "labels",
          stylers: [{ visibility: "off" }]
    }],
    center: defaultCenter, 
    restriction: {
    latLngBounds: bounds,
    strictBounds: false
    }
})




export function limitArea (position:{lat : number,lng:number},radioKm:number){
    const bounds = {
      north: position.lat + radioKm/2 * 0.0089,
      south: position.lat - radioKm/2 * 0.0089,
      east: position.lng + radioKm/2 * 0.0089,
      west: position.lng - radioKm/2 * 0.0089 
    }
    return bounds
}

export interface County {
    name: string;
    location: google.maps.LatLng;
    paths:any;
    bounds: {
        north: number,
        south: number,
        east: number,
        west: number,
    }
    center:google.maps.LatLng;
}

export function getCounty (selectedcounty:any,setCounty:any){
    const geocoder = new google.maps.Geocoder()
    const name = `Partido de ${selectedcounty.name}`
    geocoder.geocode({ address: name }, (results, status) => {
      if (status === 'OK' && results) {
        const location = results[0].geometry.location
        const bounds = results[0].geometry.bounds
        if(!bounds)
          return
        const county: County = {
          name: name,
          location: location,
          paths: selectedcounty.paths,
          bounds: {
            north: bounds.getNorthEast().lat(),
            south: bounds.getSouthWest().lat(),
            east: bounds.getNorthEast().lng(),
            west: bounds.getSouthWest().lng(),
          },
          center:bounds.getCenter()
        }
        
        setCounty(county)
      } else {
        console.error('Geocode was not successful for the following reason: ' + status);
      }
    })
}