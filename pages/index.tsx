import { DragMenu, DragMenuHandle } from '@/components/dragMenu'
import Head from 'next/head'
import { useRef, useState,useEffect, useCallback, ChangeEvent, useMemo } from 'react'
import  { BuildingSelector } from '@/components/gmaps/buildingSelector';
import { GoogleMap } from '@react-google-maps/api';
import CountySelector from '@/components/gmaps/countySelector';
import { County } from '@/components/gmaps/gMapFunctions';
import { Building } from '@/utils/builddingsApi';
import Table, { Header} from '@/components/table';
import { Button, Input, TextButton } from '@/components/assets';
import { assests } from '@/utils/utils';
import { BuildingsFilter } from '../components/filters';

export default function Home() {
  const screenRef = useRef<HTMLDivElement>(null);
  const [county,setCounty] = useState<County | null>(null);
  const [building,setBuilding] = useState<Building | null>(null);
  const [buildings,setBuildings] = useState<Building[] | null>(null);
  const [searchValue,setSearchValue] = useState<string>("")
  const dragMenu = useRef<DragMenuHandle>(null);
  const [filteredTypes,setFilteredTypes] = useState(assests.buildingTypes);
  const [architect,setArchitect] = useState('');
  const [showFilters,setShowFilters] = useState(false)
  
  useEffect(() => {
    const shouldHide = county === null ||  (county != null && building != null);
    console.log(county);
    console.log(building);
    dragMenu.current?.setHide(shouldHide);

  }, [county, building]);

    const handleInputChange = useCallback((e:ChangeEvent<HTMLInputElement>) => {
      setSearchValue(e.target.value);
    }, []);
    const filteredBuildings = useMemo(()=>{
      return buildings?.filter( (building) => building.architect.toLowerCase().includes(architect) && building.name.toLowerCase().includes(searchValue.toLowerCase()) && filteredTypes.includes(building.type) )
    },[buildings,filteredTypes,searchValue,architect])

  return (
    <>
      <Head>
        <title>Mapa</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div ref={screenRef} style={{  width:'60%', height:'100%', position:'absolute'}}>
        {building &&
          <div className='containerb'> 
              <img src={building.image} alt={building.name} />
              <div>
                <h1>{building.name}</h1>
                <p>Año: {building.builtDate}</p>
                <p>Constructor: {building.architect}</p>
                <p>Ubicacion: {building.address}</p>
                <p>Estilo: {building.style}</p>
                <p>Tipo: {building.type}</p>
                <p>Epoca: {building.period}</p>
                <p>Proteccion: {building.isProtected.info}</p>
              </div>
          </div>
        }
        <GoogleMap mapContainerStyle={{width: "100%", height: "100%"}}>
          {county==null?<CountySelector setCounty={setCounty}/>:<BuildingSelector setFilteredTypes={setFilteredTypes} building={building} buildings={filteredBuildings} setBuildings={setBuildings} scapeDown={() => {setCounty(null); setBuilding(null) } } setBuilding={setBuilding}  selectedCounty={county}/>}
        </GoogleMap>
      </div>
      <DragMenu ref={dragMenu} screenRef={screenRef} hidden defaultWidth={40}>
        {filteredBuildings && buildings &&
        <div style={{display:'flex', flexDirection:'column',alignItems: 'flex-start', height:'100%', paddingTop:'25px'}  }>
          {building?<BuildingCard building={building}/>: 
          <>
            <div style={{padding:'25px', paddingBottom:'5px',width:'100%'}}>
              <h2>Edificaciones</h2>
              <Input style={{width:'100%'}} placeholder='Ingrese nombre del edificio' onChange={handleInputChange}/>
              <Button $primary style={{ marginTop:'15px', marginBottom:'5px'}} onClick={() => setShowFilters(!showFilters)}>Filtros</Button>
              <BuildingsFilter hide={!showFilters} architect={architect} setArchitect={setArchitect} allTypes={buildings.map(({type}) => type)} filteredTypes={ filteredTypes} setFilteredTypes={setFilteredTypes}/>
            </div>
            <div style={{ width:'100%', flex: 1,overflowX:'hidden', overflowY:'auto'  }}>
              <Table headers={headers} data={filteredBuildings} selectedData={building} setSelectData={setBuilding} />
            </div>
          </>
          }
        </div>
        }
      </DragMenu>
    </>
  )
}

const headers:Header[] = [{ field:'name',name:'Edificio' }]

const BuildingCard = ({ building }: { building: Building }) => {
  return (            
    <div className="buildingCard">
      <img className="buildingPicture" src={building.image} alt={building.name} />
      <div className="buildingDescription">
        <p>{building.name}</p>
        <p>Año: {building.builtDate}</p>
        <p>Constructor: {building.architect}</p>
        <p>Ubicacion: {building.address}</p>
        <p>Estilo: {building.style}</p>
        <p>Tipo: {building.type}</p>
        <p>Epoca: {building.period}</p>
        <p>Proteccion: {building.isProtected.info}</p>
      </div>
    </div>
  );
};