import { useMemo, useState,useEffect } from "react";
import styles from '@/styles/table.module.sass'
import { TableStyled } from "./assets";

type TableRow = {
    [key: string]: string | number | boolean; 
};

type SortOrder = "asc" | "desc";

export interface Header { field: string; name: string }

type TableProps = {
    data: any[];
    selectedData: any[] | any;
    headers: Header[];
    setSelectData: (any: any[] | any | undefined) => void;
    onClick?: (row: any) => void;
    multiselect?: boolean;
};

function Table({data, selectedData, headers, onClick, multiselect, setSelectData }: TableProps){
    const [sortOrder, setSortOrder] = useState<SortOrder>("asc");  
    const [sortColumn, setSortColumn] = useState<keyof TableRow>("");

    useEffect(()=>{
        if (selectedData instanceof Array){
            setSelectData( selectedData.filter( (d: any) => data.includes(d) ) )
        }else{
            setSelectData( data.includes(selectedData)?selectedData:undefined )
        }
        
    },[data])

    const toggleSort = (column: keyof TableRow) => {
      if (sortColumn === column) {
        setSortOrder(sortOrder === "asc" ? "desc" : "asc");
      } else {
        setSortColumn(column);
        setSortOrder("asc");
      }
    };

    const sortedData: any[] = useMemo(() => {
        if (sortColumn !== "") {
            const sorted = data.sort((a, b) => {
                const aValue = a[sortColumn];
                const bValue = b[sortColumn];
                if (aValue < bValue) return sortOrder === "asc" ? -1 : 1;
                if (aValue > bValue) return sortOrder === "asc" ? 1 : -1;
                return 0;
            });
        return sorted;
      }
      return data;
    }, [data, sortColumn, sortOrder]);

    function handleRowSelect(row: any)  {
        if (multiselect){
            const index = selectedData.findIndex((item:any) => item === row);
            if (index !== -1) {
                setSelectData(selectedData.filter((item:any) => item !== row));
            } else {
                setSelectData([...selectedData,row]);
            }
        }else{
            if (selectedData === row){
                setSelectData(null);
            }else{
                setSelectData(row);
            }
            
        }
    };

    return (
            <TableStyled className={styles.table}>
                <thead>
                    <tr className={styles.header}>
                        {headers.map((header) => (
                            <th key={header.field} onClick={() => toggleSort(header.field)}>{header.name}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {sortedData && sortedData.map((item, index) => (
                        <tr className={`${styles.row} ${multiselect?selectedData.includes(item)?'active':'':selectedData===item?'active':'' } `} key={index} onClick={() => {handleRowSelect(item); if(onClick){onClick(item)}}} >
                            {headers.map((header, columnIndex) => (
                                <td key={columnIndex}>{item[header.field]}</td>
                            ))}
                    </tr>
                    ))}
                </tbody>
            </TableStyled>
    );
};
  
export default Table;