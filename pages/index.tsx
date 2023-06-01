import { DragMenu, DragMenuHandle } from '@/components/dragMenu'
import Head from 'next/head'
import { useRef, useState,useEffect, useCallback, ChangeEvent, useMemo } from 'react'
import  { BuildingSelector } from '@/components/gmaps/buildingSelector';
import { GoogleMap } from '@react-google-maps/api';
import CountySelector from '@/components/gmaps/countySelector';
import { County } from '@/components/gmaps/gMapFunctions';
import { Building, BuildingType, assignColor } from '@/utils/builddingsApi';
import Table, { Header} from '@/components/table';
import { Input } from '@/components/assets';
import { assests } from '@/utils/utils';

export default function Home() {
  const screenRef = useRef<HTMLDivElement>(null);
  const [county,setCounty] = useState<County | null>(null);
  const [building,setBuilding] = useState<Building | null>(null);
  const [buildings,setBuildings] = useState<Building[] | null>(null);
  const [searchValue,setSearchValue] = useState<string>("")
  const dragMenu = useRef<DragMenuHandle>(null);
  const [filteredTypes,setFilteredTypes] = useState(assests.buildingTypes);

  useEffect(() => {   //building selected
      if(county){
        dragMenu.current?.setHide(false)
      }else{
        dragMenu.current?.setHide(true)
      }
    }, [county]); 

    const handleInputChange = useCallback((e:ChangeEvent<HTMLInputElement>) => {
      setSearchValue(e.target.value);
    }, []);
    const filteredBuildings = useMemo(()=>{
      return buildings?.filter( (building) =>  building.name.toLowerCase().includes(searchValue.toLowerCase()) && filteredTypes.includes(building.type) )
    },[buildings,filteredTypes])

  return (
    <>
      <Head>
        <title>Mapa</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
        <div ref={screenRef} style={{  width:'60%', height:'100%', position:'absolute'}}>
          <GoogleMap mapContainerStyle={{width: "100%", height: "100%"}}>
            {county==null?<CountySelector setCounty={setCounty}/>:<BuildingSelector setFilteredTypes={setFilteredTypes} building={building} buildings={filteredBuildings} setBuildings={setBuildings} scapeDown={() => {setCounty(null); setBuilding(null) } } setBuilding={setBuilding}  selectedCounty={county}/>}
          </GoogleMap>
        </div>
        <DragMenu ref={dragMenu} screenRef={screenRef} hidden defaultWidth={40}>
          {filteredBuildings && 
          <div style={{display:'flex', flexDirection:'column', height:'100%'}  }>
            {building  &&<BuildingCard building={building} />} 
            <Input style={{width:'100%', padding:'10px'}} placeholder='Ingrese nombre del edificio' onChange={handleInputChange}/>
            <div style={{ width:'100%', flex: 1,overflowX:'hidden', overflowY:'auto'  }}>
              <Table headers={headers} data={filteredBuildings} selectedData={building} setSelectData={setBuilding}/>
            </div>
          </div>
          }
        </DragMenu>
    </>
  )
}

const headers:Header[] = [{ field:'name',name:'Edificio' }]

function BuildingCard({building}:{building:Building}){
  return (            
  <div className="buildingCard">
    <img className="buildingPicture" src={building.image} alt="" />
    <div className="buildingDescription">
      <p>{building.name}</p>
      <p>Año: {building.builtDate}</p>
      <p>Constructor: {building.architect}</p>
      <p>Ubicacion: {building.address}</p>
      <p>Estilo: {building.style}</p>
      <p>Tipo: {building.type}</p>
    </div>
  </div>)
}