import Head from 'next/head'
import { useState,useEffect,useMemo, ChangeEvent, useCallback } from 'react';
import {toast} from "react-toastify"

import Table, { Header } from '@/components/table'
import { Button, Input } from '@/components/assests';
import ArchytecstApi, { Building } from '@/utils/builddingsApi';

import styles from '@/styles/dashboard.module.sass'

const api = new ArchytecstApi()

export default function DashBoard() {
  const [buildings,setBuildings] = useState<Building[]>([])
  const [searchValue,setSearchValue] = useState<string>("")
  const [selectedBuildings,setSelectedBuildings] = useState<Building[]>([])

  useEffect(() => {
    toast.promise(
      () => api.getBuildings(),
      {
        pending: 'Obteniendo edificios',
        success: 'Edificios cargados correctamente 👌',
        error: 'Hubo un error al cargar los edificios 🤯'
      }
    ).then( building => 
      setBuildings(building)
    );

  }, []);

  const filteredBuildings = useMemo(() => {
    return buildings.filter( building => building.name.toLowerCase().includes(searchValue.toLowerCase()))
    .map( building => mapObjectWithColumns(building,headers))                   
  }, [searchValue,buildings]);

  const handleRowClick = useCallback((building: Building) => {
    setSelectedBuildings((prevSelectedBuildings) => {
      const isRowSelected = prevSelectedBuildings.map(({uuid}) => uuid).includes(building.uuid);
      if (isRowSelected) {
        return prevSelectedBuildings.filter(({uuid}) => uuid !== building.uuid);
      } else {
        return [...prevSelectedBuildings, building];
      }
    });
  }, []);

  return (
    <>
      <Head>
        <title>Panel de control</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1 style={{padding: '20px 50px'}}>Panel de control</h1>
     
      <div className={styles.inputContainer}>
      <Input placeholder='Ingrese nombre del edificio' onChange={(e:ChangeEvent<HTMLInputElement>) => setSearchValue(e.target.value )}/>
        <div>
          <Button onClick={() => console.log(selectedBuildings[0].name)} $primary>  <i className="icon-bin"/> Eliminar</Button>
          <Button  $primary disabled={selectedBuildings.length!==1} >Modificar</Button>
        </div>
       
      </div>
      <div  className={styles.tableContainer}>   
        <Table headers={headers} data={filteredBuildings} onClick={handleRowClick} />
      </div>
    </>
  )
}

function mapObjectWithColumns(originalObject: any, headers: Header[]) {
  const columns:any = {};
  headers.forEach(({field}) =>{
    if (originalObject.hasOwnProperty(field)) {
      columns[field] = originalObject[field];
    }
  })
  return {
    object: originalObject,
    columns: columns
  };
}

const headers = [
  {field:"name",name:"Nombre"},
  {field:"address",name:"Direccion"},
  {field:"period",name:"epoca"},
  {field:"city",name:"Ciudad"},
  {field:"architect",name:"Arquitecto"},
  {field:"type",name:"Tipo"},
  {field:"state",name:"Estado"},
  {field:"style",name:"Estilo"},
  {field:"builtDate",name:"Construccion"},
]