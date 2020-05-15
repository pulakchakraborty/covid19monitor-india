import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import styled from 'styled-components';

const Styles = styled.div`
    padding: 1rem;
    width: 95%;
    height: 180px;
    .recharts-cartesian-axis-ticks {
        font-size: 0.7rem;
    }
    .recharts-legend-item-text {
        font-size: 0.9rem;
    }
`

const InfectionsChart = ({ chartData }) => {
    const dataArr = chartData.slice(1).map((data, index) => {
        return{
            index: data.day,
            newInfections: data.summary.total - chartData[index].summary.total
        };
    });

    return(
        <Styles>
            <ResponsiveContainer>
                <BarChart
                    data={dataArr}
                    margin={{
                        top: 10, right: 20, left: 10, bottom: 0,
                    }}
                >
                    <XAxis dataKey="index" />
                    <YAxis
                        type="number"
                        tickSize={6}
                        mirror={true}
                    />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="newInfections" fill="#d14f69" stroke="rgba(209,79,105,0.2)" />
                </BarChart>
            </ResponsiveContainer>
        </Styles>
    );
};

export default InfectionsChart;
