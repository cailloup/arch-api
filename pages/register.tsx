import Head from 'next/head'
import { toast } from "react-toastify";

import Form from '@/components/form/form'
import { DragMenu } from '@/components/dragMenu'
import { buildingStyles, buildingTypes} from '@/utils/utils'
import { ButtonComponent, InputComponent, InputDateComponent, InputFileComponent, SelectComponent } from '@/components/form/FormComponents'
import { useRef } from 'react'
import ArchytecstApi from '@/utils/builddingsApi';

const api = new ArchytecstApi()
export default function RegisterBuilding() {
  const screenRef = useRef<HTMLDivElement>(null);
  
  const handleSubmit = (data: any)=>{
    toast.promise(
      () => api.postBuilding(data),
      {
        pending: 'Obteniendo edificios',
        success: 'Edificios cargados correctamente 👌',
        error: 'Hubo un error al cargar los edificios 🤯'
      }
    )
  }

  return (
    <>
      <Head>
        <title>Registrar</title>
        <meta name="description" content="Registre edificios" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div ref={screenRef}>
      </div>
      <DragMenu screenRef={screenRef} defaultWidth={50}>
          <Form onSubmit={handleSubmit} className="container p-80">
            <InputComponent id='city' label='Partido' placeHolder={['']} defaultValue='Villa Gesell' readOnly />
            <ButtonComponent type='button' onClick={()=> {console.log('hola')}} text='Cambiar'  />
            <InputComponent id='location' label='Direccion' placeHolder={['Ingrese direcion del edificio']}/>
            <InputComponent id='lat' label='latitud' placeHolder={['']} readOnly value='17' invisible/>
            <InputComponent id='longitude' label='longitud' placeHolder={['']} readOnly value='14' invisible/>
            <InputComponent id='name' label='Nombre' placeHolder={['Ingrese nombre del edificio']}/>
            <InputComponent id='architect' label='Arquitecto' placeHolder={['Ingrese nombre del arquitecto','Ingrese apellido del arquitecto']}/>
            <InputComponent id='state' label='Estado' placeHolder={['Ingrese estado del edificio']}/>
            <InputComponent id='period' label='Epoca' placeHolder={['Ingrese epoca de edificio']}/>
            <InputFileComponent id='image' label='Imagen edificio' textButton='Seleccionar imagen'/>
            <SelectComponent id='type' label='Tipo' options={buildingTypes} />
            <SelectComponent id='style' label='Estilo' options={buildingStyles} />
            <InputComponent id='isProtected' label='Proteccion' placeHolder={['Ingrese proteccion del edificio']}/>
            <InputDateComponent id='builtDate' label='Fecha de contruccion' min='12-02-1800' max={new Date().toISOString().split("T")[0]} defaultValue={new Date().toISOString().split("T")[0]}/>
            <ButtonComponent type='submit' onClick={()=> {}} primary right text='Registrar edificio'/>
          </Form>
      </DragMenu>
    </>
  )
}