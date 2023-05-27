import { useMemo, useState,useEffect } from "react";
import styles from '@/styles/table.module.sass'
import { TableStyled } from "./assests";



type TableRow = {
    [key: string]: string | number | boolean; // Define the expected data types for each table column
};

type TableData = {
    columns: TableRow; // Define the expected data types for each table column
    object:any;
    isSelected: boolean;
};

type SortOrder = "asc" | "desc";

export type Header ={field:string,name:string};

type Data = {
   object:any;
   columns: TableRow
};


type TableProps = {
    data: Data[]; // Array of TableRow objects to represent the table data
    onClick?: (row: TableRow) => void; // Click function that receives a row as an argument
    headers: Header[]
};
  
function Table({ headers ,data, onClick }: TableProps){
    const [sortOrder, setSortOrder] = useState<SortOrder>("asc");  
    const [tableData, setTableData] = useState<TableData[]>([]);
    const [sortColumn, setSortColumn] = useState<keyof TableRow>("");
      
    
    useEffect(() => {
        const initialData: TableData[] = data.map((row) => ({
            columns:row.columns,
            object:row.object,
            isSelected: false,
        }));

        setTableData(initialData);
    }, [data]);

    const toggleSort = (column: string) => {
      if (sortColumn === column) {
        setSortOrder(sortOrder === "asc" ? "desc" : "asc");
      } else {
        setSortColumn(column);
        setSortOrder("asc");
      }
    };

    const sortedData = useMemo(() => {
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

    const handleRowSelect = (item: TableData) => {
        const updatedData = tableData.map((data) =>
        data.columns === item.columns ? { ...data, isSelected: !data.isSelected } : data
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
                    {tableData && sortedData.map((item, index) => (
                        <tr className={`${styles.row} ${item.isSelected?'active':''} `} key={index} onClick={() => {handleRowSelect(item); onClick?onClick(item.object):null}} >
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
  