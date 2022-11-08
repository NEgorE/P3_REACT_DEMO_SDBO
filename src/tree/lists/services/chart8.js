import React, { useEffect, useState } from "react";
import { subscriberFilter1 } from '../../../MessageService.js';
import { scaleOrdinal } from 'd3-scale';
import { schemeCategory10 } from 'd3-scale-chromatic';

import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell  } from 'recharts';

export const Chart8 = (props) => {

    const colors = scaleOrdinal(schemeCategory10).range();

    const data = [
        { x: 100, y: 200, z: 200 },
        { x: 120, y: 100, z: 260 },
        { x: 170, y: 300, z: 400 },
        { x: 140, y: 250, z: 280 },
        { x: 150, y: 400, z: 500 },
        { x: 110, y: 280, z: 200 },
      ];

    const log_prefix = 'CHART8: '

    const currFilter1 = subscriberFilter1._value

    const RADIAN = Math.PI / 180;
    const CustomizedLabelChart8 = (props) => {

        const { cx, cy, midAngle, innerRadius, outerRadius, percent, index, value } = props
        const radius = innerRadius + (outerRadius - innerRadius) * 0.7;
        const x = cx + radius * Math.cos(-midAngle * RADIAN) + 7;
        const y = cy + radius * Math.sin(-midAngle * RADIAN);

        return (
            <text x={x} y={y} fill="white" textAnchor={'middle'} dominantBaseline="central">
                {`${value} (${(percent * 100).toFixed(1)}%)`}
            </text>
        );
    };

    const [chart8, setChart8] = useState(false)
    const [chart8data, setchart8data] = useState(false)

    useEffect(() => {
        console.log(log_prefix + 'load data during first render');
        getChart8Data();
    }, [])

    useEffect(() => {
        if(chart8data){
            generateChart8(data);
        }
    }, [chart8data])

    useEffect(() => {
        getChart8Data();
    }, [currFilter1])

    function getChart8Data() {
        let result = false;
        const resultArr = [];
        if ( currFilter1.length <= 0 ) {
            fetch(`http://localhost:3001/select_services_count_by_system/filter1=`)
            .then(response => {
                return response.text();
            })
            .then(data => {
                result = JSON.parse(data);
                for (let i = 0; i < result.length; i++) {
                    const currentResult = result[i]
                    let result2 = {};
                    result2.sys_type = currentResult.sys_type
                    result2.size = parseInt(currentResult.size)
                    result2.color = currentResult.color
                    result2.date_year_month = currentResult.date_year_month
                    resultArr.push(result2)
                }
                setchart8data(resultArr);
            });
        }
        else {
            const query = `http://localhost:3001/select_services_count_by_system/filter1=${currFilter1}`
            fetch(query)
            .then(response => {
                return response.text();
            })
            .then(data => {
                result = JSON.parse(data);
                for (let i = 0; i < result.length; i++) {
                    const currentResult = result[i]
                    let result2 = {};
                    result2.sys_type = currentResult.sys_type
                    result2.size = parseInt(currentResult.size)
                    result2.color = currentResult.color
                    result2.date_year_month = currentResult.date_year_month
                    resultArr.push(result2)
                }
                setchart8data(resultArr);
            });
        }
    }

    function generateChart8(data) {
        const title_period = data.map(item => item.date_year_month)[0];
        const element = [
            <div class='row mh-10'>
                <p class='chart-title '>Unique uses of services by systems for {title_period}</p>
            </div>, 
            <div class='row mh-90'>
                <ResponsiveContainer width={'100%'} height={'100%'}>
                    <ScatterChart
                        margin={{
                            top: 5,
                            right: 30,
                            left: 10,
                            bottom: 5,
                            }}
                        >
                        <CartesianGrid />
                        <XAxis type="number" dataKey="x" name="stature" unit="cm" />
                        <YAxis type="number" dataKey="y" name="weight" unit="kg" />
                        <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                        <Scatter name="A school" data={data} fill="#8884d8">
                            {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                            ))}
                        </Scatter>
                    </ScatterChart>
                </ResponsiveContainer>         
            </div> 
        ]; 
        setChart8(element);
    }

    return (
        chart8 ? chart8 : 'Smth wrong'
    )
}