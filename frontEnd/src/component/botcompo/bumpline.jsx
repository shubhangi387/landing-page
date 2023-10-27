

import { ResponsiveBump } from '@nivo/bump';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';


export default function Bump(){
    const [feeddata,setFeed] = useState([])
    useEffect(()=>{
        fetch("http://localhost:500/feedAPI")
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
    })

  const data = [
    {
      "id": 'suggetion',
      "data": sudata1.map((value,index)=>({
        "x": index+1,"y": value
      })),
      "color": '#DAFFFB',
    },
    {
      "id": 'Something Wrong',
      "data": sudata2.map((value,index)=>({
        "x": index+1,"y": value
      })),
      "color": '#64CCC5',
    },
    {
      "id": 'Compliment',
      "data": sudata3.map((value,index)=>({
        "x": index+1,"y": value
      })),
      "color": '#176B87',
    },
  ];
    return(
        <div className='lines'>
        <ResponsiveBump
        data={data}
        colors={{ scheme: 'spectral' }}
        lineWidth={3}
        activeLineWidth={6}
        inactiveLineWidth={3}
        inactiveOpacity={0.15}
        pointSize={10}
        activePointSize={16}
        inactivePointSize={0}
        pointColor={{ theme: 'background' }}
        pointBorderWidth={3}
        activePointBorderWidth={3}
        pointBorderColor={{ from: 'serie.color' }}
        axisTop={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: '',
            legendPosition: 'middle',
            legendOffset: -36
        }}
        axisBottom={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: '',
            legendPosition: 'middle',
            legendOffset: 32
        }}
        axisLeft={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'ranking',
            legendPosition: 'middle',
            legendOffset: -40
        }}
        margin={{ top: 40, right: 100, bottom: 40, left: 60 }}
        axisRight={null}
    />
    </div>
    )
}
