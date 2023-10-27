import { ResponsiveLine } from '@nivo/line'
import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.
export default function FeedLine(props) {
  // Wrong answers
  const [wrongDataSet,setWrong] = useState([]);
  useEffect(()=>{
    fetch("https://sodd-dash-board.vercel.app/wrongAPI")
    .then(response => response.json())
    .then(data => setWrong(data))
  },[]);

  // console.log(average);
  // Bad Responces data
  const [badData,setBad] = useState([]);
  useEffect(()=>{
    fetch("https://sodd-dash-board.vercel.app/badAPI")  
    .then(response => response.json())
    .then(data => setBad(data))
  },[]);
  // console.log(badData);
  // Feedback
    const [feeddata,setFeed] = useState([])
    useEffect(()=>{
        fetch("https://sodd-dash-board.vercel.app/feedAPI")
        .then(response => response.json())
        .then(data => setFeed(data))
    },[]);
    let sudata1 = [];
    let sudata2 = [];
    let sudata3 = [];
    feeddata.forEach((data)=>{
        // dataFeed.push({"x":index, "y":data.Rating});
        if(data.Catagory === "Suggestion"){
            sudata1.push(data.Rating)
        } else if(data.Catagory === "Something Is Not Quite Right"){
            sudata2.push(data.Rating)
        } else{
            sudata3.push(data.Rating)
        }
    });

    const Wrongdata = [
      {
        "id": 'Wrong Prediction',
        "data": wrongDataSet.map((value,index)=>({
          "x": index,"y": value.accuracy
        })),
        "color": '#DAFFFB',
      },
      {
        "id": 'Average',
        "data": wrongDataSet.map((value,index)=>({
          "x": index,"y": .2
        })),
        "color": '#64CCC5',
      },
    ];
     const data = [
    {
      "id": 'suggetion',
      "data": sudata1.map((value,index)=>({
        "x": index,"y": value
      })),
      "color": '#DAFFFB',
    },
    {
      "id": 'Something Wrong',
      "data": sudata2.map((value,index)=>({
        "x": index,"y": value
      })),
      "color": '#64CCC5',
    },
    {
      "id": 'Compliment',
      "data": sudata3.map((value,index)=>({
        "x": index,"y": value
      })),
      "color": '#176B87',
    },
  ];
  const colors = ["#C70039","#F94C10","#F8DE22"];
     var show =  (props.name ==="wrong");
return (
  <div className="lines">
    <ResponsiveLine
      data={props.name ==="wrong" ? Wrongdata :  data}
      colors={colors}
      margin={{ top: 20, right: 20, bottom: 50, left: 40 }}
      xScale={{ type: 'linear' }}
      yScale={{ type: 'linear', min: 'auto', max: 'auto' }}
      curve=  {props.name ==="wrong" ? "linear" : "monotoneX"}
      enableGridX={false}
      enableGridY={false}
      enablePoints={true}
      enableSlices="x"
      animate={true}
      enableLegends={false}
      motionStiffness={120}
      motionDamping={50}
      // enableArea={props.name ==="wrong" ?false :true}
      areaBaselineValue={1}
      axisBottom={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: show ? "Wrong Average":"FeedBacks",
        legendPosition: 'middle',
        legendOffset: 36,
        color:"#146C94"
        // tickValues: xTickValues, // Use defined tick values
      }}
      tooltip={(tooltipProps) => {
        return (
          <div style={{ background: 'black',fontSize:".5em",height:".2em" , width: "1em" , padding: '.4em' }}>
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
