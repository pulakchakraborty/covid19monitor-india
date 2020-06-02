export const TableSettingsIndia = {
  Header: 'Statewise Distribution',
  //  Columns
  columns: [
    {
      Header: 'State',
      accessor: 'loc',
      sortType: 'basic',
      width: 150,
    },
    {
      Header: 'Confirmed',
      accessor: 'totalConfirmed',
      sortType: 'basic',
      width: 75,
    },
    {
      Header: 'Recovered',
      accessor: 'discharged',
      sortType: 'basic',
      width: 80,
    },
    {
      Header: 'Dead',
      accessor: 'deaths',
      sortType: 'basic',
      width: 75,
    },
  ],
};

export const TableSettingsWorld = {
  Header: 'Countrywise Distribution',
  //  Columns
  columns: [
    {
      Header: 'Country',
      accessor: 'country',
      sortType: 'basic',
      width: 150,
    },
    {
      Header: 'Confirmed',
      accessor: 'cases',
      sortType: 'basic',
      width: 75,
    },
    {
      Header: 'Recovered',
      accessor: 'recovered',
      sortType: 'basic',
      width: 80,
    },
    {
      Header: 'Dead',
      accessor: 'deaths',
      sortType: 'basic',
      width: 75,
    },
  ],
};
