import React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';


const LineChartComponent2 = (props) => {
  // console.log(props.data)
    const data = [
        {
          name: 'Day1',
          demand: props.data[0],
          
        },
        {
          name: 'Day2',
          
          demand: props.data[1],
          
        },
        {
          name: 'Day3',
          
          demand: props.data[2],
          
        },
        {
          name: 'Day4',
          
          demand: props.data[3],
          
        },
        {
          name: 'Day5',
          
          demand: props.data[4],
          
        },
        {
          name: 'Day6',
          
          demand: props.data[5],
          
        },
        {
          name: 'Day7',
          
          demand: props.data[6],
         
        },
        {
          name: 'Day8',
          
          demand: props.data[7],
          
        },
        {
          name: 'Day9',
          
          demand: props.data[8],
          
        },
        {
          name: 'Day10',
          
          demand: props.data[9],
          
        },
        {
            name: 'Next Day',
            
            demand: props.data[10],
            
          },


      ];
    return (
        <ResponsiveContainer width="90%" height="80%">
          <LineChart
            width={5}
            height={3}
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="demand" stroke="#8884d8" activeDot={{ r: 11 }} />
            {/* <Line type="monotone" dataKey="uv" stroke="#82ca9d" /> */}
          </LineChart>
        </ResponsiveContainer>
      );
}

export default LineChartComponent2;