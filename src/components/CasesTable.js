import React from 'react';
import { useTable, useSortBy } from 'react-table';

import '../styles/CasesTable.scss';

const CasesTable = ({ columns, data }) => {
    // Use the useTable Hook to send the columns and data to build the table
    const {
        getTableProps,      // table props from react-table
        getTableBodyProps,  // table body props from react-table
        headerGroups,       // headerGroups, if your table has groupings
        rows,               // rows for the table based on the data passed
        prepareRow          // prepare the row (this function needs to be called for each row before getting the row props)
    } = useTable({
            columns,
            data
        },
        useSortBy           // hook for getting sorting capability
    );

    console.log("CasesTable Component: ", columns);

    /*
    Render the UI for your table
    - react-table doesn't have UI, it's headless. We just need to put the react-table props from the Hooks
    */
    return (
        <table className="cases-table" {...getTableProps()}>
            <thead className="cases-table-head">
                {headerGroups.map(headerGroup => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map(column => (
                            <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                                {column.render("Header")}
                            </th>
                        ))}
                    </tr>
                ))}
            </thead>
            <tbody {...getTableBodyProps()}>
                {rows.map((row, i) => {
                    prepareRow(row);
                    return (
                        <tr {...row.getRowProps()}>
                            {row.cells.map(cell => {
                                return <td {...cell.getCellProps()}>{cell.render("Cell")}</td>;
                            })}
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );
};

export default CasesTable;
