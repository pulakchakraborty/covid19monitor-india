import React from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import styled from 'styled-components';

const Styles = styled.div`
    padding: 1rem;
    width: 100%;
    height: 256px;

    @media (min-width: 768px) {
        height: 220px;
    }

    @media (min-width: 1024px) {
        height: 220px;
    }

    .recharts-cartesian-axis-ticks {
        font-size: 0.7rem;
    }

    .recharts-legend-item-text {
        font-size: 0.9rem;
    }
`

const CasesChart = ({ chartData }) => {
    return(
        <Styles>
            <ResponsiveContainer>
                <AreaChart
                    data={chartData}
                    margin={{
                        top: 10, right: 20, left: 10, bottom: 0,
                    }}
                >
                    <XAxis dataKey="day" />
                    <YAxis
                        type="number"
                        tickCount={2}
                        tickSize={6}
                        mirror={true}
                        domain={[0, 'dataMax']} />
                    <Tooltip />
                    <Legend />
                    <Area type="monotone" dataKey="confirmed" stackId="1" stroke="#ff073a" fill="rgba(255,7,58,0.1)" />
                    <Area type="monotone" dataKey="recovered" stackId="2" stroke="#28a745" fill="rgba(40,167,69,0.1)" />
                    <Area type="monotone" dataKey="dead" stackId="3" stroke="rgb(63, 59, 59)" fill="grey" />
                </AreaChart>
            </ResponsiveContainer>
        </Styles>
    );
};

export default CasesChart;
