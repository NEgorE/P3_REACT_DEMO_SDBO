import React, { useEffect, useState } from "react";
import { subscriberFilter1 } from '../../../MessageService.js';

import { AreaChart, XAxis, YAxis, CartesianGrid, Tooltip, Brush, ResponsiveContainer, Area, Legend } from 'recharts';

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

    const [chart7, setChart7] = useState(false)
    const [chart7data, setchart7data] = useState(false)

    useEffect(() => {
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
                    result2.aband = currentResult.aband;
                    result2.count = currentResult.count;
                    resultArr.push(result2)
                }
                setchart7data(resultArr);
            });
        }
        else {
            const query = `http://localhost:3001/select_daily_services/filter1=${currFilter1}`
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
                    result2.aband = currentResult.aband;
                    result2.count = currentResult.count;
                    resultArr.push(result2)
                }
                setchart7data(resultArr);
            });
        }
    };

    function generateChart7(data) {
        const element = [
            <div class='row mh-10'>
                <p class='chart-title '>Service Usage Dynamics</p>
            </div>, 
            <div class='row mh-90'>
                <ResponsiveContainer width={'100%'} height={'100%'}>
                    <AreaChart
                        data={data}
                        margin={{
                        top: 5,
                        right: 30,
                        left: 10,
                        bottom: 5,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <YAxis name="Count"/>
                        <XAxis dataKey="date_id"  interval={'preserveStartEnd'} tickSize={5} height={20} tick={{fontSize: 7}} />
                        <Tooltip />
                        <Legend verticalAlign="top" height={26} margin={{ top: 0, left: 0, right: 0, bottom: 100 }}/>
                        <Brush dataKey='date_id' height={10} tickFormatter={() => { return ''}} />
                        <Area type="monotone" dataKey={`aband`} name={'Total'} stroke="#4477aa" fill="#4477aa" stackId="1" dot={{ r: 1.5 }} label={<CustomizedLabelChart7 />} />
                        <Area type="monotone" dataKey={`count`} name={'Failed'} stroke="#dc3545" fill="#dc3545" stackId="2" dot={{ r: 1.5 }} label={<CustomizedLabelChart7 />} />
                    </AreaChart>
                </ResponsiveContainer>         
            </div> 
        ]; 
        setChart7(element);
    }

    return (
        chart7 ? chart7 : 'Smth wrong'
    )
}