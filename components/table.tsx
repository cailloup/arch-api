import { useMemo, useState,useEffect } from "react";
import styles from '@/styles/table.module.sass'
import { TableStyled } from "./assets";

type TableRow = {
    [key: string]: string | number | boolean; 
};

type Data = {
    object:any;
    columns: TableRow
 };

export type TableData = {
    columns: TableRow; 
    object:any;
    isSelected: boolean;
};

type SortOrder = "asc" | "desc";

export interface Header { field: string; name: string }

type TableProps = {
    data: any[];
    onClick?: (row: any) => void;
    headers: Header[];
    filterFunction: (data: TableData[]) => TableData[];
    multiselect?: boolean;
    selectData?: any;
};

function Table({selectData, headers ,data, onClick,filterFunction,multiselect }: TableProps){
    const [sortOrder, setSortOrder] = useState<SortOrder>("asc");  
    const [tableData, setTableData] = useState<TableData[]>([]);
    const [sortColumn, setSortColumn] = useState<keyof TableRow>("");
    
    useEffect(() => {
        
        const mapedData = data.map( d => mapObjectWithColumns(d,headers) )

        const initialData: TableData[] = mapedData.map((row) => ({
            columns:row.columns,
            object:row.object,
            isSelected: false,
        }));

        setTableData(initialData);
    }, [data]);

    useEffect(() => {
        if(selectData){
            const updatedData = tableData.map((data) =>
            data.object === selectData ? { ...data, isSelected: true } : multiselect?data:{ ...data, isSelected: false } 
            );
            setTableData(updatedData);
        }
        
    }, [selectData]);

    const toggleSort = (column: keyof TableRow) => {
      if (sortColumn === column) {
        setSortOrder(sortOrder === "asc" ? "desc" : "asc");
      } else {
        setSortColumn(column);
        setSortOrder("asc");
      }
    };

    const sortedData: TableData[] = useMemo(() => {
        if (sortColumn !== "") {
            const sorted = [...tableData].sort((a, b) => {
                const aValue = a.columns[sortColumn];
                const bValue = b.columns[sortColumn];
                if (aValue < bValue) return sortOrder === "asc" ? -1 : 1;
                if (aValue > bValue) return sortOrder === "asc" ? 1 : -1;
                return 0;
            });
        return sorted;
      }
      return tableData;
    }, [tableData, sortColumn, sortOrder]);

    const filterData: TableData[] = useMemo(() =>  filterFunction(tableData),[tableData,filterFunction])

    const handleRowSelect = (item: TableData) => {
        const updatedData = tableData.map((data) =>
        data.columns === item.columns ? { ...data, isSelected: !data.isSelected } : multiselect?data:{ ...data, isSelected: false } 
        );
        setTableData(updatedData);
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
                    {filterData && filterData.map((item, index) => (
                        <tr className={`${styles.row} ${item.isSelected?'active':''} `} key={index} onClick={() => {handleRowSelect(item); if(onClick){onClick(item.object)}}} >
                            {Object.entries(item.columns).map(([key, value]) => {
                                return <td key={key}>{value}</td>;
                            })}
                        </tr>
                    ))}
                </tbody>
            </TableStyled>
    );
};
  
export default Table;
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
  