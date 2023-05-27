import { FormComponent } from "@/components/form";

const buildingTypes = ["C. C. Municipal","Comercial","Educativo","Esparcimiento","Histórico","Hotelera","Municipal","Público","Religioso","Urbano","Vivienda","Otro"]
const buildingStyles = ["Centro Europeo","Modernismo","Prefabricado","Tradicional","Otro"]

export const formRegisterFields: FormComponent[] = [
    {
        type: 'input',
        label: 'Partido',
        readonly: true,
    },
    {
        type: 'input',
        text: 'Direccion del edificio',
        label: 'Direccion'
    },
    {
        type: 'input',
        text: 'Nombre del edificio',
        label: 'Nombre'
    },
    {
        type: 'input',
        text: 'Nombre del arquitecto',
        label: 'Arquitecto'
    },
    {
        type: 'input',
        text: 'Estado del edificio',
        label: 'Estado'
    },
    {
        type: 'input',
        text: 'Epoca del edificio',
        label: 'Epoca'
    },
    {
        type: 'button',
        text: 'seleccionar  imagen',
        label: 'Imagen edificio',
        buttonFeed:'Imagen sin seleccionar',
        primary: false,
    },
    {
        type: 'select',
        label: 'Seleccione tipo de edificio',
        options: buildingTypes,
    },
    {
        type: 'select',
        label: 'Seleccione estilo del edificio',
        options: buildingStyles,
    },

  ]
  