import React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';


const LineChartComponent = (props) => {
  // console.log("hello", props.data);
    const data = [
        {
          name: 'Jan',
          demand: props.data[0],
          
        },
        {
          name: 'Feb',
          
          demand: props.data[1],
          
        },
        {
          name: 'Mar',
          
          demand: props.data[2],
          
        },
        {
          name: 'Apr',
          
          demand: props.data[3],
          
        },
        {
          name: 'May',
          
          demand: props.data[4],
          
        },
        {
          name: 'June',
          
          demand: props.data[5],
          
        },
        {
          name: 'July',
          
          demand: props.data[6],
         
        },
        {
          name: 'Aug',
          
          demand: props.data[7],
          
        },
        {
          name: 'Sep',
          
          demand: props.data[8],
          
        },
        {
          name: 'Oct',
          
          demand: props.data[9],
          
        },
        {
          name: 'Nov',
          
          demand: props.data[10],
          
        },
        {
          name: 'Dec',
          
          demand: props.data[11],
        }
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
            <Line type="monotone" dataKey="demand" stroke="#8884d8" />
            {/* <Line type="monotone" dataKey="uv" stroke="#82ca9d" /> */}
          </LineChart>
        </ResponsiveContainer>
      );
}

export default LineChartComponent;