import { FormComponent } from "@/components/form";

export const formRegisterFields: FormComponent[] = [
    {
      type: 'input',
      text: 'Nombre del arquitecto',
      label: 'Arquitecto'
    },
    {
      type: 'button',
      text: 'seleccionar imagen',
      label: 'Imagen edificio',
      buttonFeed:'Imagen sin seleccionar',
      primary: false,
    },
    {
      type: 'select',
      label: 'Seleccione tipo de edificio',
      options: ['palindromo','azucarado']
    },
  ]
  