import * as React from "react";
import { CartesianGrid, Legend, Line, LineChart, XAxis, YAxis } from "recharts";
import { pure } from "recompose";
import { Point } from "./reducers";

interface Props {
  data: Point[];
}

export default pure(function Chart({ data }: Props) {
  return (
    <div>
      <LineChart width={1200} height={800} data={data} margin={{top: 15, left: 15, right: 15, bottom: 15}}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="label" stroke="#fff" />
        <YAxis stroke="#fff" />
        <Line type="linear" dataKey="lower" stroke="#35f6ff" />
        <Line type="linear" dataKey="average" stroke="#ff25a8" />
        <Legend />
      </LineChart>
    </div>
  );
});

