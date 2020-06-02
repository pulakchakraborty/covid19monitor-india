import React from 'react';
import {
  LineChart,
  Line,
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

const DailyChart = ({ chartData }) => {
  return (
    <Styles>
      <ResponsiveContainer>
        <LineChart
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
          <Line
            name="New Cases"
            type="monotone"
            dot={false}
            dataKey="newCases"
            stackId="1"
            stroke="#d14f69"
          />
          <Line
            name="New Recoveries"
            type="monotone"
            dot={false}
            dataKey="newRecoveries"
            stackId="2"
            stroke="#108d90"
          />
          <Line
            name="New Deaths"
            type="monotone"
            dot={false}
            dataKey="newDeaths"
            stackId="3"
            stroke="rgb(63, 59, 59)"
          />
        </LineChart>
      </ResponsiveContainer>
    </Styles>
  );
};

export default DailyChart;
