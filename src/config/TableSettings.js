export const TableSettings = {
    Header: "Statewise Distribution",
    //  Columns
    columns: [
        {
            Header: "State",
            accessor: "loc",
            sortType: "basic"
        },
        {
            Header: "Active",
            accessor: "totalConfirmed",
            sortType: "basic"
        },
        {
            Header: "Recovered",
            accessor: "discharged",
            sortType: "basic"
        },
        {
            Header: "Dead",
            accessor: "deaths",
            sortType: "basic"
        }
    ]
};
