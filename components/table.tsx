import { useMemo, useState } from "react";

type TableRow = {
    [key: string]: string | number | boolean; // Define the expected data types for each table column
  };
type SortOrder = "asc" | "desc";

type TableProps = {
    data: TableRow[]; // Array of TableRow objects to represent the table data
    onClick: (row: TableRow) => void; // Click function that receives a row as an argument
  };
  
const Table: React.FC<TableProps> = ({ data, onClick }) => {
    if (data.length === 0) {
        return <div>No data available</div>;
    }
    
    const [sortColumn, setSortColumn] = useState("");
    const [sortOrder, setSortOrder] = useState<SortOrder>("asc");
    const headers = Object.keys(data[0]);

    const toggleSort = (column: string) => {
      if (sortColumn === column) {
        setSortOrder(sortOrder === "asc" ? "desc" : "asc");
      } else {
        setSortColumn(column);
        setSortOrder("asc");
      }
    };
  
    const sortedContent = useMemo(() => {
        if (sortColumn !== "") {
            const sorted = [...data].sort((a, b) => {
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

    return (
        <table>
            <thead>
            <tr>
                {headers.map((header) => (
                    <th key={header} onClick={() => toggleSort(header)}>{header}</th>
                ))}
            </tr>
            </thead>
            <tbody>
            {sortedContent.map((item, index) => (
                <tr key={index} onClick={() => onClick(item)}>
                    {Object.values(item).map((value, index) => (
                        <td key={index}>{value}</td>
                    ))}
                </tr>
            ))}
            </tbody>
        </table>
    );
};
  
export default Table;
  