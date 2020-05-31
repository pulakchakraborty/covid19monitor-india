import React, { useState, useEffect, useMemo, lazy, Suspense } from 'react';
import axios from 'axios';
import styled from 'styled-components';

import CasesHighlights from './CasesHighlights';
//import CasesTable from './CasesTable';
//import CasesChart from './CasesChart';
import config from '../config';
import { TableSettingsIndia, TableSettingsWorld } from '../config/TableSettings';
import SwitchChartWrapper from './SwitchChartWrapper';
import ToggleChartWrapper from './ToggleChartWrapper';
import { PlaceholderText } from '../styles/global';
import Spinner from './Spinner';
//import InfectionsChart from './InfectionsChart';
//import MapFilter from './MapFilter';

const CasesTable = lazy(() =>
    import('./CasesTable')
);

const CasesChart = lazy(() =>
    import('./CasesChart')
);

const InfectionsChart = lazy(() =>
    import('./InfectionsChart')
);

const DailyChart = lazy(() =>
    import('./DailyChart')
);

const Styles = styled.div`
    position: absolute;
    display: block;
    height: 700px;
    width: 100%;
    background: #121212;
    color: #808080;
    justify-content: center;

    @media (min-width: 768px) {
        width: 420px;
        right: auto;
        left: 15px;
        position: absolute;
        display: block;
        height: 646px;
        top: 120px;
        border-radius: 0 0 4px 4px;
    }

    @media (min-width: 1024px) {
        width: 420px;
        right: auto;
        left: 15px;
        position: absolute;
        display: block;
        height: 646px;
        top: 120px;
        border-radius: 0 0 4px 4px;
    }
`

const ChartPlaceHolder = styled.div`
    padding: 1rem;
    width: 100%;
    height: 256px;
    display: flex;
    justify-content: center;

    @media (min-width: 768px) {
        height: 220px;
    }

    @media (min-width: 1024px) {
        height: 220px;
    }
`

const renderFallbackText = () => <ChartPlaceHolder><PlaceholderText>Loading chart...</PlaceholderText></ChartPlaceHolder>;

const renderLoader = () => <ChartPlaceHolder><Spinner /></ChartPlaceHolder>;


const SidePanel = ({ summary, mapIsIndia, tableData }) => {
    const [ indiaHistorical, setIndiaHistorical ] = useState([]);
    const [ allHistorical, setAllHistorical ] = useState([]);
    const [ errorMessage, setErrorMessage ] = useState('');
    const [ newInfectionsChart, setNewInfectionsChart ] = useState(false);
    /* Stores any one of the four available charts for rendering purpose */
    const [ chartName, setChartName ] = useState('Total Cases');

    const { indiaHistory, allHistory } = config;

    const tableColumnsIndia = useMemo(() => [{...TableSettingsIndia}], []);
    const tableColumnsWorld = useMemo(() => [{...TableSettingsWorld}], []);

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
                if (mapIsIndia && indiaHistorical.length === 0) {
                    const { data: responseHistory, status: statusHistory } = await axios.get(indiaHistory);
                    if (statusHistory === 200) {
                        setIndiaHistorical(
                            responseHistory.data.slice(1).map((data, index) => {
                                return {day: data.day,
                                    confirmed: data.summary.total,
                                    recovered: data.summary.discharged,
                                    dead: data.summary.deaths,
                                    newCases: data.summary.total - responseHistory.data[index].summary.total,
                                    newRecoveries: data.summary.discharged - responseHistory.data[index].summary.discharged,
                                    newDeaths: data.summary.deaths - responseHistory.data[index].summary.deaths
                                }
                            })
                        );
                    }
                }
                if (!mapIsIndia && allHistorical.length === 0) {
                    const { data: responseAllHistory, status: statusAllHistory } = await axios.get(allHistory);
                    if (statusAllHistory === 200) {
                        setAllHistorical([
                            ...Object.keys(responseAllHistory.cases).slice(1).map((item, index) => ({
                                day: item,
                                confirmed: Object.values(responseAllHistory.cases)[index+1],
                                dead: Object.values(responseAllHistory.deaths)[index+1],
                                recovered: Object.values(responseAllHistory.recovered)[index+1],
                                newCases: Object.values(responseAllHistory.cases)[index+1] -
                                    Object.values(responseAllHistory.cases)[index],
                                newRecoveries: Object.values(responseAllHistory.recovered)[index+1] -
                                    Object.values(responseAllHistory.recovered)[index],
                                newDeaths: Object.values(responseAllHistory.deaths)[index+1] -
                                    Object.values(responseAllHistory.deaths)[index]
                            })),
                        ]);
                    }
                }
            } catch(e) {
                if (e.response) {
                    setErrorMessage(e.response.data.message);
                }
            }
          };
          fetchLatestData();
    }, [mapIsIndia]);

    return(
        <Styles>
            <CasesHighlights summary={summary} mapIsIndia={mapIsIndia} />
            {/*<SwitchChartWrapper
                newInfectionsChart={newInfectionsChart}
                setNewInfectionsChart={setNewInfectionsChart}
            />*/}
            <ToggleChartWrapper  chartName={chartName} setChartName={setChartName}/>
            <Suspense fallback={renderLoader()}>
                {!mapIsIndia && newInfectionsChart && <DailyChart chartData={allHistorical} />}
                {mapIsIndia && newInfectionsChart && <DailyChart chartData={indiaHistorical} />}
                {!mapIsIndia && !newInfectionsChart && <CasesChart chartData={allHistorical} />}
                {mapIsIndia && !newInfectionsChart && <CasesChart chartData={indiaHistorical} />}
            </Suspense>
            <Suspense fallback={renderLoader()}>
                {mapIsIndia
                    ? <CasesTable columns={tableColumnsIndia} data={tableData} />
                    : <CasesTable columns={tableColumnsWorld} data={tableData} />
                }
            </Suspense>
        </Styles>
    );

}

export default SidePanel;
