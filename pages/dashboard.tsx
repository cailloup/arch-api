import Head from 'next/head'
import Table from '@/components/table'
import { Button, Input } from '@/components/assests';
import { useState,useEffect,useMemo } from 'react';

import ArchytecstApi, { Building } from '@/utils/builddingsApi';

const api = new ArchytecstApi()


const algo = [
  {"image":"","name":"CASA CARLOS IDAHO GESELL","type":"VIVIENDA","location":"Circunscripci�n: 6 Secci�n: A Fracci�n: 2 Parcela: 1D","city":"Partido de Villa Gesell","builtDate":"12/14/1931","architect":"Carlos Idaho Gesell","isProtected":"Ord. MUNICIPAL �...? Bien de inter�s hist�rico NACIONAL Decreto 784/2013","period":"Fundacional-contempor�nea","style":"tradicional","state":"BUENO"}
  ,
  {"image":"","name":"LA GOLONDRINA","type":"VIVIENDA","location":"Alameda 201 casi Calle 306","city":"Partido de Villa Gesell","builtDate":"... 1941","architect":"Prefabricada comprada en Mar del Plata","isProtected":"�?","period":"fundacional- contempor�nea","style":"Prefabricada","state":"Desarmada"}
  ,
  {"image":"","name":"HOTEL PLAYA","type":"HOTELERIA","location":"Alameda 205 entre calles 303 y 304. Circunscripci�n: 6 Secci�n: A Manzana: 3 Parcela: 1A","city":"Partido de Villa Gesell","builtDate":"1942","architect":"Gotthold Gussmann","isProtected":"No","period":"Fundacional-contempor�nea","style":"centro europeo","state":"BUENO"}
  ,
  {"image":"","name":"CASA STARK","type":"VIVIENDA","location":"Calle 305 e/ 201 y 204 Circunscripci�n: 6 Secci�n: A Manzana: 5B Parcela: 6","city":"Partido de Villa Gesell","builtDate":"1943","architect":"�?","isProtected":"No","period":"fundacional","style":"centro europeo","state":"malo?"}
  ,
  {"image":"","name":"CASA MADRE o ROLA DE Rodolfo Gualterio Schmidt","type":"VIVIENDA","location":"Calle 304 e/ 201 y 204. Circunscripci�n: 6 Secci�n: A Manzana: 5B Parcela: 2P","city":"Partido de Villa Gesell","builtDate":"1944","architect":"L�mpel. Heinrich","isProtected":"Ord. Mun. 1291/94","period":"fundacional-contempor�nea","style":"centro europeo","state":"BUENA . 1ra casa construida en mamposter�a en gesell"}
  ,
  {"image":"","name":"CASA HAIBLE","type":"VIVIENDA","location":"Avenida 2 e/ 105 y 107. Circunscripci�n: 6 Secci�n: A Manzana: 26 Parcela: 1C","city":"Partido de Villa Gesell","builtDate":"1945","architect":"�?","isProtected":"No","period":"fundacional","style":"centro europeo","state":"BUENO"}
  ,
  {"image":"","name":"Casa \"La Catedral\" de Rodolfo Gualterio Schmidt","type":"VIVIENDA","location":"Alameda 205 y Calle 304. Circunscripci�n: 6 Secci�n: A Manzana: 5A Parcela: 1","city":"Partido de Villa Gesell","builtDate":"1945","architect":"�?","isProtected":"No","period":"\"","style":"\"","state":"BUENO"}
  ,
  {"image":"","name":"CASA VICUN Hosteria SAJONIA","type":"HOTELERA","location":"Alameda 201 e/ Av. Buenos Aires y Calle 301. Circunscripci�n: 6 Secci�n: A Manzana: 9A Parcela: 7","city":"Partido de Villa Gesell","builtDate":"1946","architect":"�?","isProtected":"No","period":"\"","style":"\"","state":"BUENO"}
  ,
  {"image":"","name":"CASA NIKULKA","type":"VIVIENDA","location":"Av. 7 e/ Av. Bs As y Paseo101. Circunscripci�n: 6 Secci�n: A Manzana: 33 Parcela: 9","city":"Partido de Villa Gesell","builtDate":"1947","architect":"�?","isProtected":"No","period":"\"","style":"\"","state":"MALO"}
  ,
  {"image":"","name":"CASA E. WALDOW","type":"VIVIENDA","location":"Paseo 101 e/ Av. 8 y 10. Circunscripci�n: 6 Secci�n: A Manzana: 32 Parcela: 8","city":"Partido de Villa Gesell","builtDate":"1947","architect":"�?","isProtected":"No","period":"�?","style":"�?","state":"MUY BUENO"}
  ,
  {"image":"","name":"CASA P�RINGER","type":"VIVIENDA","location":"Avenida 2 e/ Paseos 105 y 107 Circunscripci�n: 6 Secci�n: A Manzana: 26 Parcela: 13 y 14","city":"Partido de Villa Gesell","builtDate":"1948","architect":"�?","isProtected":"Ord. Mun. 1909/03","period":"�?","style":"�?","state":"MUY BUENO"}
  ,
  {"image":"","name":"","type":"VIVIENDA","location":"Av. 10 e/ Av. Bs As y Paseo 101. Circunscripci�n: 6 Secci�n: A Manzana: 32 Parcela: 1D","city":"Partido de Villa Gesell","builtDate":"�?","architect":"�?","isProtected":"Ord. Mun. 1909/03","period":"�?","style":"�?","state":"Bueno?"}
  ,
  {"image":"","name":"","type":"VIVIENDA","location":"","city":"Partido de Villa Gesell","builtDate":"1947","architect":"�?","isProtected":"No","period":"�?","style":"�?","state":"MALO"}
  ,
  {"image":"","name":"CASA ANITA G. DE NEUMANN","type":"VIVIENDA","location":"Av. 4 e/ Paseos 101 y 102","city":"Partido de Villa Gesell","builtDate":"1946","architect":"�?","isProtected":"No","period":"�?","style":"�?","state":"MUY BUENO"}
  ,
  {"image":"","name":"CASA CAMINO AL AEROPUERTO","type":"VIVIENDA","location":"Ubicacion?","city":"Partido de Villa Gesell","builtDate":"�?","architect":"�?","isProtected":"Ord. Mun. 1254/94","period":"�?","style":"�?","state":"�?"}
  ,
  {"image":"","name":"CASA SCHRAMN","type":"VIVIENDA","location":"201 3/ 306 Y 307","city":"Partido de Villa Gesell","builtDate":"�?","architect":"�?","isProtected":"No","period":"�?","style":"�?","state":"MODIFICADA"}
  ,
  {"image":"","name":"CONFITERIA PIPACH","type":"C. C.  MUNICIPAL","location":"Av. Bs As. y Playa. Circunscripci�n: 6 Secci�n: A Manzana: 12 Parcela: 6A","city":"Partido de Villa Gesell","builtDate":"1952","architect":"Tom�s Semsey","isProtected":"Ord. Mun. 1854/02","period":"�?","style":"Modernismo","state":"BUENO"}
  ,
  {"image":"","name":"HOTEL ATLANTICO","type":"HOTELERO","location":"Av. 1 y Paseo 105. Circunscripci�n: 6 Secci�n: A Manzana: 16 Parcela: 1","city":"Partido de Villa Gesell","builtDate":"1949","architect":"�?","isProtected":"No","period":"�?","style":"Modernismo","state":"BUENO"}
  ,
  {"image":"","name":"PARROQUIA INMACULADA","type":"RELIGIOSO","location":"","city":"","builtDate":"","architect":"","isProtected":"","period":"","style":"MODERNISMO","state":""}
  ,
  {"image":"","name":"Escuela n� 1 Gabriela Mistral","type":"EDUCATIVO","location":"","city":"","builtDate":"","architect":"","isProtected":"","period":"","style":"","state":""}
  ,
  {"image":"","name":"ACUARIO","type":"ESPARCIMIENTO","location":"","city":"","builtDate":"","architect":"","isProtected":"","period":"","style":"","state":""}
  ,
  {"image":"","name":"EL FARO QUERAND�","type":"PUBLICO","location":"","city":"","builtDate":"","architect":"","isProtected":"","period":"","style":"","state":""}
  ,
  {"image":"","name":"CASA MUSEO C.G.","type":"MUNICIPAL","location":"","city":"","builtDate":"","architect":"","isProtected":"","period":"","style":"","state":""}
  ,
  {"image":"","name":"LA PIPETA","type":"COMERCIAL","location":"","city":"","builtDate":"","architect":"","isProtected":"","period":"","style":"","state":""}
  ,
  {"image":"","name":"LA VIEJA TERMINAL","type":"MUNICIPAL","location":"","city":"","builtDate":"","architect":"","isProtected":"","period":"","style":"","state":""}
  ,
  {"image":"","name":"PLAZA 1RA JUNTA","type":"URBANO","location":"","city":"","builtDate":"","architect":"","isProtected":"","period":"","style":"","state":""}
  ,
  {"image":"","name":"HOSPITAL  ILLIA","type":"MUNICIPAL","location":"","city":"","builtDate":"","architect":"","isProtected":"","period":"","style":"","state":""}
  ,
  {"image":"","name":"SANTIAGO APOSTOL","type":"RELIGIOSO","location":"","city":"","builtDate":"","architect":"","isProtected":"","period":"","style":"","state":""}
  ,
  {"image":"","name":"CASA DE LOS PEONES","type":"HISTORICO","location":"1959","city":"","builtDate":"","architect":"","isProtected":"","period":"","style":"","state":""}
  ,
  {"image":"","name":"EL MOLINO BLANCO","type":"COMERCIAL","location":"","city":"","builtDate":"","architect":"","isProtected":"","period":"","style":"","state":""}
  ,
  {"image":"","name":"LA VIEJA JIRAFA ROJA","type":"COMERCIAL","location":"","city":"","builtDate":"","architect":"","isProtected":"","period":"","style":"","state":""}
  ,
  {"image":"","name":"JARDIN N�2","type":"EDUCATIVO","location":"","city":"","builtDate":"","architect":"","isProtected":"","period":"","style":"","state":""}
  ,
  {"image":"","name":"EL VIEJO JARDIN","type":"EDUCATIVO","location":"","city":"","builtDate":"","architect":"","isProtected":"","period":"","style":"","state":""}
  ,
  {"image":"","name":"JUGUELANDIA","type":"ESPARCIMIENTO","location":"","city":"","builtDate":"","architect":"","isProtected":"","period":"","style":"","state":""}
  ,
  {"image":"","name":"TECHO DISCO BOULEVARD","type":"COMERCIAL","location":"","city":"","builtDate":"","architect":"","isProtected":"","period":"","style":"","state":""}
  ,
  {"image":"","name":"CASA ARQ. L. CASTELLANI","type":"VIVIENDA","location":"","city":"","builtDate":"","architect":"","isProtected":"","period":"","style":"","state":""}
  ,
  {"image":"","name":"CASA ALMEIDA BESONIAS","type":"VIVIENDA","location":"","city":"","builtDate":"","architect":"","isProtected":"","period":"","style":"","state":""}
  ,
  {"image":"","name":"Casa GEMA","type":"COMERCIAL","location":"","city":"","builtDate":"","architect":"","isProtected":"","period":"","style":"","state":""}
  
  ]









export default function Home() {
  const [buildings,setBuildings] = useState<Building[]>([])
  const [searchValue,setSearchValue] = useState<string>("")
  const [selectedBuildings,setSelectedBuildings] = useState<Building[]>([])

  useEffect(() => {
    console.log(algo);
    
    api.getBuildings().then( building => 
      setBuildings(building)
      );

  }, []); // El segundo parámetro [] indica que solo se ejecuta una vez, al montar el componente

  const filteredBuildings = useMemo(() => {
    return  buildings.filter( building => building.name.toLowerCase().includes(searchValue.toLowerCase()) ).map(({ uuid,image,refColor,location,isProtected, ...rest }) => {return rest;})
  }, [searchValue,buildings]);

  const handleRowClick = (row: any) => {
    setSelectedBuildings((prevSelectedBuildings) => {
      // Verificar si el row ya está seleccionado
      const isRowSelected = prevSelectedBuildings.map(building => building.name).includes(row.name);
  
      if (isRowSelected) {
        // Si el row está seleccionado, lo removemos de la lista de selectedBuildings
        return prevSelectedBuildings.filter((selectedRow) => selectedRow.name !== row.name);
      } else {
        // Si el row no está seleccionado, lo agregamos a la lista de selectedBuildings
        return [...prevSelectedBuildings, row];
      }
    });
  };

  return (
    <>
      <Head>
        <title>Panel de control</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1 style={{padding: '10px 50px'}}>Panel de control</h1>
      <div style={{padding: '10px 50px', display:'grid', gridTemplateColumns:'1fr 1fr 4fr',gap:'10px'}}>
        <Button  $primary>Eliminar</Button>
        <Button  $primary disabled={selectedBuildings.length!=1} >Modificar</Button>
        <Input placeholder='Ingrese nombre del edificio' onChange={(e) => setSearchValue(e.target.value )}></Input>
      </div>
      
      <div style={{padding: '10px 50px'}}>   
        <Table data={filteredBuildings} onClick={handleRowClick} />
      </div>
      

    </>
  )
}
