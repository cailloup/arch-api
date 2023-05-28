import { FormComponent } from "@/components/form";

const buildingTypes = ["C. C. Municipal","Comercial","Educativo","Esparcimiento","Histórico","Hotelera","Municipal","Público","Religioso","Urbano","Vivienda","Otro"]
const buildingStyles = ["Centro Europeo","Modernismo","Prefabricado","Tradicional","Otro"]

export const formRegisterFields: FormComponent[] = [
    {
        id:'county',
        type: 'input&Button',
        label: 'Partido',
        readonly: true,
        value: 'Partido de villa Gesell',
        textButton:'cambiar',
    },
    {
        id:'address',
        type: 'input',
        text: ['calle'],
        label: 'Direccion'
    },
    {
        id:'name',
        type: 'input',
        text: ['Nombre del edificio'],
        label: 'Nombre'
    },
    {
        id:'architect',
        type: 'input',
        text: ['Nombre','Apellido'],
        label: 'Arquitecto'
    },
    {
        id:'state',
        type: 'input',
        text: ['Estado del edificio'],
        label: 'Estado'
    },
    {
        id:'period',
        type: 'input',
        text: ['Epoca del edificio'],
        label: 'Epoca'
    },
    {
        id:'image',
        type: 'inputFile',
        text: ['seleccionar  imagen'],
        label: 'Imagen edificio',
        textButton: 'Seleccionar imagen',
        primary: false,
    },
    {
        id:'type',
        type: 'select',
        label: 'Seleccione tipo de edificio',
        options: buildingTypes,
    },
    {
        id:'style',
        type: 'select',
        label: 'Seleccione estilo del edificio',
        options: buildingStyles,
    },
    {
        id:'protected',
        type: 'input',
        text: ['Estado de proteccion'],
        label: 'Proteccion',
        optional: true,
    },
    {
        id:'builtDate',
        type: 'inputDate',
        text: ['Fecha de construccion'],
        label: 'Fecha de construccion',
    },

  ]
  