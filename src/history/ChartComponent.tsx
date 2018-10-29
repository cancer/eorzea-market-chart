import * as React from "react";
import { CartesianGrid, Legend, Line, LineChart, XAxis, YAxis } from "recharts";
import { pure } from "recompose";
import { PriceHistory } from "./reducers";

interface Props {
  data: PriceHistory[];
}

export default pure(function Chart({ data }: Props) {
  return (
    <div>
      <LineChart width={500} height={300} data={data} margin={{top: 15, left: 15}}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="label" />
        <YAxis />
        <Line type="monotone" dataKey="lower" stroke="#8884d8" />
        <Line type="monotone" dataKey="average" stroke="#8884d8" />
        <Legend />
      </LineChart>
    </div>
  );
});

