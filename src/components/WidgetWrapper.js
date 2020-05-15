import React, { Fragment, useState, useEffect } from 'react';
import useSWR from 'swr';
import lookup from 'country-code-lookup';
import axios from 'axios';

import '../styles/App.scss';
import config from '../config';
import { StatesLatLong } from '../config/StatesLatLong';
import CoronaMap from './CoronaMap';
import SidePanel from './SidePanel';

const WidgetWrapper = () => {
    const { indiaLatest, jhucsse } = config;
    const [ data, setData ] = useState({});
    const [ summary, setSummary ] = useState({ total: 0, deaths: 0, discharged: 0 });
    const [ tableData, setTableData ] = useState([]);
    const [ errorMessage, setErrorMessage ] = useState('');
    const [ hasError, setHasError ] = useState(false);
    const [ mapFilter, setMapFilter ] = useState('India');

    const switchMap = (mapName) => {
        setMapFilter(mapName);
    }

    //console.log(`data widget wrapper: ${data}`);
    useEffect(() => {
        if (mapFilter === 'India') {
            const fetchData = async() => {
                try {
                    const { data: responseLatest, status: statusLatest } = await axios.get(indiaLatest);
                    if (statusLatest === 200) {
                        const response = responseLatest.data.regional;
                        setData(
                            response.map((point, index) => ({
                                type: "Feature",
                                geometry: {
                                    type: "Point",
                                    coordinates: StatesLatLong.find(state => state.name === point.loc).location
                                },
                                properties: {
                                    id: index,
                                    country: "India",
                                    province: point.loc,
                                    confirmed: point.totalConfirmed,
                                    dead: point.deaths,
                                    recovered: point.discharged
                                }
                            }))
                        );
                        setSummary(responseLatest.data.summary);
                        setTableData(responseLatest.data.regional);
                    }

                } catch(e) {
                    if (e.response) {
                        setHasError(true);
                        setErrorMessage(e.response.data.message);
                    }
                }
            }
            console.log(`mapFilter value: ${mapFilter}`)
            fetchData();
        } else {
            console.log(`mapFilter value: ${mapFilter}`)
            const fetchData = async() => {
                try {
                    const { data: responseLatest, status: statusLatest } = await axios.get(jhucsse);
                    if (statusLatest === 200) {
                        //const response = responseLatest.data;
                        setData(
                            responseLatest.map((point, index) => ({
                                type: "Feature",
                                geometry: {
                                    type: "Point",
                                    coordinates: [
                                        point.coordinates.longitude,
                                        point.coordinates.latitude
                                    ]
                                },
                                properties: {
                                    id: index,
                                    country: point.country,
                                    province: point.province,
                                    confirmed: point.stats.confirmed,
                                    dead: point.stats.deaths,
                                    recovered: point.stats.recovered
                                }
                            }))
                        );
                        //setSummary(responseLatest.data.summary);
                        //setTableData(responseLatest.data.regional);
                    }

                } catch(e) {
                    if (e.response) {
                        setHasError(true);
                        setErrorMessage(e.response.data.message);
                    }
                }
            }
            console.log(`mapFilter value: ${mapFilter}`)
            fetchData();
        }
    }, [mapFilter]);

    return(
        <Fragment>
            <CoronaMap data={data} error={errorMessage} />
            <SidePanel summary={summary} tableData={tableData} mapFilter={switchMap} />
        </Fragment>
    );
};

export default WidgetWrapper;
