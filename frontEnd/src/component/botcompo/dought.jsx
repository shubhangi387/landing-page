import React from 'react';
import { ResponsivePie } from '@nivo/pie';



const MyPieChart = (props) => {
  let rating = props.feed * 5;
  let unrating = (((rating - props.feedrate) / rating) *100).toFixed(2);
  let rate =  (props.feedrate / rating *100).toFixed(2);
    let data =  props.name !== "feedCat" ? [
        {
          id: props.name === "badgood" ? "Bad Responce" : props.name === "wrongAnswers" ? "BadResponse" : "UnRated",
          value: props.name === "badgood" ? props.bad : props.name === "wrongAnswers" ?   props.baddata : unrating,
          label: props.name === "badgood" ? "Bad Rating" :  props.name === "wrongAnswers" ? "BadResponse" : "UnRated",
          color: 'hsl(295, 70%, 50%)',
        },
        {
          id: props.name === "badgood" ?  'Good Response' :  props.name === "wrongAnswers" ? "WrongAns" : "All Rating",
          value: props.name === "badgood" ? props.good : props.name === "wrongAnswers" ? props.wrong : rate,
          label: props.name === "badgood" ?  'Good Rating' : props.name === "wrongAnswers" ? "WrongAns" : "All Rating",
          color: 'hsl(149, 70%, 50%)',
        }
        // ... other data points
      ] : [
        {
          id:  "Suggetion",
          value: props.sugg,
          label:"Suggetion",
          color: 'hsl(295, 70%, 50%)',
        },
        {
          id:  "Compliment",
          value: props.compliment,
          label:"Compliment",
          color: 'hsl(295, 70%, 50%)',
        },
        {
          id:  "Something Wrong",
          value: props.something,
          label:"Compliment",
          color: 'hsl(295, 70%, 50%)',
        }
      ];
    const colors1 = ["#DAFFFB","#64CCC5","#176B87"];
    const colors = ["#FD8D14","#071952","#C70039"];
  return (
    <div style={{ height: '6em' ,margin:".1em"}} className='doughnutStyler'>
      <ResponsivePie
        data={data}
        enableArcLinkLabels={false} // Disable arc labels
        margin={{ top: 10, right: 120, bottom: 20, left: 5 }}
        // eslint-disable-next-line no-sequences
        colors={colors}
        innerRadius={.3}
        padAngle={0.5}
        cornerRadius={3}
        activeOuterRadiusOffset={8}
        arcLabelsTextColor="#ffffff"
        tooltip={(tooltipProps) => {
            return (
              <div style={{ background: 'white',fontSize:".5em" , width: "5em" , padding: '.4em' }}>
                <strong>{tooltipProps.datum.id}</strong> - {tooltipProps.datum.value +"%"}
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
          legends={[
            {
                anchor: 'right',
                direction: 'column',
                justify: false,
                translateX: 117,
                translateY: 0,
                itemsSpacing: 2,
                itemWidth: 107,
                itemHeight: 20,
                itemTextColor: '#071952',
                itemDirection: 'left-to-right',
                itemOpacity: 1,
                symbolSize: 10,
                symbolShape: 'circle',
                effects: [
                    {
                        on: 'hover',
                        style: {
                            itemTextColor: '#fff'
                        }
                    }
                ],
        
            }]}
      />
    </div>
  );
};

export default MyPieChart;
