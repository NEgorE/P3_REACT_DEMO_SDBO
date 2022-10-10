import React, { PureComponent, useEffect, useState, useRef} from "react";
import { createRoot } from 'react-dom/client';

import { LineChart, BarChart, Line, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Brush, ResponsiveContainer, LabelList, ReferenceLine, Label } from 'recharts';


import "bootstrap/dist/css/bootstrap.min.css";
import "./mau_dau_crr.css";

export const Maudaucrr = () => {

    class CustomizedLabelChart2 extends PureComponent {
        
        render() {
            const { x, y, value, index} = this.props;
            console.log(this.props);
            const delta = 0;
            return (
                    <text x={x} y={y} textAnchor="middle" value={value} id={`Chart2_index${index}`} >{value} </text>
            )
        }
      }

    const [chart2, setChart2] = useState(false)
    const [chart4, setChart4] = useState(false)
    const [chart2data, setchart2data] = useState(false)
    const [chart3, setChart3] = useState(false)
    const [chart3data, setchart3data] = useState(false)

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

    function getChart3Data() {
        let result = false;
        fetch(`http://localhost:3001/select_mau_by_segment`)
          .then(response => {
            return response.text();
          })
          .then(data => {
            result = JSON.parse(data);
            setchart3data(result);
          });
    };

    function generateChart2(data) {
        const dMin = Math.round((Math.min(...data.map(o => o.mau)) - Math.min(...data.map(o => o.mau))*0.02)/100)*100
        const dMax = Math.round((Math.max(...data.map(o => o.mau)) + Math.min(...data.map(o => o.mau))*0.02)/100)*100
        const element = (
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
                    <XAxis dataKey="date_year_month" angle={-25} interval={0} tickSize={11} height={40}/>
                    <YAxis domain={[dMin, dMax]} />
                    <Tooltip />
                    <Brush dataKey='date_year_month' height={10} />
                    <Line type="monotone" dataKey="mau" stroke="#4477aa" fill="#4477aa" strokeDasharray="10 5" strokeWidth={2} dot={{ r: 5 }} label={<CustomizedLabelChart2 />} />
                </LineChart>
            </ResponsiveContainer>
        ); 
        setChart2(element);
    }

    function generateChart3(data) {
        const dMin = 0;
        const element = (
            <ResponsiveContainer width={'100%'} height={'100%'}>
                <BarChart
                    data={data}
                    margin={{
                    top: 5,
                    right: 30,
                    left: 0,
                    bottom: 5,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date_year_month" angle={-25} interval={0} tickSize={11} height={40}/>
                    <YAxis domain={[dMin, (dMax) => (Math.round(dMax))]} type="number" interval={'preserveEnd'} unit='%'/>
                    <Tooltip />
                    <Legend verticalAlign="top" />
                    <Brush dataKey='date_year_month' height={10} />
                    <Bar dataKey="Mikro" stackId={"a"}  fill="#3a9058" unit={'%'} ><LabelList dataKey="Mikro" position="center" fill="#fff"/></Bar>
                    <Bar dataKey="Maliy" stackId={"a"}  fill="#301c89"  unit={'%'} ><LabelList dataKey="Maliy" position="center" fill="#fff"/></Bar>
                    <Bar dataKey="Sredniy" stackId={"a"}  fill="#cd6678"  unit={'%'} ><LabelList dataKey="Sredniy" position="center" fill="#fff"/></Bar>
                    <Bar dataKey="Krupniy" stackId={"a"}  fill="#decd78"  unit={'%'} ><LabelList dataKey="Krupniy" position="center"/></Bar>
                    <Bar dataKey="Krupneyshiy" stackId={"a"}  fill="#89cdef"  unit={'%'} ><LabelList dataKey="Krupneyshiy" position="center"/></Bar>
                </BarChart>
            </ResponsiveContainer>
        ); 
        setChart3(element);
    }

    function generateChart4(data) {
        const dMin = Math.round((Math.min(...data.filter(item => item.crr != null).map(o => o.crr)) - Math.min(...data.filter(item => item.crr != null).map(o => o.crr))*0.02))
        const dMax = Math.round((Math.max(...data.filter(item => item.crr != null).map(o => o.crr)) + Math.min(...data.filter(item => item.crr != null).map(o => o.crr))*0.02))
        const element = (
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
                    <XAxis dataKey="date_year_month" angle={-25} interval={0} tickSize={11} height={40}/>
                    <YAxis domain={[dMin, dMax]} unit={"%"}/>
                    <Tooltip />
                    <ReferenceLine y={100} label={{ value: '100%', position: 'insideTopLeft', fill:'red' }} stroke="red" strokeDasharray="3 3" />
                    <Brush dataKey='date_year_month' height={10} />
                    <Line type="monotone" dataKey="crr" stroke="#4477aa" fill="#4477aa" strokeDasharray="10 5" strokeWidth={2} dot={{ r: 5 }} label={<CustomizedLabelChart2 />} />
                </LineChart>
            </ResponsiveContainer>
        ); 
        setChart4(element);
    }
    
    useEffect(() => {
        getChart2Data();
        getChart3Data();
    }, [])

    useEffect(() => {
        if(chart2data){
            generateChart2(chart2data);
            generateChart4(chart2data);
        }
    }, [chart2data])

    useEffect(() => {
        if(chart3data){
            generateChart3(chart3data);
        }
    }, [chart3data])

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
                        { chart3 ? chart3 : 'Smth wrong' }
                    </div>
                </div>
                <div class='col col-4 h-100 cobj' >
                    <div class='col obj h-100'>
                        { chart4 ? chart4 : 'Smth wrong' }
                    </div>
                </div>
            </div>
        </div>
        
    )
}