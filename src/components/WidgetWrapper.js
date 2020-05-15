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
    const { indiaLatest } = config;
    const [ data, setData ] = useState({});
    const [ summary, setSummary ] = useState({ total: 0, deaths: 0, discharged: 0 });
    const [ tableData, setTableData ] = useState([]);
    const [ errorMessage, setErrorMessage ] = useState('');
    const [ hasError, setHasError ] = useState(false);

    //console.log(`data widget wrapper: ${data}`);
    useEffect(() => {
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
        };
        fetchData();
    }, []);

    return(
        <Fragment>
            <CoronaMap data={data} error={errorMessage} />
            <SidePanel summary={summary} tableData={tableData} />
        </Fragment>
    );
};

export default WidgetWrapper;
