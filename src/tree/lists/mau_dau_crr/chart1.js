import React, { useEffect, useState } from "react";
import { subscriberMetric1 , subscriberFilter1 } from '../../../MessageService.js';
import { METRICS } from '../../components/constants';

import { Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell  } from 'recharts';

export const Chart1 = (props) => {

    const log_prefix = 'CHART1: '

    const currMetric = subscriberMetric1._value
    const currFilter1 = subscriberFilter1._value

    const RADIAN = Math.PI / 180;
    const CustomizedLabelChart1 = (props) => {
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

    const [chart1, setChart1] = useState(false)
    const [chart1data, setchart1data] = useState(false)

    useEffect(() => {
        console.log(log_prefix + 'load data during first render');
        getChart1Data();
    }, [])

    useEffect(() => {
        if(chart1data){
            generateChart1(chart1data, METRICS, currMetric);
        }
    }, [chart1data])

    useEffect(() => {
        getChart1Data();
    }, [currFilter1, currMetric])

    function getChart1Data() {
        let result = false;
        const resultArr = [];
        if ( currFilter1.length <= 0 ) {
            fetch(`http://localhost:3001/select_mau_by_system`)
            .then(response => {
                return response.text();
            })
            .then(data => {
                result = JSON.parse(data);
                for (let i = 0; i < result.length; i++) {
                    const currentResult = result[i]
                    let result2 = {};
                    result2.sys_type = currentResult.sys_type
                    result2.mau = parseInt(currentResult.mau)
                    result2.dau = parseInt(currentResult.dau)
                    result2.color = currentResult.color
                    result2.date_year_month = currentResult.date_year_month
                    resultArr.push(result2)
                }
                setchart1data(resultArr);
            });
        }
        else {
            const query = `http://localhost:3001/select_mau_by_system_by_filters/filter1=${currFilter1}`
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
                    result2.mau = parseInt(currentResult.mau)
                    result2.dau = parseInt(currentResult.dau)
                    result2.color = currentResult.color
                    result2.date_year_month = currentResult.date_year_month
                    resultArr.push(result2)
                }
                setchart1data(resultArr);
            });
        }
    }

    function generateChart1(data, METRICS, currMetric) {
        const use_metric = METRICS.filter(item => item.npp === currMetric).map(item => item.value)[0]
        const title_metric = use_metric.toUpperCase();
        const title_period = data.map(item => item.date_year_month)[0];
        console.log(data)
        const element = [
            <div class='row mh-10'>
                <p class='chart-title '>{title_metric} for {title_period}</p>
            </div>, 
            <div class='row mh-90'>
                <ResponsiveContainer width={'100%'} height={'100%'}>
                    <PieChart>
                        <Pie
                        data={data}
                        color="#000000"
                        dataKey={`${use_metric}`}
                        nameKey="sys_type"
                        cx="50%"
                        cy="100%"
                        outerRadius={'200%'}
                        fill="#8884d8"
                        labelLine={false}
                        label={CustomizedLabelChart1}
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
        setChart1(element);
    }

    return (
        chart1 ? chart1 : 'Smth wrong'
    )
}