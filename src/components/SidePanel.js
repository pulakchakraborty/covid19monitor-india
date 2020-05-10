import React, { useState, useEffect } from 'react';
import useSWR from 'swr';

import '../styles/SidePanel.scss';
import CasesHighlights from './CasesHighlights';
import config from '../config';

const SidePanel = () => {
    const [ indiaCases, setIndiaCases ] = useState({});
    const [ summary, setSummery ] = useState({ total: 0, deaths: 0, discharged: 0 });
    const { indiaLatest } = config;
    const fetcher = async (url) =>
    await fetch(url)
        .then(r => r.json())
        .then(response => setIndiaCases(response.data));

    // Use swr from Zeit to fetch data from API
    const { data, error } = useSWR(indiaLatest, fetcher);
    useEffect(() => {
        if(indiaCases.summary) {
            setSummery(indiaCases.summary);
            console.log("inside UE: ", summary);
        }
    }, [indiaCases, summary]);

    return(
        <div className="side-panel">
            <CasesHighlights summary={summary} />
        </div>
    );

}

export default SidePanel;
