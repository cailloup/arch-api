import { FormComponent } from "@/components/form";

export const formRegisterFields: FormComponent[] = [
    {
      type: 'input',
      text: 'Nombre del arquitecto',
      label: 'Arquitecto'
    },
    {
      type: 'button',
      text: 'Seleccionar imagen',
      label: 'Seleccione una imagen',
      primary: false,
    },
    {
      type: 'select',
      label: 'Seleccione tipo de edificio',
      options: ['palindromo','azucarado']
    },
  ]
  