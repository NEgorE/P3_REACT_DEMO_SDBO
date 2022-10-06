import React, {useEffect, useState} from "react";

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Brush, ResponsiveContainer, Dot, LabelList } from 'recharts';


import "bootstrap/dist/css/bootstrap.min.css";
import "./mau_dau_crr.css";

export const Maudaucrr = ({}) => {

    const [chart2, setChart2] = useState(false)
    const [chart2data, setchart2data] = useState(false)

    function getChart2Data() {
        let result = false;
        fetch(`http://localhost:3001/select_mau`)
          .then(response => {
            return response.text();
          })
          .then(data => {
            result = JSON.parse(data);
            setchart2data(result);
          });
    };

    function generateChart2(data) {
        console.log('create chart2');
        const element = (
            <ResponsiveContainer width={'100%'} height={'100%'}>
                <LineChart
                    data={data}
                    margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date_year_month" angle={-25} interval={0} tickSize={11} height={40}/>
                    <YAxis domain={[15000, 20000]} interval={"preserveEnd"}/>
                    <Tooltip />
                    <Brush dataKey='date_year_month' height={10} />
                    <Line type="monotone" dataKey="mau" stroke="#4477aa" fill="#4477aa" strokeDasharray="10 5" strokeWidth={2} dot={{ r: 5 }} label="mau" >
                        <LabelList dataKey="mau" position="top" />
                    </Line>
                </LineChart>
            </ResponsiveContainer>
        ); 
        setChart2(element);
    }
    
    useEffect(() => {
        getChart2Data();
    }, [])

    useEffect(() => {
        if(chart2data){
            generateChart2(chart2data);
        }
    }, [chart2data])

    return (
        <div className="container-fluid h-100">
            <div class="row mh-40">
                <div class='col col-8 h-100'>
                    <div class="row">
                        <div class='col col-6'>Filters</div>
                        <div class='col col-6'>RadioButtons</div>
                    </div>
                    <div class="row">
                        <div class='col col-6'>KPI1</div>
                        <div class='col col-6'>KPI2</div>
                    </div>
                </div>
                <div class='col col-4 h-100 cobj' >
                    <div class='col obj h-100'>
                        { chart2 ? chart2 : 'Smth wrong' }
                    </div>
                </div>
            </div>
            <div class="row mh-60">
                <div class='col col-4 h-100 cobj' >
                    <div class='col obj h-100'>
                        { chart2 ? chart2 : 'Smth wrong' }
                    </div>
                </div>
                <div class='col col-4 h-100 cobj'>
                    <div class='col obj h-100'>
                        { chart2 ? chart2 : 'Smth wrong' }
                    </div>
                </div>
                <div class='col col-4 h-100 cobj' >
                    <div class='col obj h-100'>
                        { chart2 ? chart2 : 'Smth wrong' }
                    </div>
                </div>
            </div>
        </div>
        
    )
}