import React, { useEffect, useState } from "react";
import { subscriberFilter1 } from '../../../MessageService.js';

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Brush, ResponsiveContainer, Legend } from 'recharts';

export const Chart12 = (props) => {

    const log_prefix = 'CHART12: '

    const currFilter1 = subscriberFilter1._value


    const [chart12, setChart12] = useState(false)
    const [chart12data, setchart12data] = useState(false)

    useEffect(() => {
        getChart12Data();
    }, [])

    useEffect(() => {
        if(chart12data){
            generateChart12(chart12data);
        }
    }, [chart12data])

    useEffect(() => {
        getChart12Data();
    }, [currFilter1])
    
    function getChart12Data() {
        let result = false;
        const resultArr = [];
        if ( currFilter1.length <= 0 ) {
            fetch(`http://localhost:3001/select_session_chart12/filter1=`)
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
                    result2.proc_success_session = currentResult.proc_success_session;
                    result2.session_timeout = currentResult.session_timeout;
                    resultArr.push(result2)
                }
                setchart12data(resultArr);
            });
        }
        else {
            const query = `http://localhost:3001/select_session_chart12/filter1=${currFilter1}`
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
                    result2.proc_success_session = currentResult.proc_success_session;
                    result2.session_timeout = currentResult.session_timeout;
                    resultArr.push(result2)
                }
                setchart12data(resultArr);
            });
        }
    };

    function generateChart12(data) {
        
        const element = [
            <div class='row mh-10'>
                <p class='chart-title-2'>Session Concentration by parts of day</p>
            </div>, 
            <div class='row mh-90'>
                lol
            </div> 
        ]; 
        setChart12(element);
    }

    return (
        chart12 ? chart12 : 'Smth wrong'
    )
}