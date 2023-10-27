import { ResponsiveRadar } from '@nivo/radar'
import React from 'react'

export default function Radar(){
    const data =[
        {
          "taste": "fruity",
          "chardonay": 28,
          "carmenere": 87,
          "syrah": 88
        },
        {
          "taste": "bitter",
          "chardonay": 68,
          "carmenere": 22,
          "syrah": 38
        },
        {
          "taste": "heavy",
          "chardonay": 25,
          "carmenere": 32,
          "syrah": 94
        },
        {
          "taste": "strong",
          "chardonay": 107,
          "carmenere": 44,
          "syrah": 52
        },
        {
          "taste": "sunny",
          "chardonay": 93,
          "carmenere": 23,
          "syrah": 65
        }
      ];
    return(
        <div style={{height:"50em",width:"50em" }}>
            <ResponsiveRadar
                data={data}
                keys={[ 'chardonay', 'carmenere', 'syrah' ]}
                indexBy="taste"
                valueFormat=">-.2f"
                margin={{ top: 70, right: 80, bottom: 40, left: 80 }}
                curve="catmullRomClosed"
                borderWidth={1}
                borderColor={{ from: 'color', modifiers: [] }}
                gridLevels={12}
                gridLabelOffset={10}
                dotSize={4}
                dotColor="#714141"
                dotBorderWidth={2}
                dotLabel="value"
                dotLabelYOffset={-16}
                colors={['#FF5733', '#33FF57', '#3357FF']} // Replace with suitable colors
                fillOpacity={1}
                blendMode="multiply"
                motionConfig="wobbly"
                legends={[
                    {
                        anchor: 'top-left',
                        direction: 'column',
                        translateX: -50,
                        translateY: -40,
                        itemWidth: 80,
                        itemHeight: 20,
                        itemTextColor: '#999',
                        symbolSize: 12,
                        symbolShape: 'circle',
                        effects: [
                            {
                                on: 'hover',
                                style: {
                                    itemTextColor: '#000'
                                }
                            }
                        ]
                    }
                ]}
            />
        </div>
        )
}