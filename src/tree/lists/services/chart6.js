import React, { useEffect, useState } from "react";
import { subscriberFilter1 } from '../../../MessageService.js';

import { Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell  } from 'recharts';

export const Chart6 = (props) => {

    const log_prefix = 'CHART6: '

    const currFilter1 = subscriberFilter1._value

    const RADIAN = Math.PI / 180;
    const CustomizedLabelChart6 = (props) => {

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

    const [chart6, setChart6] = useState(false)
    const [chart6data, setchart6data] = useState(false)

    useEffect(() => {
        getChart6Data();
    }, [])

    useEffect(() => {
        if(chart6data){
            generateChart6(chart6data);
        }
    }, [chart6data])

    useEffect(() => {
        getChart6Data();
    }, [currFilter1])

    function getChart6Data() {
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
                setchart6data(resultArr);
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
                setchart6data(resultArr);
            });
        }
    }

    function generateChart6(data) {
        const title_period = data.map(item => item.date_year_month)[0];
        const new_data = data.filter(item => item.date_year_month === title_period);
        const element = [
            <div class='row mh-10'>
                <p class='chart-title '>Unique uses of services by systems for {title_period}</p>
            </div>, 
            <div class='row mh-90'>
                <ResponsiveContainer width={'100%'} height={'100%'}>
                    <PieChart>
                        <Pie
                        data={new_data}
                        color="#000000"
                        dataKey={`size`}
                        nameKey="sys_type"
                        cx="50%"
                        cy="100%"
                        outerRadius={'200%'}
                        fill="#8884d8"
                        labelLine={false}
                        label={CustomizedLabelChart6}
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
        setChart6(element);
    }

    return (
        chart6 ? chart6 : 'Smth wrong'
    )
}