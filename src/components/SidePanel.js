import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import styled from 'styled-components';

import CasesHighlights from './CasesHighlights';
import CasesTable from './CasesTable';
import CasesChart from './CasesChart';
import config from '../config';
import { TableSettings } from '../config/TableSettings';
import SwitchWrapper from './SwitchWrapper';
import InfectionsChart from './InfectionsChart';

const Styles = styled.div`
    margin: 10px;
    position: absolute;
    display: block;
    height: 700px;
    width: 420px;
    right: auto;
    left: 15px;
    top: 50px;
    border-radius: 4px;
    background: black;
    color: dimgrey;
    justify-content: center;
    opacity: 0.85;

`

const SidePanel = ({ summary, tableData }) => {
    const [ indiaCases, setIndiaCases ] = useState({});
    //const [ summary, setSummary ] = useState({ total: 0, deaths: 0, discharged: 0 });
    //const [ tableData, setTableData ] = useState([]);
    const [ indiaHistorical, setIndiaHistorical ] = useState([]);
    const [ errorMessage, setErrorMessage ] = useState('');
    const [ hasError, setHasError ] = useState(false);
    const [ newInfectionsChart, setNewInfectionsChart ] = useState(false);

    const { indiaLatest, indiaHistory } = config;

    const columns = useMemo(() => [{...TableSettings}], []);

    const switchChart = (newInfections) => {
        setNewInfectionsChart(newInfections);
    };


    useEffect(() => {
        const fecthLatestData = async () => {
            try {
                /*const { data: responseLatest, status: statusLatest } = await axios.get(indiaLatest);
                if (statusLatest === 200) {
                    setIndiaCases(responseLatest.data);
                    setSummary(responseLatest.data.summary);
                    setTableData(responseLatest.data.regional);
                }
                */
                const { data: responseHistory, status: statusHistory } = await axios.get(indiaHistory);
                if (statusHistory === 200) {
                    setIndiaHistorical(responseHistory.data);
                }
            } catch(e) {
                if (e.response) {
                    setHasError(true);
                    setErrorMessage(e.response.data.message);
                }
            }
          };
          fecthLatestData();
    }, []);

    return(
        <Styles>
            <CasesHighlights summary={summary} />
            <SwitchWrapper switchChart={switchChart} />
            {newInfectionsChart
                ? <InfectionsChart chartData={indiaHistorical} />
                : <CasesChart chartData={indiaHistorical} />
            }
            <CasesTable columns={columns} data={tableData} />
        </Styles>
    );

}

export default SidePanel;
