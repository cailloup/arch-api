import { assests } from "./utils";

const apiUrl='https://bold-crow-384002.rj.r.appspot.com/api/v1/'

type BuildingType = "Vivienda" | "Religioso" | "Público" | "C. C. Municipal" | "Comercial" | "Educativo" | "Esparcimiento" | "Histórico" | "Hotelera" | "Municipal" | "Urbano" | "Otro" 

interface BuildingData {
    uuid: string;
    name: string;
    lat: string;
    longitude: string;
    location: string;
    image?: string | File;
    period: string;
    city: string;
    architect: string;
    type: BuildingType;
    state: string;
    style: string;
    isProtected: string;
    builtDate: string;
}
export class Building {
    uuid: string;
    name: string;
    location: { lat: number; lng: number };
    address: string;
    image: string;
    period: string;
    city: string;
    architect: string;
    type: BuildingType;
    state: string;
    style: string;
    isProtected: { state: boolean; info: string };
    refColor: string;
    builtDate: string;

    constructor(buildingData: BuildingData) {
        this.uuid = buildingData.uuid;
        this.name = buildingData.name;
        this.location = { lat: parseFloat(buildingData.lat), lng: parseFloat(buildingData.longitude) };
        this.address = buildingData.location;
        this.image = (typeof buildingData.image === 'string')? buildingData.image:'';
        this.period = buildingData.period;
        this.city = buildingData.city;
        this.architect = buildingData.architect;
        this.type = buildingData.type;
        this.state = buildingData.state;
        this.style = buildingData.style;
        this.isProtected = { state: buildingData.isProtected === "true", info: "-" };
        this.refColor = assignColor(this.type);
        this.builtDate = buildingData.builtDate;
    }

    setName(name: string): void {
        this.name = name;
    }

    setArchitect(architect: string): void {
        this.architect = architect;
    }

    setState(state: string): void {
        this.state = state;
    }
}

export default class ArchytecstApi {

    getBuildings():Promise<Building[]>{
        return  fetch(`${apiUrl}buildings`)
        .then(response => response.json())
        .then(data => {
            if(data?.error){
                throw data.error
            }
            return data.buildings.map( (buildingData: BuildingData) => new Building(buildingData) )
        })
        .catch(error => {throw error});
    }

    postBuilding(buildingData:BuildingData,image:File){

        return postImage(image)
                .then(url => {
                    const requestBody = JSON.stringify({...buildingData,image:url});
                    fetch(`${apiUrl}building`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: requestBody,
                    })
                    .then( response =>{
                        if(response.ok){
                            return response.json();
                        }else {
                            throw new Error('Ocurrió un error al enviar la solicitud.');
                        }
                    })
                    .then( data =>{
                        if(data.response == "Building added successfully."){
                            return  data.response;
                        }else{
                            throw data.response
                        }
                    })
                })
    }


    getBuildingsByCity(city:string): Promise<Building[]>{ 
        const requestBody = JSON.stringify( {city:city} );
        return fetch(`${apiUrl}buildings`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: requestBody
        })
        .then(response => response.json())
        .then (data => {
            if(data?.error){
                throw data.error
            }
            return data.buildings.map( (buildingData:BuildingData) => new Building(buildingData) )
        })
        .catch(error => {
            console.log(error);
            throw error
        })
    }

    deleteBuilding(uuid:string) {
        return fetch(`${apiUrl}buildings/${uuid}`, {
            method: 'DELETE'
            })
            .then((response) => {
            if (response?.ok) {
                return response;
            } else {
                throw new Error('Ocurrió un error al enviar la solicitud.');
            }
            })
            .catch(error => {
            throw error;
            });
    }

    putBulding(building:BuildingData, uuid: string,imageUrl:string){
        if (building.image instanceof File)
            return postImage(building.image).
                then( imageUrl => 
                    {
                        building.image=imageUrl

                        const requestBody = JSON.stringify(building);

                        return fetch(`${apiUrl}buildings/${uuid}`, {
                                method: 'PUT',
                                headers: {
                                    'Content-Type': 'application/json'
                                },
                                body: requestBody,
                            })
                            .then(response => response.json())
                            .then(data => data)
                            .catch(error => {
                            throw { success: false, error: error.message };
                            });     
                    })
        
        building.image = imageUrl;
        console.log(building);
        const requestBody = JSON.stringify(building);          
        return fetch(`${apiUrl}buildings/${uuid}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: requestBody,
            })
            .then(response => response.json())
            .then(data => data)
            .catch(error => {
            throw { success: false, error: error.message };
            }); 


        
    
        
    }
}

function postImage(image:File){

    const formData = new FormData();
    formData.append('image', image);

    return fetch(`${apiUrl}/images/upload`, {
        method: 'POST',
        body: formData,
      })
      .then(response => response.json())
      .then(data =>{ 
        if(data?.error){
            throw data.error
        }
        return data.imageUrl
        }).catch(error => {throw error });
}

export function assignColor(type:BuildingType):string{
    if (type === "Vivienda"){
        return assests.colors.orange
    }
    if (type === "Religioso"){
        return assests.colors.blue
    }
    if (type === "Público"){
        return assests.colors.red
    }
	if (type === "C. C. Municipal"){
        return assests.colors.green
    }
    if (type === "Comercial"){
        return assests.colors.purple
    }
    if (type === "Educativo"){
        return assests.colors.yellow
    }
    if (type === "Esparcimiento"){
        return assests.colors.pink
    }
    if (type === "Histórico"){
        return assests.colors.seagreen
    }
    if (type === "Hotelera"){
        return assests.colors.darkgreen
    }
	if (type === "Municipal"){
        return assests.colors.lightblue
    }
    if (type === "Urbano"){
        return assests.colors.beige
    }
    if (type === "Otro"){
        return assests.colors.lilac
    }
    return assests.colors.purple 
}
function generetaBuildingData(building:Building) {
    const { image, period, city, name, architect, type, uuid, location, style, state, builtDate, isProtected, address } = building;

    return {
        image,
        period,
        city,
        name,
        architect,
        type,
        uuid,
        longitude: location.lng.toString(),
        builtDate,
        isProtected: isProtected.state.toString(),
        location: address,
        style,
        state,
        lat: location.lat.toString()
    };
}