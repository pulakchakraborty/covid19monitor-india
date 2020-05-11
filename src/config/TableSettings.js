export const TableSettings = {
    Header: "Statewise Distribution",
    //  Columns
    columns: [
        {
            Header: "State",
            accessor: "loc",
            sortType: "basic",
            width: 150
        },
        {
            Header: "Active",
            accessor: "totalConfirmed",
            sortType: "basic",
            width: 75
        },
        {
            Header: "Recovered",
            accessor: "discharged",
            sortType: "basic",
            width: 80
        },
        {
            Header: "Dead",
            accessor: "deaths",
            sortType: "basic",
            width: 75
        }
    ]
};
