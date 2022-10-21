import React, { useEffect, useState } from "react";
import { subscriberMetric1 , subscriberFilter1 } from '../../../MessageService.js';
import { Chart4 } from './chart4.js';

import { LineChart, BarChart, Line, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Brush, ResponsiveContainer, LabelList, PieChart, Pie, Cell, Label  } from 'recharts';


import "bootstrap/dist/css/bootstrap.min.css";
import "./mau_dau_crr.css";

export const Chart3 = () => {

    const log_prefix = 'CHART3: '

    const [chart3, setChart3] = useState(false)
    const [chart3data, setchart3data] = useState(false)

    useEffect(() => {
        console.log(log_prefix + 'load data during first render');
        getChart3Data();
    }, [])

    useEffect(() => {
        if(chart3data){
            generateChart3(chart3data, METRICS, currMetric);
        }
    }, [chart3data])

    function getChart3Data() {
        let result = false;
        fetch(`http://localhost:3001/select_mau_by_segment`)
          .then(response => {
            return response.text();
          })
          .then(data => {
            result = JSON.parse(data);
            setchart3data(result);
          });
    };

    function generateChart3(data, METRICS, currMetric) {
        const use_metric = METRICS.filter(item => item.npp === currMetric).map(item => item.value)[0]
        const title_metric = use_metric.toUpperCase();
        const new_data = [...data.filter(item => item.type === use_metric)]
        const dMin = 0;
        const element = [
            <div class='row mh-10'>
                <p class='chart-title '>{title_metric} segment concentration</p>
            </div>, 
            <div class='row mh-90'>
                <ResponsiveContainer width={'100%'} height={'100%'}>
                    <BarChart
                        data={new_data}
                        margin={{
                        top: 5,
                        right: 30,
                        left: 0,
                        bottom: 5,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date_year_month" angle={-25} interval={0} tickSize={11} height={40}/>
                        <YAxis domain={[dMin, (dMax) => (Math.round(dMax))]} type="number" interval={'preserveEnd'} unit='%'/>
                        <Tooltip />
                        <Legend verticalAlign="top" />
                        <Brush dataKey='date_year_month' height={10} />
                        <Bar dataKey="Mikro" stackId={"a"}  fill="#3a9058" unit={'%'} ><LabelList dataKey="Mikro" position="center" fill="#fff"/></Bar>
                        <Bar dataKey="Maliy" stackId={"a"}  fill="#301c89"  unit={'%'} ><LabelList dataKey="Maliy" position="center" fill="#fff"/></Bar>
                        <Bar dataKey="Sredniy" stackId={"a"}  fill="#cd6678"  unit={'%'} ><LabelList dataKey="Sredniy" position="center" fill="#fff"/></Bar>
                        <Bar dataKey="Krupniy" stackId={"a"}  fill="#decd78"  unit={'%'} ><LabelList dataKey="Krupniy" position="center"/></Bar>
                        <Bar dataKey="Krupneyshiy" stackId={"a"}  fill="#89cdef"  unit={'%'} ><LabelList dataKey="Krupneyshiy" position="center"/></Bar>
                    </BarChart>
                </ResponsiveContainer>       
            </div> 
        ];
        setChart3(element);
    }

    return (
        hart3 ? chart3 : 'Smth wrong'
    )
}