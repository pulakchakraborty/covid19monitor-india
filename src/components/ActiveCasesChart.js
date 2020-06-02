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

const ActiveCasesChart = ({ chartData }) => {
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
            name="Active Cases"
            type="monotone"
            dataKey="active"
            stroke="#007bff"
            fill="rgba(0,123,255,0.6)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </Styles>
  );
};

export default ActiveCasesChart;
