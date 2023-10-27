import { ResponsiveLine } from '@nivo/line'
import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.
export default function Rich() {
    const [richData,setRich] = useState([])
    useEffect(()=>{
        fetch("https://sodd-dash-board.vercel.app/WebrichAPI")
        .then(response => response.json())
        .then(data => setRich(data))
    },[]);
    let sudata1 = [];
    let custuomeTickValues = [];
    richData.forEach(data => {sudata1.push({no:data.no,date:data.date});custuomeTickValues.push(data.date)});

     const data = [
    {
      "id": 'suggetion',
      "data": sudata1.map((value,index)=>({
        "x": index,"y": value.no,'date': value.date,
      })),
      "color": '#DAFFFB',
    }
  ];

      const colors = ["#7e4300","#64CCC5","#176B87"];
return (
  <div className="ssevent_Lines">
    <ResponsiveLine
      data={data}
      colors={colors}
      margin={{ top: 20, right: 20, bottom: 50, left: 40 }}
      xScale={{ type: 'linear' }}
      yScale={{ type: 'linear', min: 0, max: 'auto' }}
      curve="monotoneX"
      enableGridX={false}
      enableGridY={false}
      enablePoints={true}
      enableSlices="x"
      animate={true}
      enableLegends={false}
      motionStiffness={120}
      motionDamping={50}
      enableArea= {true}
      areaBaselineValue={0}
      axisBottom={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        tickValues: custuomeTickValues.map(date => custuomeTickValues.indexOf(date)), // Convert dates to indices
        tickFormat: index => custuomeTickValues[index],
        legend:  "Rich of person per day",
        legendPosition: 'middle',
        legendOffset: 36,
        color: "#fff",
        color:"#146C94"
        // tickValues: xTickValues, // Use defined tick values
      }}
      tooltip={(tooltipProps) => {
        return (
          <div style={{ background: 'black',fontSize:".5em",height:".2em" , width: "1em" , padding: '.4em' }}>
            <strong>{tooltipProps.point.data.y}</strong> - {tooltipProps.point.date}
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
