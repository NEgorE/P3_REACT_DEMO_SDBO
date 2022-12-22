import React, { useEffect, useState } from "react";
import { subscriberFilter1 } from '../../../MessageService.js';

import { Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell  } from 'recharts';

export const Chart11 = (props) => {

    const log_prefix = 'CHART11: '

    const currFilter1 = subscriberFilter1._value

    const RADIAN = Math.PI / 180;
    const CustomizedLabelChart11 = (props) => {

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

    const [chart11, setChart11] = useState(false)
    const [chart11data, setchart11data] = useState(false)

    useEffect(() => {
        getChart11Data();
    }, [])

    useEffect(() => {
        if(chart11data){
            generateChart11(chart11data);
        }
    }, [chart11data])

    useEffect(() => {
        getChart11Data();
    }, [currFilter1])

    function getChart11Data() {
        let result = false;
        const resultArr = [];
        if ( currFilter1.length <= 0 ) {
            fetch(`http://localhost:3001/select_session_chart11/filter1=`)
            .then(response => {
                return response.text();
            })
            .then(data => {
                result = JSON.parse(data);
                for (let i = 0; i < result.length; i++) {
                    const currentResult = result[i]
                    let result2 = {};
                    result2.sys_type = currentResult.sys_type
                    result2.count = parseInt(currentResult.count)
                    result2.color = currentResult.color
                    result2.date_year_month = currentResult.date_year_month
                    resultArr.push(result2)
                }
                setchart11data(resultArr);
            });
        }
        else {
            const query = `http://localhost:3001/select_session_chart11/filter1=${currFilter1}`
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
                    result2.count = parseInt(currentResult.count)
                    result2.color = currentResult.color
                    result2.date_year_month = currentResult.date_year_month
                    resultArr.push(result2)
                }
                setchart11data(resultArr);
            });
        }
    }

    function generateChart11(data) {
        const title_period = data.map(item => item.date_year_month)[0];
        const new_data = data.filter(item => item.date_year_month === title_period);
        const element = [
            <div class='row mh-10'>
                <p class='chart-title '>Count sessions by systems for {title_period}</p>
            </div>, 
            <div class='row mh-90'>
                <ResponsiveContainer width={'100%'} height={'100%'}>
                    <PieChart>
                        <Pie
                        data={new_data}
                        color="#000000"
                        dataKey={`count`}
                        nameKey="sys_type"
                        cx="50%"
                        cy="100%"
                        outerRadius={'200%'}
                        fill="#8884d8"
                        labelLine={false}
                        label={CustomizedLabelChart11}
                        startAngle={180}
                        endAngle={0}
                        //isAnimationActive={false}
                        >
                            {data.map((item, index) => (
                                <Cell
                                    key={`cell-${index}`}
                                    fill={item.color}
                                />
                            ))}
                        </Pie>
                        <Legend verticalAlign="top"/>
                        <Tooltip />
                        </PieChart>
                </ResponsiveContainer>         
            </div> 
        ]; 
        setChart11(element);
    }

    return (
        chart11 ? chart11 : 'Smth wrong'
    )
}