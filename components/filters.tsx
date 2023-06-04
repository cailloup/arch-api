
import styles from '@/styles/test.module.sass'
import { assests } from '@/utils/utils';
import { BuildingType, assignColor } from '@/utils/builddingsApi';
import { Input } from '@/components/assets';
import { ChangeEvent, ChangeEventHandler } from 'react';

type BuildingFilterProps = {
  filteredTypes: any;
  setFilteredTypes: any;
  allTypes:any;
  setArchitect:any;
  architect:string;
  hide?: boolean;
}
export const BuildingsFilter: React.FC<BuildingFilterProps> = ({hide,filteredTypes, setFilteredTypes,allTypes,setArchitect,architect}) => {
  
  function  getQuantityTypes(buildingType:BuildingType){
    let count = 0;
    allTypes.forEach((type:any) => {if( type==buildingType){count++}})
    return count
  }
    function toggleType(type:string){
        const index = filteredTypes.indexOf(type);
        if (index !== -1) {
          // El tipo ya está presente, lo eliminamos
          const updatedTypes = [...filteredTypes];
          updatedTypes.splice(index, 1);
          setFilteredTypes(updatedTypes);
          setFilteredTypes(updatedTypes);
        } else {
          // El tipo no está presente, lo insertamos
          setFilteredTypes([...filteredTypes, type]);
          setFilteredTypes([...filteredTypes, type]);
        }
      };

  return (            
    <div className= {`${styles.filtersContainer} ${hide?styles.hide:''}`}>
      <h3>Tipopologia edilica</h3>
      <div className={styles.typesConainer}>
          {assests.buildingTypes.filter((type) => getQuantityTypes(type as BuildingType)>0).map( (type)  =>
              <div key={type} className={styles.reference} >
                  <div onClick={() => toggleType(type as BuildingType)} className={styles.referencesSquare} style={ {borderColor:assignColor(type as BuildingType),  backgroundColor: filteredTypes.includes(type)?assignColor(type as BuildingType):"transparent"}}>  </div>
                  <p onClick={() => toggleType(type as BuildingType)} style={{cursor: 'pointer'}}>{type}:{getQuantityTypes(type as BuildingType)}</p>
              </div> 
              )}
      </div>
      <hr/>
      <h3>Arquitecto</h3>
      <Input defaultValue={architect} onChange={(e:ChangeEvent<HTMLInputElement>) =>setArchitect(e.currentTarget.value)} placeholder='Ingrese nombre del arquitecto'/>
              
    </div>
  );
};

