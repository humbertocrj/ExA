import React, { PureComponent,useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import axios from 'axios'
import { floatToCurrency } from '../../utils/currency';

export default function RecursoPorTipoProjeto(props) {

 
 
    return (
  
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          width={500}
          height={300}
          data={props.data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="_id.ano"   tick={{fontSize:10}}/>
          <YAxis type="number"    tick={{fontSize:10}} tickFormatter={(value) => floatToCurrency(value)}/>
          <Tooltip formatter={(value) => floatToCurrency(value)}/>
          <Legend />
          <Line type="monotone"  dataKey="Total" strokeWidth={2} stroke={props.cor} activeDot={{ r: 8 }}  />
       
        </LineChart>
      </ResponsiveContainer>
    
    );
        }

