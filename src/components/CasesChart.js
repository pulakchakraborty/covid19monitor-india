import React from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
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
`;

const CasesChart = ({ chartData }) => {
  return (
    <Styles>
      <ResponsiveContainer>
        <AreaChart
          data={chartData}
          margin={{
            top: 10,
            right: 20,
            left: 10,
            bottom: 0,
          }}>
          <XAxis dataKey="day" />
          <YAxis
            type="number"
            tickSize={6}
            mirror={true}
            domain={[0, 'dataMax']}
          />
          <Tooltip />
          <Legend />
          <Area
            name="Confirmed"
            type="monotone"
            dataKey="confirmed"
            stackId="1"
            stroke="#d14f69"
            fill="rgba(209,79,105,0.2)"
          />
          <Area
            name="Recovered"
            type="monotone"
            dataKey="recovered"
            stackId="2"
            stroke="#108d90"
            fill="rgba(129,255,202,0.3)"
          />
          <Area
            name="Dead"
            type="monotone"
            dataKey="dead"
            stackId="3"
            stroke="rgb(63, 59, 59)"
            fill="grey"
          />
        </AreaChart>
      </ResponsiveContainer>
    </Styles>
  );
};

export default CasesChart;
