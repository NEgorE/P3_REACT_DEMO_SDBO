import React, { useEffect, useState } from "react";
import { subscriberFilter1 } from '../../../MessageService.js';

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Brush, ResponsiveContainer } from 'recharts';

export const Chart9 = (props) => {

    const log_prefix = 'CHART9: '

    const currFilter1 = subscriberFilter1._value

    const CustomizedLabelChart9 = (props) => {
        const { x, y, value, index} = props;
        if (index % 20 === 0){
            return (
                <text x={x} y={y-5} textAnchor="middle" value={value} id={`Chart2_index${index}`} >{value} </text>
            )
        } 
        else {
            return null;
        };
    };

    const [chart9, setChart9] = useState(false)
    const [chart9data, setchart9data] = useState(false)

    useEffect(() => {
        console.log(log_prefix + currFilter1);
        getChart9Data();
    }, [])

    useEffect(() => {
        if(chart9data){
            generateChart9(chart9data);
        }
    }, [chart9data])

    useEffect(() => {
        getChart9Data();
    }, [currFilter1])
    
    function getChart9Data() {
        let result = false;
        const resultArr = [];
        console.log(log_prefix + currFilter1.length + ' length filter');
        if ( currFilter1.length <= 0 ) {
            fetch(`http://localhost:3001/select_daily_services/filter1=`)
            .then(response => {
                return response.text();
            })
            .then(data => {
                result = JSON.parse(data);
                for (let i = 0; i < result.length; i++) {
                    const currentResult = result[i]
                    let result2 = {};
                    result2.date_id = currentResult.date_id.substring(0,10);
                    result2.aband2 = currentResult.aband2;
                    resultArr.push(result2)
                }
                setchart9data(resultArr);
            });
        }
        else {
            const query = `http://localhost:3001/select_daily_services/filter1=${currFilter1}`
            console.log(log_prefix + query);
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
                    result2.aband2 = currentResult.aband2;
                    resultArr.push(result2)
                }
                setchart9data(resultArr);
            });
        }
    };

    function generateChart9(data) {
        console.log(data);
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
                        <YAxis domain={[0, 100]} name="Rate" unit={'%'}/>
                        <XAxis dataKey="date_id"  interval={'preserveStartEnd'} tickSize={5} height={20} tick={{fontSize: 9}} />
                        <Tooltip />
                        <Brush dataKey='date_id' height={10} tickFormatter={() => { return ''}} />
                        <Line type="monotone" dataKey={`aband2`} name={'% of failed'}  stroke="#4477aa" fill="#4477aa"  dot={{ r: 1.5 }} label={<CustomizedLabelChart9 />} />
                    </LineChart>
                </ResponsiveContainer>         
            </div> 
        ]; 
        setChart9(element);
    }

    return (
        chart9 ? chart9 : 'Smth wrong'
    )
}