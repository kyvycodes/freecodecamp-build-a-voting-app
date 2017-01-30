import React from 'react';
import {BarChart, Bar, Cell, Legend, Tooltip, XAxis, YAxis, CartesianGrid} from 'recharts';

const colors = [
  '#3366CC',
  '#DC3912',
  '#FF9900',
  '#109618',
  '#990099',
  '#3B3EAC',
  '#0099C6',
  '#DD4477',
  '#66AA00',
  '#B82E2E',
  '#316395',
  '#994499',
  '#22AA99',
  '#AAAA11',
  '#6633CC',
  '#E67300',
  '#8B0707',
  '#329262',
  '#5574A6',
  '#3B3EAC'
];
export default props => {
    let data = props.poll.options.map(opt => {
        return {
            name: opt.name,
            votes: +opt.votes_count + 10
        };
    })
    let width = props.maxWidth > 720 ? 600 : props.maxWidth - 120;
    width = width > 300 ? width : 300;
    let height = width > 400 ? 300 : 200;
    console.log("Max", width, height, props);
    return (
      <div className="card mb-3" style={{minWidth: width + 'px'}}>
		<div className="card-block">
      <BarChart width={width} height={height} data={data}
            margin={{top: 5, right: 30, left: 20, bottom: 5}}>
       <XAxis dataKey="name"/>
       <YAxis/>
       <CartesianGrid strokeDasharray="3 3"/>
       <Tooltip/>
       
       <Bar dataKey="votes" name="Votes" fill="#8884d8">
        {
            data.map((entry, index) => (
                <Cell cursor="pointer" fill={colors[index % colors.length]} key={`cell-${index}`}/>
            ))
        } </Bar>
        <Legend />
      </BarChart>
      </div></div>
    );
};
