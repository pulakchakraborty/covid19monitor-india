import React, { useState, useEffect, useMemo, lazy, Suspense } from 'react';
import axios from 'axios';
import styled from 'styled-components';

import CasesHighlights from './CasesHighlights';
import CasesTable from './CasesTable';
//import CasesChart from './CasesChart';
import config from '../config';
import { TableSettingsIndia, TableSettingsWorld } from '../config/TableSettings';
import SwitchWrapper from './SwitchWrapper';
import { PlaceholderText } from '../styles/global';
//import InfectionsChart from './InfectionsChart';
//import MapFilter from './MapFilter';

const CasesChart = lazy(() =>
    import('./CasesChart')
);

const InfectionsChart = lazy(() =>
    import('./InfectionsChart')
);

const Styles = styled.div`
    position: absolute;
    display: block;
    height: 700px;
    width: 100%;
    background: black;
    color: dimgrey;
    justify-content: center;
    opacity: 0.85;

    @media (min-width: 768px) {
        width: 420px;
        right: auto;
        left: 15px;
        position: absolute;
        display: block;
        height: 646px;
        top: 104px;
        border-radius: 4px;
    }

    @media (min-width: 1024px) {
        width: 420px;
        right: auto;
        left: 15px;
        position: absolute;
        display: block;
        height: 646px;
        top: 104px;
        border-radius: 4px;
    }
`

const ChartPlaceHolder = styled.div`
    padding: 1rem;
    width: 100%;
    height: 256px;
    justify-content: center;

    @media (min-width: 768px) {
        height: 220px;
    }

    @media (min-width: 1024px) {
        height: 220px;
    }
`

const renderLoader = () => <ChartPlaceHolder><PlaceholderText>Loading chart...</PlaceholderText></ChartPlaceHolder>;

const SidePanel = ({ summary, mapSummary, tableData, mapFilter }) => {
    const [ indiaHistorical, setIndiaHistorical ] = useState([]);
    const [ allHistorical, setAllHistorical ] = useState([]);
    const [ errorMessage, setErrorMessage ] = useState('');
    const [ hasError, setHasError ] = useState(false);
    const [ newInfectionsChart, setNewInfectionsChart ] = useState(false);

    const { indiaHistory, allHistory } = config;

    const tableColumnsIndia = useMemo(() => [{...TableSettingsIndia}], []);
    const tableColumnsWorld = useMemo(() => [{...TableSettingsWorld}], []);

    const switchChart = (newInfections) => {
        setNewInfectionsChart(newInfections);
    };

    /*
    const isMapIndia = (flag) => {
        mapFilter(flag);
    };
    */

    useEffect(() => {
        const fetchLatestData = async () => {
            try {
                /*const { data: responseLatest, status: statusLatest } = await axios.get(indiaLatest);
                if (statusLatest === 200) {
                    setIndiaCases(responseLatest.data);
                    setSummary(responseLatest.data.summary);
                    setTableData(responseLatest.data.regional);
                }
                */
                if (mapSummary && indiaHistorical.length === 0) {
                    const { data: responseHistory, status: statusHistory } = await axios.get(indiaHistory);
                    if (statusHistory === 200) {
                        setIndiaHistorical(
                            responseHistory.data.slice(1).map((data, index) => {
                                return {day: data.day,
                                    confirmed: data.summary.total,
                                    recovered: data.summary.discharged,
                                    dead: data.summary.deaths,
                                    newInfections: data.summary.total - responseHistory.data[index].summary.total
                                }
                            })
                        );
                    }
                }
                if (!mapSummary && allHistorical.length === 0) {
                    const { data: responseAllHistory, status: statusAllHistory } = await axios.get(allHistory);
                    if (statusAllHistory === 200) {
                        setAllHistorical([
                            ...Object.keys(responseAllHistory.cases).slice(1).map((item, index) => ({
                                day: item,
                                confirmed: Object.values(responseAllHistory.cases)[index+1],
                                dead: Object.values(responseAllHistory.deaths)[index+1],
                                recovered: Object.values(responseAllHistory.recovered)[index+1],
                                newInfections: Object.values(responseAllHistory.cases)[index+1] -
                                    Object.values(responseAllHistory.cases)[index]
                            })),
                        ]);
                    }
                }
            } catch(e) {
                if (e.response) {
                    setHasError(true);
                    setErrorMessage(e.response.data.message);
                }
            }
          };
          fetchLatestData();
    }, [mapSummary]);

    return(
        <Styles>
            {/*<MapFilter isMapIndia={isMapIndia} />*/}
            <CasesHighlights summary={summary} mapSummary={mapSummary} />
            <SwitchWrapper switchChart={switchChart} />
            <Suspense fallback={renderLoader()}>
                {!mapSummary && newInfectionsChart && <InfectionsChart chartData={allHistorical} />}
                {mapSummary && newInfectionsChart && <InfectionsChart chartData={indiaHistorical} />}
                {!mapSummary && !newInfectionsChart && <CasesChart chartData={allHistorical} />}
                {mapSummary && !newInfectionsChart && <CasesChart chartData={indiaHistorical} />}
            </Suspense>
            {mapSummary
                ? <CasesTable columns={tableColumnsIndia} data={tableData} />
                : <CasesTable columns={tableColumnsWorld} data={tableData} />
            }
        </Styles>
    );

}

export default SidePanel;
