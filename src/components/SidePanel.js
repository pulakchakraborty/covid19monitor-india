import React, { useState, useEffect } from 'react';
import useSWR from 'swr';
import axios from 'axios';

import '../styles/SidePanel.scss';
import CasesHighlights from './CasesHighlights';
import CasesTable from './CasesTable';
import config from '../config';

const SidePanel = () => {
    const [ indiaCases, setIndiaCases ] = useState({});
    const [ summary, setSummary ] = useState({ total: 0, deaths: 0, discharged: 0 });
    const [ errorMessage, setErrorMessage ] = useState('');
    const [ hasError, setHasError ] = useState(false);
    const { indiaLatest } = config;

    useEffect(() => {
        (async () => {
            try {
                const { data: response, status } = await axios.get(indiaLatest);
                if (status === 200) {
                    setIndiaCases(response.data);
                    setSummary(response.data.summary);
                }
            } catch(e) {
                if (e.response) {
                    setHasError(true);
                    setErrorMessage(e.response.data.message);
                }
            }
          })();
    }, []);

    return(
        <div className="side-panel">
            <CasesHighlights summary={summary} />
            <CasesTable />
        </div>
    );

}

export default SidePanel;
