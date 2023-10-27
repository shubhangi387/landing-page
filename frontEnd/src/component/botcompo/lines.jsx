import { ResponsiveLine } from "@nivo/line";
import React from "react";

export default function Lines() {
  const chartData = [
    {
      id: "Series 1",
      data: [
        { x: 1, y: 10 },
        { x: 21, y: 15 },
        { x: 202, y: 8 },
        { x: 301, y: 11 },
        { x: 900, y: 12 },
      ],
    },
    {
      id: "Series 2",
      data: [
        { x: 1, y: 5 }, // Change x: 200 to x: 2000
        { x: 10, y: 7 },
        { x: 202, y: 12 },
        { x: 403, y: 9 },
        { x: 804, y: 15 },
      ],
    },
    // Add more series as needed
  ];

  const xTickValues = chartData[0].data.map(data => data.x);
  const colors = ["#071952","#FD8D14"];
  return (
    <div className="lines">
      <ResponsiveLine
        data={chartData}
        margin={{ top: 20, right: 20, bottom: 60, left: 40 }}
        xScale={{ type: 'linear' }}
        yScale={{ type: 'linear', min: 'auto', max: 'auto' }}
        curve="monotoneX"
        colors={colors}
        enableGridX={false}
        enableGridY={false}
        enablePoints={true}
        enableSlices="x"
        animate={true}
        motionStiffness={120}
        motionDamping={50}
        enableArea={true}
        useMesh={true}
        areaBaselineValue={5}
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          // legend: 'Year', // x-axis label
          legendPosition: 'middle',
          legendOffset: 36,
          // tickValues: xTickValues, // Use defined tick values
        }}  
        tooltip={(tooltipProps) => {
          return (
            <div style={{ background: 'black',fontSize:".5em",height:".1em" , width: "5em" , padding: '.4em' }}>
              <strong>{tooltipProps.point.id}</strong> - {tooltipProps.point.data.y}
            </div>
          );
        }}
        theme={{
          axis: {
            ticks: {
              text: {
                fill: '#146C94', // Change this to your desired axis text color
              },
            },
          },
        }}
      />
    </div>
  );
}
