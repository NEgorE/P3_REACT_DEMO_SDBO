import React, { useEffect, useState } from "react";

import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, LabelList, CartesianGrid } from 'recharts';

export const Chart14 = (props) => {

    const log_prefix = 'CHART14: '

    const [chart14, setChart14] = useState(false)
    const [chart14data, setchart14data] = useState(false)

    useEffect(() => {
        getChart14Data();
    }, [])

    useEffect(() => {
        if(chart14data){
            generateChart14(chart14data);
        }
    }, [chart14data])


    function getChart14Data() {
        let result = false;
        const query = `http://localhost:3001/select_comment_bar_data/`
        fetch(query)
        .then(response => {
            return response.text();
        })
        .then(data => {
            result = JSON.parse(data);
            setchart14data(result);
        })

    };

    function generateChart14(data) {
        const new_data = [...data.filter(item => item.sys_type === 'Android')];
        const dMax = (Math.round(Math.max(...new_data.map(o => o.m_count))/10) +1 )*10;
        const element = [
            <div class='row mh-10'>
                <p class='chart-title '>Android. Average X of Y ratings</p>
            </div>, 
            <div class='row mh-90'>
                <ResponsiveContainer width={'100%'} height={'100%'}>
                    <BarChart
                        data={new_data}
                        margin={{
                        top: 5,
                        right: 40,
                        left: -20,
                        bottom: 5,
                        }}
                        layout="vertical"
                    >
                        <CartesianGrid horizontal={0} />
                        <XAxis type="number" domain={[0, dMax]} ticks={[0, 100, dMax]}/>
                        <YAxis dataKey="com_mark"  type="category" />
                        <Bar dataKey="m_count" stackId={"a"}  fill="#3a9058" unit={'%'} ><LabelList dataKey="m_count" position="right"/></Bar>
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