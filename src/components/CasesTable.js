import React from 'react';
import { useTable, useSortBy, usePagination, useBlockLayout } from 'react-table';
import styled from 'styled-components';

const Styles = styled.div`
    padding: 1rem;

    .table-container {
        margin: 0;
        font-size: 0.9rem;
        overflow: hidden;
        transition: opacity 0.3s ease;
        position: relative;

        .table {
            display: inline-block;
            height: 360px;
            border-spacing: 0;
            line-height: 1.4;
            text-align: left;

            .tr {
                :last-child {
                    .td {
                    border-bottom: 0;
                    }
                }
            }

            .th,
            .td {
                margin: 0;
                padding: 0.25rem;

                :last-child {
                    border-right: 0;
                }
            }

            .th {
                border-bottom: 1px solid;
            }
        }
    }
`

const CasesTable = ({ columns, data }) => {
    // Use the useTable Hook to send the columns and data to build the table
    const {
        getTableProps,      // table props from react-table
        getTableBodyProps,  // table body props from react-table
        headerGroups,       // headerGroups, if your table has groupings
        //rows,               // rows for the table based on the data passed
        prepareRow,          // prepare the row (this function needs to be called for each row before getting the row props)
        page,
        canPreviousPage,
        canNextPage,
        pageOptions,
        pageCount,
        gotoPage,
        nextPage,
        previousPage,
        state: { pageIndex }
    } = useTable({
            columns,
            data,
            initialState: { pageIndex: 0 }
        },
        useSortBy,           // hook for getting sorting capability
        usePagination,       // hook for setting pagination
        useBlockLayout       // hook for width-supported layout
    );

    console.log("CasesTable Component: ", columns);

    /*
    Render the UI for your table
    - react-table doesn't have UI, it's headless. We just need to put the react-table props from the Hooks
    */
    return (
        <Styles>
            <div className="table-container">
                <div className="table" {...getTableProps()}>
                    <div>
                        {headerGroups.map(headerGroup => (
                            <div {...headerGroup.getHeaderGroupProps()} className="tr">
                                {headerGroup.headers.map(column => (
                                    <div {...column.getHeaderProps(column.getSortByToggleProps())} className="th">
                                        {column.render("Header")}
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>
                    <div {...getTableBodyProps()}>
                        {page.map((row, i) => {
                            prepareRow(row);
                            return (
                                <div {...row.getRowProps()} className="tr">
                                    {row.cells.map(cell => {
                                        return(
                                            <div {...cell.getCellProps()} className="td">
                                                {cell.render("Cell")}
                                            </div>
                                        );
                                    })}
                                </div>
                            );
                        })}
                    </div>
                </div>
                <div>
                    <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
                    {"<<"}
                    </button>{" "}
                    <button onClick={() => previousPage()} disabled={!canPreviousPage}>
                    {"<"}
                    </button>{" "}
                    <button onClick={() => nextPage()} disabled={!canNextPage}>
                    {">"}
                    </button>{" "}
                    <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
                    {">>"}
                    </button>{" "}

                    <span>
                    Page{" "}
                    <strong>
                        {pageIndex + 1} of {pageOptions.length}
                    </strong>{" "}
                    </span>
                </div>
            </div>
        </Styles>
    );
};

export default CasesTable;
