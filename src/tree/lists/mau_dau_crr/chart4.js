import React, { useEffect, useState } from "react";
import { subscriberFilter1 } from '../../../MessageService.js';

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Brush } from 'recharts';

export const Chart4 = () => {

    const log_prefix = 'CHART4: ';

    const currFilter1 = subscriberFilter1._value;

    const CustomizedLabelChart4 = (props) => {
        const { x, y, value, index} = props;

        return (
                <text x={x+25} y={y+6} textAnchor="middle" value={value} id={`Chart2_index${index}`} >{value} </text>
        )
    }
    
    const CustomizedDotChart4 = (props) => {

        const { cx, cy, value } = props;
      
        if (value === null) {
            return null
        }
        if (value >= 100) {
          return (
            <svg x={cx-5} y={cy-5} width={10} height={10} >
                <circle cx="5" cy="5" r="5" strokeWidth="3" fill="green" />
            </svg>
          );
        }
        return (
            <svg x={cx-5} y={cy-5} width={10} height={10} >
                <circle cx="5" cy="5" r="5" strokeWidth="3" fill="red" />
            </svg>
        );
    };

    const [chart4, setChart4] = useState(false)
    const [chart4data, setchart4data] = useState(false)

    useEffect(() => {
        getchart4data();
    }, [])

    useEffect(() => {
        if(chart4data){
            generateChart4(chart4data);
        }
    }, [chart4data] )

    useEffect(() => {
        getchart4data();
    }, [currFilter1])
    
    function getchart4data() {
        let result = false;
        if ( currFilter1.length <= 0 ) {
            fetch(`http://localhost:3001/select_mau`)
            .then(response => {
                return response.text();
            })
            .then(data => {
                result = JSON.parse(data);
                setchart4data(result);
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
                setchart4data(result);
            });
        }
    };

    function generateChart4(data) {
        const dMin = Math.round((Math.min(...data.filter(item => item.crr != null).map(o => o.crr)) - Math.min(...data.filter(item => item.crr != null).map(o => o.crr))*0.02)/10)*10
        const dMax = Math.round((Math.max(...data.filter(item => item.crr != null).map(o => o.crr)) + Math.min(...data.filter(item => item.crr != null).map(o => o.crr))*0.02)/10)*10
        const off = 100 / (dMax + dMin);
        const element = [
            <div class='row mh-10'>
                <p class='chart-title '>CRR dynamic</p>
            </div>, 
            <div class='row mh-90'>
                <ResponsiveContainer width={'100%'} height={'100%'}>
                    <LineChart
                        data={data}
                        margin={{
                        top: 5,
                        right: 40,
                        left: 10,
                        bottom: 5,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date_year_month" angle={-25} interval={0} tickSize={11} height={40}/>
                        <YAxis domain={[dMin, dMax]} unit={"%"}/>
                        <Tooltip />
                        <Brush dataKey='date_year_month' height={10} />
                        <Line dot={<CustomizedDotChart4 />} type="monotone" dataKey="crr" stroke="url(#colorCrr)"  strokeDasharray="10 5" strokeWidth={2.5} label={<CustomizedLabelChart4 />} />
                        <defs>
                            <linearGradient id="colorCrr" x1="0%" y1="0" x2="0" y2="1">
                                <stop offset={off} stopColor="green" stopOpacity={1} />
                                <stop offset={off} stopColor="red" stopOpacity={1} />
                            </linearGradient>
                        </defs>
                    </LineChart>
                </ResponsiveContainer>
            </div>
        ]; 
        setChart4(element);
    }

    return (
        chart4 ? chart4 : 'Smth wrong'  
    )
}