import React, { useEffect, useState } from "react";
import { subscriberFilter1 } from '../../../MessageService.js';
import { scaleOrdinal } from 'd3-scale';
import { schemeCategory10 } from 'd3-scale-chromatic';

import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell  } from 'recharts';

export const Chart8 = (props) => {

    const colors = scaleOrdinal(schemeCategory10).range();

    const log_prefix = 'CHART8: '

    const currFilter1 = subscriberFilter1._value


    const [chart8, setChart8] = useState(false)
    const [chart8data, setchart8data] = useState(false)

    useEffect(() => {
        getChart8Data();
    }, [])

    useEffect(() => {
        if(chart8data){
            generateChart8(chart8data);
        }
    }, [chart8data])

    useEffect(() => {
        getChart8Data();
    }, [currFilter1])

    function getChart8Data() {
        let result = false;
        const resultArr = [];
        if ( currFilter1.length <= 0 ) {
            fetch(`http://localhost:3001/select_services_count_by_used_by_clients/filter1=`)
            .then(response => {
                return response.text();
            })
            .then(data => {
                result = JSON.parse(data);
                for (let i = 0; i < result.length; i++) {
                    const currentResult = result[i]
                    let result2 = {};
                    result2.ser_name = currentResult.ser_name
                    result2.x = parseInt(currentResult.count_ser_used)
                    result2.y = parseInt(currentResult.count_ser_date)
                    resultArr.push(result2)
                }
                setchart8data(resultArr);
            });
        }
        else {
            const query = `http://localhost:3001/select_services_count_by_used_by_clients/filter1=${currFilter1}`
            fetch(query)
            .then(response => {
                return response.text();
            })
            .then(data => {
                result = JSON.parse(data);
                for (let i = 0; i < result.length; i++) {
                    const currentResult = result[i]
                    let result2 = {};
                    result2.ser_name = currentResult.ser_name
                    result2.x = parseInt(currentResult.count_ser_used)
                    result2.y = parseInt(currentResult.count_ser_date)
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
                        <XAxis type="number" dataKey="x" name="clients"/>
                        <YAxis type="number" dataKey="y" name="days"/>
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