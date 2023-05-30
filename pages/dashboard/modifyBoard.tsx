import { ButtonComponent, InputComponent, InputDateComponent, InputFileComponent, SelectComponent } from "@/components/FormComponents";
import Form from "@/components/form";
import { buildingStyles, buildingTypes } from "@/utils/formfields";
import { DashBoardProps } from ".";
import ArchytecstApi, { Building } from "@/utils/builddingsApi";
import { toast } from "react-toastify";

const api = new ArchytecstApi()

const ModifyBoard: React.FC<DashBoardProps> = ({ selectedBuilding: building,setShowModifyScreen,setSelectedBuilding,cleanList, ...props }) => {
    
    const handleSubmit = (data: any)=>{
      if (building != undefined){ //meter un error o algo
      toast.promise(
      () => api.putBulding(data,building.uuid,building.image),
        {
          pending: 'Actualizando edificio',
          success: 'Edificios actualizado correctamente 👌',
          error: 'Hubo un error al actualizar el edificio 🤯'
        }
      ).then( (data) =>{
        const updatedBuilding = new Building(data)
        if(setSelectedBuilding){
          setSelectedBuilding(updatedBuilding)
          cleanList()
        }
      })
    }
  }
    return(
      <div {...props}>
          <Form onSubmit={handleSubmit} className="container p-80">
            <ButtonComponent type='reset' onClick={setShowModifyScreen} right text='Volver'/>
            <InputComponent id='city' label='Partido' placeHolder={['']} defaultValue={building?.city} readOnly />
            <ButtonComponent type='button' onClick={()=> {console.log('hola')}} text='Cambiar'/>
            <InputComponent id='location' label='Direccion' placeHolder={['Ingrese direcion del edificio']} defaultValue={building?.address}/>
            <InputComponent id='lat' label='latitud' placeHolder={['']} readOnly value={building?.location.lat.toString()} invisible/>
            <InputComponent id='longitude' label='longitud' placeHolder={['']} readOnly value={building?.location.lng.toString()} invisible/>
            <InputComponent id='name' label='Nombre' placeHolder={['Ingrese nombre del edificio']} defaultValue={building?.name}/>
            <InputComponent id='architect' label='Arquitecto' placeHolder={['Ingrese nombre del arquitecto']} defaultValue={building?.architect}/>
            <InputComponent id='state' label='Estado' placeHolder={['Ingrese estado del edificio']} defaultValue={building?.state}/>
            <InputComponent id='period' label='Epoca' placeHolder={['Ingrese epoca de edificio']} defaultValue={building?.period}/>
            <InputFileComponent id='image' label='Imagen edificio' textButton='Seleccionar imagen' defaultValue={building?.image.toString()}/>
            <SelectComponent id='type' label='Tipo' options={buildingTypes} defaultValue={building?.type}/>
            <SelectComponent id='style' label='Estilo' options={buildingStyles} defaultValue={building?.style}/>
            <InputComponent id='isProtected' label='Proteccion' placeHolder={['Ingrese proteccion del edificio']} defaultValue={building?.isProtected.state?'no':'si'}/>
            <InputDateComponent id='builtDate' label='Fecha de contruccion' min='12-02-1800' max={new Date().toISOString().split("T")[0]} defaultValue={building?.builtDate}/>
            <ButtonComponent type='submit' onClick={()=> {}} primary right text='Registrar edificio'/>
          </Form>
      </div>
    )
}
export default ModifyBoard