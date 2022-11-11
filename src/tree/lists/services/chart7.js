import React, { useEffect, useState } from "react";
import { subscriberFilter1 } from '../../../MessageService.js';

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Brush, ResponsiveContainer } from 'recharts';

export const Chart7 = (props) => {

    const log_prefix = 'CHART7: '

    const currFilter1 = subscriberFilter1._value

    const CustomizedLabelChart7 = (props) => {
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

    function CustomizedBrush7 (props)  {
        console.log(props)
        return 'x';
    }

    const [chart7, setChart7] = useState(false)
    const [chart7data, setchart7data] = useState(false)

    useEffect(() => {
        console.log(log_prefix + currFilter1);
        getChart7Data();
    }, [])

    useEffect(() => {
        if(chart7data){
            generateChart7(chart7data);
        }
    }, [chart7data])

    useEffect(() => {
        getChart7Data();
    }, [currFilter1])
    
    function getChart7Data() {
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
                setchart7data(resultArr);
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
                setchart7data(resultArr);
            });
        }
    };

    function generateChart7(data) {
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
                        <XAxis dataKey="date_id"  interval={'preserveStartEnd'} tickSize={5} height={20} tick={{fontSize: 7}} />
                        <Tooltip />
                        <Brush dataKey='date_id' height={10} tickFormatter={() => { return ''}} />
                        <Line type="monotone" dataKey={`aband2`} stroke="#4477aa" fill="#4477aa" strokeWidth={1} dot={{ r: 1.5 }} label={<CustomizedLabelChart7 />} />
                    </LineChart>
                </ResponsiveContainer>         
            </div> 
        ]; 
        setChart7(element);
    }

    return (
        chart7 ? chart7 : 'Smth wrong'
    )
}