import React, { useEffect, useState } from "react";
import { subscriberMetric1 , subscriberFilter1 } from '../../../MessageService.js';
import { METRICS } from '../../components/constants';

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Brush, ResponsiveContainer, LabelList } from 'recharts';

export const Chart14 = (props) => {

    const data_temp = [
        {
          name: 'Page A',
          uv: 4000,
          pv: 2400,
          amt: 2400,
        },
        {
          name: 'Page B',
          uv: 3000,
          pv: 1398,
          amt: 2210,
        },
        {
          name: 'Page C',
          uv: 2000,
          pv: 9800,
          amt: 2290,
        },
        {
          name: 'Page D',
          uv: 2780,
          pv: 3908,
          amt: 2000,
        },
        {
          name: 'Page E',
          uv: 1890,
          pv: 4800,
          amt: 2181,
        },
        {
          name: 'Page F',
          uv: 2390,
          pv: 3800,
          amt: 2500,
        },
        {
          name: 'Page G',
          uv: 3490,
          pv: 4300,
          amt: 2100,
        },
      ];

    const log_prefix = 'CHART14: '

    const currMetric = subscriberMetric1._value
    const currFilter1 = subscriberFilter1._value

    const [chart14, setChart14] = useState(false)
    const [chart14data, setchart14data] = useState(false)

    useEffect(() => {
        getChart14Data();
    }, [])

    useEffect(() => {
        if(chart14data){
            generateChart14(data_temp, METRICS, currMetric);
        }
    }, [chart14data])

    useEffect(() => {
        getChart14Data();
    }, [currFilter1, currMetric])

    function getChart14Data() {
        let result = false;
        if ( currFilter1.length <= 0 ) {
            fetch(`http://localhost:3001/select_mau_by_segment`)
            .then(response => {
                return response.text();
            })
            .then(data => {
                result = JSON.parse(data);
                setchart14data(result);
            })
        }
        else {
            const query = `http://localhost:3001/select_mau_by_segment_by_filters/filter1=${currFilter1}`
            fetch(query)
            .then(response => {
                return response.text();
            })
            .then(data => {
                result = JSON.parse(data);
                setchart14data(result);
            })
        }
    };

    function generateChart14(data_temp, METRICS, currMetric) {
        const use_metric = METRICS.filter(item => item.npp === currMetric).map(item => item.value)[0]
        const title_metric = use_metric.toUpperCase();
        const element = [
            <div class='row mh-10'>
                <p class='chart-title '>{title_metric} segment concentration</p>
            </div>, 
            <div class='row mh-90'>
                <ResponsiveContainer width={'100%'} height={'100%'}>
                    <BarChart width={150} height={40} data={data_temp} layout="vertical">
                        <Bar dataKey="uv" fill="#8884d8" />
                    </BarChart>
                </ResponsiveContainer>       
            </div> 
        ];
        setChart14(element);
    }

    return (
        chart14 ? chart14 : 'Smth wrong'
    )
}