import { BuildingType } from "./builddingsApi"

export const utils = {
    paths:{
        closeButton:"M443.6,387.1L312.4,255.4l131.5-130c5.4-5.4,5.4-14.2,0-19.6l-37.4-37.6c-2.6-2.6-6.1-4-9.8-4c-3.7,0-7.2,1.5-9.8,4  L256,197.8L124.9,68.3c-2.6-2.6-6.1-4-9.8-4c-3.7,0-7.2,1.5-9.8,4L68,105.9c-5.4,5.4-5.4,14.2,0,19.6l131.5,130L68.4,387.1  c-2.6,2.6-4.1,6.1-4.1,9.8c0,3.7,1.4,7.2,4.1,9.8l37.4,37.6c2.7,2.7,6.2,4.1,9.8,4.1c3.5,0,7.1-1.3,9.8-4.1L256,313.1l130.7,131.1  c2.7,2.7,6.2,4.1,9.8,4.1c3.5,0,7.1-1.3,9.8-4.1l37.4-37.6c2.6-2.6,4.1-6.1,4.1-9.8C447.7,393.2,446.2,389.7,443.6,387.1z",
        haburgerButton:"M4,10h24c1.104,0,2-0.896,2-2s-0.896-2-2-2H4C2.896,6,2,6.896,2,8S2.896,10,4,10z M28,14H4c-1.104,0-2,0.896-2,2  s0.896,2,2,2h24c1.104,0,2-0.896,2-2S29.104,14,28,14z M28,22H4c-1.104,0-2,0.896-2,2s0.896,2,2,2h24c1.104,0,2-0.896,2-2  S29.104,22,28,22z",
    }
}
type Assests = {
        audios: {
            vela: string;
        };
        colors: {
            red: string;
            green: string;
            blue: string;
            purple: string;
            yellow: string;
            orange: string;
            pink: string;
            seagreen: string;
            darkgreen: string;
            lightblue: string;
            beige: string;
            lilac: string;
        };
        buildingTypes: BuildingType[];
        icons: {
            mapPoint:(color: string) => {
                path: string;
                fillColor: string;
                fillOpacity: number;
                strokeWeight: number;
                rotation: number;
                scale: number;
                anchor: google.maps.Point;
            }
        };
    
}
export const assests = {
    audios: {
                vela: "/fragment.mp3",
            },
    colors: {
        red: "#FF6347",
        green: "#00FF7F",
        blue: "#4169E1",
        purple: "#8A2BE2",
        yellow: "#FFD700",
        orange: "#FF8C00",
        pink: "#FF69B4",
        seagreen: "#2E8B57",
        darkgreen: "#006400",
        lightblue: "#ADD8E6",
        beige: "#F5F5DC",
        lilac: "#C8A2C8"
    },
    buildingTypes:["C. C. Municipal","Comercial","Educativo","Esparcimiento","Histórico","Hotelera","Municipal","Público","Religioso","Urbano","Vivienda","Otro"],
    icons:{
        mapPoint: (color : string) => {
            return {
                path: "M-1.547 0q2.906 0 4.945 2.039t2.039 4.945q0 1.453-0.727 3.328t-1.758 3.516-2.039 3.070-1.711 2.273l-0.75 0.797q-0.281-0.328-0.75-0.867t-1.688-2.156-2.133-3.141-1.664-3.445-0.75-3.375q0-2.906 2.039-4.945t4.945-2.039z",
                fillColor: color ,
                fillOpacity: 0.85,
                strokeWeight: 0,
                rotation: 0,
                scale: 2,
                anchor: new google.maps.Point(0, 20),
            }},
        circlePoint: (color : string) => {
            return {
                path: "M10,0A10,10,0,1,0,10,20A10,10,0,1,0,10,0",
                fillColor: color ,
                fillOpacity: 1,
                strokeWeight: 0,
                rotation: 0,
                scale: 1,
                anchor: new google.maps.Point(0, 20),
            }},

    }
}

export const buildingTypes:BuildingType[] = ["C. C. Municipal","Comercial","Educativo","Esparcimiento","Histórico","Hotelera","Municipal","Público","Religioso","Urbano","Vivienda","Otro"]
export const buildingStyles = ["Centro Europeo","Modernismo","Prefabricado","Tradicional","Otro"]

