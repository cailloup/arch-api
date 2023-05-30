import { ChangeEvent, useCallback, useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";
import { Button, Input } from "@/components/assets";
import Table, { Header } from "@/components/table";
import ArchytecstApi, { Building } from "@/utils/builddingsApi";
import { DashBoardProps } from ".";
import styles from '@/styles/dashboard.module.sass'

const api = new ArchytecstApi()
const AdminBoard: React.FC<DashBoardProps> = ({ setSelectedBuilding,setShowModifyScreen, ...props }) => {
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
      )
      
    }, [])

    const filteredBuildings = useMemo(() => {
      return buildings.filter( building => building.name.toLowerCase().includes(searchValue.toLowerCase()))
      .map( building => mapObjectWithColumns(building,headers))                   
    }, [searchValue,buildings]);

    const handleRowClick = useCallback((building: Building) => {
      setSelectedBuildings((prevSelectedBuildings) => {
        const isRowSelected = prevSelectedBuildings.map(({uuid}) => uuid).includes(building.uuid)
        if (isRowSelected) {
          return prevSelectedBuildings.filter(({uuid}) => uuid !== building.uuid)
        } else {
          return [...prevSelectedBuildings, building]
        }
      })
    }, [])

    const handleInputChange = useCallback((e:ChangeEvent<HTMLInputElement>) => {
      setSearchValue(e.target.value);
    }, []);

    return (
      <div {...props}>
        <div className={styles.inputContainer}>
          <Input placeholder='Ingrese nombre del edificio' onChange={handleInputChange}/>
          <div>
            <Button $primary disabled={selectedBuildings.length==0} onClick={() => console.log(selectedBuildings[0].name)} >  <i className="icon-bin"/> Eliminar</Button>
            <Button  $primary disabled={(selectedBuildings.length!==1)} onClick={() => { if(setSelectedBuilding) setSelectedBuilding(selectedBuildings[0]);setShowModifyScreen()}} >Modificar</Button>
          </div>
        </div>

        <div  className={styles.tableContainer}>   
          <Table headers={headers} data={filteredBuildings} onClick={handleRowClick} />
        </div>
      </div>
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
    }
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
  
export default AdminBoard