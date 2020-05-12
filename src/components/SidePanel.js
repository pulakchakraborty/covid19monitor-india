import React, { useState, useEffect, useMemo } from 'react';
import useSWR from 'swr';
import axios from 'axios';

import '../styles/SidePanel.scss';
import CasesHighlights from './CasesHighlights';
import CasesTable from './CasesTable';
import CasesChart from './CasesChart';
import config from '../config';
import { TableSettings } from '../config/TableSettings';

const SidePanel = () => {
    const [ indiaCases, setIndiaCases ] = useState({});
    const [ summary, setSummary ] = useState({ total: 0, deaths: 0, discharged: 0 });
    const [ tableData, setTableData ] = useState([]);
    const [ indiaHistorical, setIndiaHistorical ] = useState([]);
    const [ errorMessage, setErrorMessage ] = useState('');
    const [ hasError, setHasError ] = useState(false);
    const { indiaLatest, indiaHistory } = config;

    const columns = useMemo(() => [{...TableSettings}], []);

    useEffect(() => {
        const fecthLatestData = async () => {
            try {
                const { data: responseLatest, status: statusLatest } = await axios.get(indiaLatest);
                if (statusLatest === 200) {
                    setIndiaCases(responseLatest.data);
                    setSummary(responseLatest.data.summary);
                    setTableData(responseLatest.data.regional);
                }

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
        <div className="side-panel">
            <CasesHighlights summary={summary} />
            <CasesTable columns={columns} data={tableData} />
            <CasesChart chartData={indiaHistorical} />
        </div>
    );

}

export default SidePanel;
