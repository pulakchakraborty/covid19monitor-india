import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
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

const InfectionsChart = ({ chartData }) => {
  return (
    <Styles>
      <ResponsiveContainer>
        <BarChart
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
          <Bar
            name="New Cases"
            dataKey="newCases"
            fill="#d14f69"
            stroke="rgba(209,79,105,0.2)"
          />
        </BarChart>
      </ResponsiveContainer>
    </Styles>
  );
};

export default InfectionsChart;
