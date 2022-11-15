import React, { useEffect, useState } from "react";
import { subscriberMetric1 , subscriberFilter1 } from '../../../MessageService.js';
import { METRICS } from '../../components/constants';

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Brush, ResponsiveContainer } from 'recharts';

export const Chart2 = (props) => {

    const log_prefix = 'CHART2: '

    const currMetric = subscriberMetric1._value
    const currFilter1 = subscriberFilter1._value

    const CustomizedLabelChart2 = (props) => {
        const { x, y, value, index} = props;
        return (
            <text x={x} y={y-5} textAnchor="middle" value={value} id={`Chart2_index${index}`} >{value} </text>
        )
    };

    const [chart2, setChart2] = useState(false)
    const [chart2data, setchart2data] = useState(false)

    useEffect(() => {
        getChart2Data();
    }, [])

    useEffect(() => {
        if(chart2data){
            generateChart2(chart2data, METRICS, currMetric);
        }
    }, [chart2data])

    useEffect(() => {
        getChart2Data();
    }, [currFilter1, currMetric])
    
    function getChart2Data() {
        let result = false;
        if ( currFilter1.length <= 0 ) {
            fetch(`http://localhost:3001/select_mau`)
            .then(response => {
                return response.text();
            })
            .then(data => {
                result = JSON.parse(data);
                setchart2data(result);
            });
        }
        else {
            const query = `http://localhost:3001/select_mau_by_filters/filter1=${currFilter1}`
            fetch(query)
            .then(response => {
                return response.text();
            })
            .then(data => {
                result = JSON.parse(data);
                setchart2data(result);
            });
        }
    };

    function generateChart2(data , METRICS, currMetric) {
        const use_metric = METRICS.filter(item => item.npp === currMetric).map(item => item.value)[0];
        const title_metric = use_metric.toUpperCase();
        if(use_metric === 'mau') {
            var dMin = Math.round((Math.min(...data.map(o => o.mau)) - Math.min(...data.map(o => o.mau))*0.02)/100)*100;
            var dMax = Math.round((Math.max(...data.map(o => o.mau)) + Math.min(...data.map(o => o.mau))*0.02)/100)*100;
        }
        else {
            var dMin = Math.round((Math.min(...data.map(o => o.dau)) - Math.min(...data.map(o => o.dau))*0.02)/100)*100;
            var dMax = Math.round((Math.max(...data.map(o => o.dau)) + Math.min(...data.map(o => o.dau))*0.02)/100)*100;
        }
        const element = [
            <div class='row mh-10'>
                <p class='chart-title '>{title_metric} dynamic</p>
            </div>, 
            <div class='row mh-90'>
                <ResponsiveContainer width={'100%'} height={'100%'}>
                    <LineChart
                        data={data}
                        margin={{
                        top: 5,
                        right: 30,
                        left: 10,
                        bottom: 5,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date_year_month" angle={-25} interval={0} tickSize={11} height={40}/>
                        <YAxis domain={[dMin, dMax]} />
                        <Tooltip />
                        <Brush dataKey='date_year_month' height={10} />
                        <Line type="monotone" dataKey={`${use_metric}`} stroke="#4477aa" fill="#4477aa" strokeDasharray="10 5" strokeWidth={2} dot={{ r: 5 }} label={<CustomizedLabelChart2 />} />
                    </LineChart>
                </ResponsiveContainer>         
            </div> 
        ]; 
        setChart2(element);
    }

    return (
        chart2 ? chart2 : 'Smth wrong'
    )
}