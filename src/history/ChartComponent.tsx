import * as React from "react";
import { CartesianGrid, Legend, Line, LineChart, XAxis, YAxis } from "recharts";
import { pure } from "recompose";

const data = [
  { date: '0', price: 1 },
  { date: '1', price: 2 },
  { date: '2', price: 4 },
  { date: '3', price: 8 },
  { date: '4', price: 12 },
  { date: '5', price: 16 },
];

export default pure(function Chart() {
  return (
    <div>
      <LineChart width={500} height={300} data={data} margin={{top: 15, left: 15}}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Line type="monotone" dataKey="price" stroke="#8884d8" />
        <Legend />
      </LineChart>
    </div>
  );
});

