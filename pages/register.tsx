import Head from 'next/head'
import { toast } from "react-toastify";
import Form from '@/components/form/form'
import { DragMenu, DragMenuHandle } from '@/components/dragMenu'
import { buildingStyles, buildingTypes} from '@/utils/utils'
import { ButtonComponent, InputComponent, InputDateComponent, InputFileComponent, SelectComponent } from '@/components/form/FormComponents'
import { useEffect, useRef, useState } from 'react'
import ArchytecstApi from '@/utils/builddingsApi';
import { GoogleMap } from '@react-google-maps/api';
import CountySelector from '@/components/gmaps/countySelector';
import { County,Location } from '@/components/gmaps/gMapFunctions';
import AddressSelector, { InputMap } from '@/components/gmaps/addressSelector';

const api = new ArchytecstApi()

export default function RegisterBuilding() {
  const screenRef = useRef<HTMLDivElement>(null);
  const [county,setCounty] = useState<County | null>(null);
  const [location,setLocation] = useState<Location >();
  const dragMenu = useRef<DragMenuHandle>(null);
  
  const handleSubmit = (data: any)=>{
    toast.promise(
      () => api.postBuilding(data),
      {
        pending: 'Subiendo edificio',
        success: 'Edificios subido correctamente 👌',
        error: 'Hubo un error al subir el edificio 🤯'
      }
    )
  }
  
  useEffect(() => {   //building selected
    if(county){
      dragMenu.current?.setHide(false)
    }else{
      dragMenu.current?.setHide(true)
    }
  }, [county]); 

  function onClick(location:Location ){
    setLocation(location)
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLocation({ ...location, address:event.target.value});
  };

  const handleMapChanges = (loc:any) => {
    console.log(loc)
    setLocation({...location,position:loc.position})
    const geocoder = new google.maps.Geocoder()
    if(!loc.address){
      geocoder.geocode({ location: loc.position }, (results, status) => {
        if (status === 'OK' && results) {
          const number = results[0].address_components[0].long_name
          const street = results[0].address_components[1].long_name
          const city = results[0].address_components[2].long_name
          const streetNCity =  ` ${street} ${number}, (${city})`
        } else {
          console.error('Geocode was not successful for the following reason: ' + status);
        }
      })
    }
  };

  return (
    <>
      <Head>
        <title>Registrar</title>
        <meta name="description" content="Registre edificios" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div ref={screenRef} style={{  width:'60%', height:'100%', position:'absolute'}}>
          <GoogleMap mapContainerStyle={{width: "100%", height: "100%"}}>
            {county==null?<CountySelector setCounty={setCounty}/>: <AddressSelector markerPosition={location?.position} selectedCounty={county} onClick={onClick} />}
          </GoogleMap>
        </div>
      <DragMenu ref={dragMenu} screenRef={screenRef} defaultWidth={50} hidden={true}>
          <Form onSubmit={handleSubmit} className="container p-80">
            <InputComponent id='city' label='Partido' placeHolder={['']} defaultValue={county?.name?county.name:''} readOnly />
            <ButtonComponent type='reset' onClick={()=> setCounty(null)} text='Cambiar'  />
            <InputMap
              onTextChange={handleMapChanges}
              bounds={county?.bounds}
            >
            <InputComponent required id='location' label='Direccion' value={location?.address} onChange={handleChange} placeHolder={['Ingrese direcion del edificio']}/>
            </InputMap>
            <InputComponent id='lat' label='latitud' placeHolder={['']} readOnly value={location?.position?.lat.toString()} invisible/>
            <InputComponent id='longitude' label='longitud' placeHolder={['']} readOnly value={location?.position?.lng.toString()} invisible/>
            <InputComponent required id='name' label='Nombre' placeHolder={['Ingrese nombre del edificio']}/>
            <InputComponent id='architect' label='Arquitecto' placeHolder={['Ingrese nombre del arquitecto','Ingrese apellido del arquitecto']}/>
            <InputComponent id='state' label='Estado' placeHolder={['Ingrese estado del edificio']}/>
            <InputComponent id='period' label='Epoca' placeHolder={['Ingrese época del edificio']}/>
            <InputFileComponent required id='image' label='Imagen edificio' textButton='Seleccionar imagen'/>
            <SelectComponent id='type' label='Tipo' options={buildingTypes} />
            <SelectComponent id='style' label='Estilo' options={buildingStyles} />
            <InputComponent id='isProtected' label='Proteccion' placeHolder={['Ingrese protección del edificio']}/>
            <InputDateComponent id='builtDate' label='Fecha de contruccion' min='12-02-1800' max={new Date().toISOString().split("T")[0]} defaultValue={new Date().toISOString().split("T")[0]}/>
            <ButtonComponent type='submit' onClick={()=> {}} primary right text='Registrar edificio'/>
          </Form>
      </DragMenu>
    </>
  )
}