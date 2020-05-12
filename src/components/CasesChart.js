import React from 'react';
import {XYPlot, XAxis, YAxis, VerticalGridLines, HorizontalGridLines, LineSeries} from 'react-vis';

const CasesChart = ({ chartData }) => {
    //console.log("chart data: ", chartData);
    /*const dataArr = chartData.map((d)=> {
        return {x: d.day,
        y: parseFloat(d.summary.total/1000)}
    });*/
    const dataArr = chartData.map((data, index) => {
        return {x: index,
        y: data.summary.total}
    });

    const axisStyle = {
        line: {
            stroke: '#696969'
        },
        ticks: {
            fontSize: '0.6rem',
            fill: '#696969'
        },
        title: {
            fill: '#696969',
            fontSize: '0.8rem'
        }
      };

    console.log("data arr:",dataArr);

    return (
        <XYPlot width={400} height={200} >
            <VerticalGridLines />
            <HorizontalGridLines />
            <XAxis
                tickValues={[0, 30, 60]}
                tickFormat={v => chartData[v].day}
                tickSize={3}
                style={axisStyle} />
            <YAxis
                tickValues={dataArr.y}
                tickFormat={v => `${Math.round(v/1000)}K`}
                tickPadding={-30}
                tickSize={3}
                style={axisStyle} />
            <LineSeries
                data={dataArr}
                style={{stroke: 'red', strokeWidth: 1}} />
        </XYPlot>
    );
};

export default CasesChart;
