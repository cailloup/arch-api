import { useMemo, useState,useEffect } from "react";
import styles from '@/styles/table.module.sass'
import { TableStyled } from "./assests";

type TableRow = {
    [key: string]: string | number | boolean; // Define the expected data types for each table column
};

type TableData = {
    [key: string]: string | number | boolean; // Define the expected data types for each table column
    isSelected: boolean;
};

type SortOrder = "asc" | "desc";

type TableProps = {
    data: TableRow[]; // Array of TableRow objects to represent the table data
    onClick?: (row: TableRow) => void; // Click function that receives a row as an argument
};
  
function Table({ data, onClick }: TableProps){
    if (data.length === 0) {
        return <div>No data available</div>;
    }

    const [sortColumn, setSortColumn] = useState(Object.keys(data[0])[0]);
    const [sortOrder, setSortOrder] = useState<SortOrder>("asc");
    const [tableData, setTableData] = useState<TableData[]>([]);
    const headers = Object.keys(data[0]);
    
    useEffect(() => {
        const initialData: TableData[] = data.map((row) => ({
            ...row,
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
                const aValue = a[sortColumn];
                const bValue = b[sortColumn];
                if (aValue < bValue) return sortOrder === "asc" ? -1 : 1;
                if (aValue > bValue) return sortOrder === "asc" ? 1 : -1;
                return 0;
            });
        return sorted;
      }
      return tableData;
    }, [tableData, sortColumn, sortOrder]);

    const handleRowSelect = (row: TableRow) => {
        const updatedData = tableData.map((item) =>
          item === row ? { ...item, isSelected: !item.isSelected } : item
        );
        setTableData(updatedData);
    };

    return (
            <TableStyled className={styles.table}>
                <thead>
                    <tr className={styles.header}>
                        {headers.map((header) => (
                            <th key={header} onClick={() => toggleSort(header)}>{header}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {sortedData.map((item, index) => (
                        <tr className={`${styles.row} ${item.isSelected?'active':''} `} key={index} onClick={() => {handleRowSelect(item); onClick?onClick(item):null}} >
                            {Object.entries(item).map(([key, value]) => {
                                if (key !== "isSelected") {
                                    return <td key={key}>{value}</td>;
                                }
                                return null; 
                            })}
                        </tr>
                    ))}
                </tbody>
            </TableStyled>
    );
};
  
export default Table;
  