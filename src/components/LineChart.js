import React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';


const LineChartComponent = (props) => {
    const data = [
        {
          name: 'Page A',
          pv: 2400,
          
        },
        {
          name: 'Page B',
          
          pv: 1398,
          
        },
        {
          name: 'Page C',
          
          pv: 9800,
          
        },
        {
          name: 'Page D',
          
          pv: 3908,
          
        },
        {
          name: 'Page E',
          
          pv: 4800,
          
        },
        {
          name: 'Page F',
          
          pv: 3800,
          
        },
        {
          name: 'Page G',
          
          pv: 4300,
         
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
            <Line type="monotone" dataKey="pv" stroke="#8884d8" activeDot={{ r: 8 }} />
            {/* <Line type="monotone" dataKey="uv" stroke="#82ca9d" /> */}
          </LineChart>
        </ResponsiveContainer>
      );
}

export default LineChartComponent;