import { ResponsiveBar } from "@nivo/bar"
import { useState } from "react";
import { useEffect } from "react";


export const Bar = (props) =>{
    const [studentData,setStudent] = useState([]);
    const [badData,setBad] = useState([]);
    const [goodData,setGood] = useState([]);
    const [feedData,setFeed] = useState([]);
    useEffect(()=>{
        // fetch("http://localhost:500/studentAPI")
        fetch("/studentAPI")
        .then(response => response.json())
        .then(data => setStudent(data))
    },[]);
    useEffect(()=>{
            fetch("/badAPI")
            .then(response => response.json())
            .then(data => setBad(data))
    },[]);
    useEffect(()=>{
        fetch("/goodAPI")
        .then(response => response.json())
        .then(data => setGood(data))
    },[]);
    useEffect(()=>{
        fetch("/feedAPI")
        .then(response => response.json())
        .then(data => setFeed(data))
    },[]);
    const data = [
        {
          "label": "Students",
          "units": studentData.length
        },
        {
          "label": "FeedBack",
          "units": feedData.length
        },
        {
          "label": "UnSatisfied Customer",
          "units": badData.length
        },
        {
          "label": "Satisfied Students",
          "units": goodData.length
        },
        {
          "label": "Wrong Answers",
          "units": props.wrong
        }
      ];
    return(
        <>
        <div className="lines">
        <ResponsiveBar
        data={data}
        keys={[
            'units'
        ]}
        indexBy="label"
        margin={{ top: 30, right: 30, bottom: 10, left: 40 }}
        padding={0.3}
        valueScale={{ type: 'linear' }}
        indexScale={{ type: 'band', round: true }}
        colors={
            // "#19A7CE"
            "#071952"
        }
        defs={[
            {
                id: 'dots',
                type: 'patternDots',
                background: 'inherit',
                color: '#071952',
                size: 4,
                padding: 1,
                stagger: true
            },
            {
                id: 'lines',
                type: 'patternLines',
                background: 'inherit',
                color: '#071952',
                rotation: -45,
                lineWidth: 6,
                spacing: 10
            }
        ]}
        fill={[
            {
                match: {
                    id: 'fries'
                },
                id: 'dots'
            },
            {
                match: {
                    id: 'sandwich'
                },
                id: 'lines'
            }
        ]}
        borderColor={{
            from: 'color',
            modifiers: [
                [
                    'darker',
                    1.6
                ]
            ]
        }}
        axisTop={null}
        axisRight={null}
        axisBottom={null}
        axisLeft={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legendPosition: 'middle',
            legendOffset: -40
        }}
        enableGridX={false}
        enableGridY={false}
        labelSkipWidth={12}
        labelSkipHeight={12}
        borderRadius={10}
        tooltip={(tooltipProps) => {
            return (
              <div style={{ background: 'white',fontSize:".5em",height:"5em" , width: "10em" , padding: '.4em' }}>
                <strong>{tooltipProps.data.label}</strong> - {tooltipProps.data.units}
              </div>
            );
          }}
        labelTextColor={{
            from: 'color',
            modifiers: [
                [
                    'brighter',
                    6
                ]
            ]
        }}
        legends={[
            {
                dataFrom: 'keys',
                anchor: 'bottom-right',
                direction: 'column',
                justify: false,
                translateX: 120,
                translateY: 0,
                itemsSpacing: 2,
                itemWidth: 90,
                itemHeight: 20,
                itemDirection: 'left-to-right',
                itemOpacity: 0.85,
                symbolSize: 20,
                effects: [
                    {
                        on: 'hover',
                        style: {
                            itemOpacity: 1
                        }
                    }
                ]
            }
        ]}
        role="application"
        ariaLabel="OverAl Performance"
        barAriaLabel={e=>e.id+": "+e.formattedValue+" in country: "+e.indexValue}
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
        
    </>
    )
}
