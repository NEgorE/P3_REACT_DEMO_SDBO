import React, { useEffect, useState } from "react";
import { subscriberFilter1 } from '../../../MessageService.js';

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Brush, ResponsiveContainer } from 'recharts';

export const Chart13 = (props) => {

    const log_prefix = 'CHART13: '

    const currFilter1 = subscriberFilter1._value

    const CustomizedLabelChart13 = (props) => {
        const { x, y, value, index} = props;
        if (index % 15 === 0){
            return (
                <text x={x} y={y-5} textAnchor="middle" value={value} id={`Chart2_index${index}`} >{value} </text>
            )
        } 
        else {
            return null;
        };
    };

    const [chart13, setChart13] = useState(false)
    const [chart13data, setchart13data] = useState(false)

    useEffect(() => {
        getChart13Data();
    }, [])

    useEffect(() => {
        if(chart13data){
            generateChart13(chart13data);
        }
    }, [chart13data])

    useEffect(() => {
        getChart13Data();
    }, [currFilter1])
    
    function getChart13Data() {
        let result = false;
        const resultArr = [];
        if ( currFilter1.length <= 0 ) {
            fetch(`http://localhost:3001/select_session_chart13/filter1=`)
            .then(response => {
                return response.text();
            })
            .then(data => {
                result = JSON.parse(data);
                for (let i = 0; i < result.length; i++) {
                    const currentResult = result[i]
                    let result2 = {};
                    result2.date_id = currentResult.date_id.substring(0,10);
                    result2.avg_duration_min = currentResult.avg_duration_min;
                    resultArr.push(result2)
                }
                setchart13data(resultArr);
            });
        }
        else {
            const query = `http://localhost:3001/select_session_chart13/filter1=${currFilter1}`
            fetch(query)
            .then(response => {
                return response.text();
            })
            .then(data => {
                result = JSON.parse(data);
                for (let i = 0; i < result.length; i++) {
                    const currentResult = result[i]
                    let result2 = {};
                    result2.date_id = currentResult.date_id.substring(0,10);
                    result2.avg_duration_min = currentResult.avg_duration_min;
                    resultArr.push(result2)
                }
                setchart13data(resultArr);
            });
        }
    };

    function generateChart13(data) {
        const dMin = Math.round((Math.min(...data.map(o => o.avg_duration_min)) - Math.min(...data.map(o => o.avg_duration_min))*0.1)/10)*10+5;
        const dMax = Math.round((Math.max(...data.map(o => o.avg_duration_min)) + Math.min(...data.map(o => o.avg_duration_min))*0.1)/10)*10-5;
        const element = [
            <div class='row mh-10'>
                <p class='chart-title '>Cart Abandonment Rate</p>
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
                        <YAxis domain={[dMin, dMax]} name="AVG Duration" unit={'min'}/>
                        <XAxis dataKey="date_id"  interval={'preserveStartEnd'} tickSize={5} height={20} tick={{fontSize: 9}} />
                        <Tooltip />
                        <Brush dataKey='date_id' height={10} tickFormatter={() => { return ''}} />
                        <Line type="monotone" dataKey={`avg_duration_min`} name={'avg_duration_min'}  stroke="#4477aa" fill="#4477aa"  dot={{ r: 1.5 }} 
                        //label={<CustomizedLabelChart13 />} 
                        />
                    </LineChart>
                </ResponsiveContainer>         
            </div> 
        ]; 
        setChart13(element);
    }

    return (
        chart13 ? chart13 : 'Smth wrong'
    )
}