import { ButtonComponent, Component, InputComponent, InputDateComponent, InputFileComponent, SelectComponent } from "@/components/FormComponents"

const buildingTypes = ["C. C. Municipal","Comercial","Educativo","Esparcimiento","Histórico","Hotelera","Municipal","Público","Religioso","Urbano","Vivienda","Otro"]
const buildingStyles = ["Centro Europeo","Modernismo","Prefabricado","Tradicional","Otro"]

 export const formRegisterFields: Component[] = [
        new InputComponent({id:'city',label:'Partido',readOnly:true,value:'Partido de villa gesell',placeHolder:['']}),
        new ButtonComponent({id:'cambiar',onClick:()=>{},text:'Cambiar'}),
        new InputComponent({id:'address',label:'Direccion',placeHolder:['Ingrese direcion del edificio']}),
        new InputComponent({id:'name',label:'Nombre',placeHolder:['Ingrese nombre del edificio'],required:true}),
        new InputComponent({id:'archytect',label:'Arquitecto',placeHolder:['Ingrese nombre del arquitecto','Ingrese apellido del arquitecto'] }),
        new InputComponent({id:'state',label:'Estado',placeHolder:['Ingrese estado del edificio']}),
        new InputComponent({id:'period',label:'Epoca',placeHolder:['Ingrese epoca de edificio']}),
        new InputFileComponent({id:'image',label:'Imagen edificio',textButton:'Seleccionar imagen'}),
        new SelectComponent({id:'type',label:'Tipo',options:buildingTypes}),
        new SelectComponent({id:'style',label:'Estilo',options:buildingStyles}),
        new InputComponent({id:'protected',label:'Proteccion',placeHolder:['Ingrese proteccion del edificio']}),
        new InputDateComponent({id:'date',label:'Fecha de contruccion',min:'12-02-1800',max:new Date().toISOString().split("T")[0], defaultValue:new Date().toISOString().split("T")[0] }),
    ]
 
 