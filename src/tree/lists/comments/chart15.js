import React, { useEffect, useState } from "react";

import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, LabelList, CartesianGrid, Cell } from 'recharts';

export const Chart15 = (props) => {

    const log_prefix = 'CHART15: '

    const [chart15, setChart15] = useState(false)
    const [chart15data, setchart15data] = useState(false)

    useEffect(() => {
        getChart15Data();
    }, [])

    useEffect(() => {
        if(chart15data){
            generateChart15(chart15data);
        }
    }, [chart15data])


    function getChart15Data() {
        let result = false;
        const query = `http://localhost:3001/select_comment_bar_data/`
        fetch(query)
        .then(response => {
            return response.text();
        })
        .then(data => {
            result = JSON.parse(data);
            setchart15data(result);
        })

    };

    function getMarkColor(markValue) {
        switch (markValue) {
            case 5:
            default:
                return "#117733";
            case 4:
                return "#8dcc56";
            case 3:
                return "#eebd55";
            case 2:
                return "#88592a";
            case 1:
                return "#aa3e34";
        };
    };

    function getTicksArray(start_value, end_value, step) {
        const returnedArray = [start_value];
        var stepValue = start_value;
        for (let i = 0; stepValue < end_value; i++) {
            stepValue = stepValue + step;
            if (stepValue < end_value) {
                returnedArray.push(stepValue)
            }
        }
        returnedArray.push(end_value)
        return returnedArray;
    };

    function generateChart15(data) {
        const new_data = [...data.filter(item => item.sys_type === 'iOS')];
        const dMax = (Math.round(Math.max(...new_data.map(o => o.m_count))/10) +1 )*10;
        const data_for_count = [...new_data.map(item => parseInt(item.m_count))];
        const data_for_count2 = [...new_data.map(item => parseInt(item.m_count)*parseInt(item.com_mark))];
        const count_all = data_for_count.reduce(function(sum, elem) {
            return sum + elem;
        }, 0);
        const count_all_for_avg = data_for_count2.reduce(function(sum, elem) {
            return sum + elem;
        }, 0);
        const avg_of_all=(count_all_for_avg/count_all).toFixed(1);
        const tecksArray = getTicksArray(0, dMax, 25);
        const element = [
            <div class='row mh-10'>
                <p class='chart-title '>iOS. Average {avg_of_all} of {count_all} ratings</p>
            </div>, 
            <div class='row mh-90'>
                <ResponsiveContainer width={'100%'} height={'100%'}>
                    <BarChart
                        data={new_data}
                        margin={{
                        top: 5,
                        right: 40,
                        left: -30,
                        bottom: 5,
                        }}
                        layout="vertical"
                    >
                        <CartesianGrid horizontal={0} />
                        <XAxis type="number" domain={[0, dMax]} ticks={tecksArray}/>
                        <YAxis dataKey="com_mark"  type="category" tickLine={0} />
                        <Bar 
                            dataKey="m_count" 
                            stackId={"a"}
                            fill="#117733"
                            >
                                {new_data.map((entry, index) => (
                                    <Cell fill={getMarkColor(entry.com_mark)}/>

                                ))}
                            <LabelList 
                                dataKey="m_count" 
                                position="right"
                                fill="black"
                            />
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>       
            </div> 
        ];
        setChart15(element);
    }

    return (
        chart15 ? chart15 : 'Smth wrong'
    )
}