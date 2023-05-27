import { useMemo, useState,useEffect } from "react";
import styles from '@/styles/table.module.sass'
import { TableStyled } from "./assests";

type TableRow = {
    [key: string]: string | number | boolean; 
};

type Data = {
    object:any;
    columns: TableRow
 };

type TableData = {
    columns: TableRow; 
    object:any;
    isSelected: boolean;
};

type SortOrder = "asc" | "desc";

export interface Header { field: string; name: string }

type TableProps = {
    data: Data[];
    onClick?: (row: TableRow) => void;
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