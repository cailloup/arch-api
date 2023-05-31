import { ChangeEvent, useCallback, useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";
import { Button, Input } from "@/components/assets";
import Table, { Header, TableData } from "@/components/table";
import ArchytecstApi, { Building } from "@/utils/builddingsApi";
import { DashBoardProps } from ".";
import styles from '@/styles/dashboard.module.sass'

const api = new ArchytecstApi()
const AdminBoard: React.FC<DashBoardProps> = ({ cleanList,clean,setSelectedBuilding,setShowModifyScreen,selectedBuilding, ...props }) => {
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
    useEffect(() => {
      if (!selectedBuilding)
        return
      if (!clean)
        return
        
      const updatedBuildings = buildings.map((building) => {
        if ( building.uuid === selectedBuilding.uuid){
          return selectedBuilding
        }
        return building
      })
  
      setBuildings(updatedBuildings)
      setSelectedBuildings([]);
      cleanList()
    }, [clean])

    function filterBuildings(data:TableData[]){
      return data.filter( data => data.object.name.toLowerCase().includes(searchValue.toLowerCase()))                   
    }

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

    function hadleDelete(){
      if (selectedBuildings.length==0){
        toast.error('Error: debe seleccionar edificios para eliminar', {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            });
            return
    }
    selectedBuildings.forEach( ({uuid}) => {
        deleteBuilding(uuid)
    } )
    }
    function deleteBuilding(uuidDelete: string) {

      toast.promise(
          () => api.deleteBuilding(uuidDelete),
          {
            pending: 'Eliminando edificio',
            success: 'Edificio eliminado correctamente 👌',
            error: 'Hubo un error al eliminar el edificio 🤯'
          }
        ).then(() => {
          setBuildings(buildings.filter( ({uuid}) => uuid!=uuidDelete  ))
          setSelectedBuildings([])
        });
    }
    return (
      <div {...props}>
        <div className={styles.inputContainer}>
          <Input placeholder='Ingrese nombre del edificio' onChange={handleInputChange}/>
          <div>
            <Button $primary disabled={selectedBuildings.length==0} onClick={hadleDelete} >  <i className="icon-bin"/> Eliminar</Button>
            <Button  $primary disabled={(selectedBuildings.length!==1)} onClick={() => { if(setSelectedBuilding) setSelectedBuilding(selectedBuildings[0]);setShowModifyScreen()}} >Modificar</Button>
          </div>
        </div>

        <div  className={styles.tableContainer}>   
          <Table  filterFunction={filterBuildings} multiselect headers={headers} data={buildings} onClick={handleRowClick} />
        </div>
      </div>
    )
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