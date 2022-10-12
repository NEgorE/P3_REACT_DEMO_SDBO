import React, { PureComponent, useEffect, useState } from "react";

import { LineChart, BarChart, Line, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Brush, ResponsiveContainer, LabelList, PieChart, Pie, Cell, Label  } from 'recharts';


import "bootstrap/dist/css/bootstrap.min.css";
import "./mau_dau_crr.css";

export const Maudaucrr = () => {

    class CustomizedLabelChart4 extends PureComponent {
        render() {
            const { x, y, value, index} = this.props;
            return (
                    <text x={x+25} y={y+6} textAnchor="middle" value={value} id={`Chart2_index${index}`} >{value} </text>
            )
        }
    };
    class CustomizedLabelChart2 extends PureComponent {
        render() {
            const { x, y, value, index} = this.props;
            return (
                    <text x={x} y={y-5} textAnchor="middle" value={value} id={`Chart2_index${index}`} >{value} </text>
            )
        }
    };
    const CustomizedDot = (props) => {
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

    const RADIAN = Math.PI / 180;
    const renderCustomizedLabel = (props) => {
        const { cx, cy, midAngle, innerRadius, outerRadius, percent, index, value } = props
        const radius = innerRadius + (outerRadius - innerRadius) * 0.7;
        const x = cx + radius * Math.cos(-midAngle * RADIAN) - 5;
        const y = cy + radius * Math.sin(-midAngle * RADIAN);

        return (
            <text x={x} y={y} fill="white" textAnchor={'middle'} dominantBaseline="central">
                {`${value} (${(percent * 100).toFixed(0)}%)`}
            </text>
        );
    };

    const [kpi1, setKpi1] = useState(false)
    const [chart1, setChart1] = useState(false)
    const [chart1data, setchart1data] = useState(false)
    const [chart2, setChart2] = useState(false)
    const [chart4, setChart4] = useState(false)
    const [chart2data, setchart2data] = useState(false)
    const [chart3, setChart3] = useState(false)
    const [chart3data, setchart3data] = useState(false)

    useEffect(() => {
        getChart2Data();
        getChart3Data();
        getChart1Data();
    }, [])

    useEffect(() => {
        if(chart1data){
            generateChart1(chart1data);
        }
    }, [chart1data])

    useEffect(() => {
        if(chart2data){
            generateChart2(chart2data);
            generateChart4(chart2data);
            generateKpi1(chart2data);
        }
    }, [chart2data])

    useEffect(() => {
        if(chart3data){
            generateChart3(chart3data);
        }
    }, [chart3data])

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

    function getChart1Data() {
        let result = false;
        const resultArr = [];
        fetch(`http://localhost:3001/select_mau_by_system`)
          .then(response => {
            return response.text();
          })
          .then(data => {
            result = JSON.parse(data);
            for (let i = 0; i < result.length; i++) {
                const currentResult = result[i]
                let result2 = {};
                result2.name = currentResult.sys_type
                result2.value = parseInt(currentResult.mau)
                result2.color = currentResult.color
                resultArr.push(result2)
            }
            setchart1data(resultArr);
          });
    }

    function generateKpi1(data) {
        const maxPeriod = data.map(item => item.date_year_month).sort((a, b) => a > b ? -1 : 1)[0]
        const maxPeriodPref = data.map(item => item.date_year_month).sort((a, b) => a > b ? -1 : 1)[1]
        const valueOfMaxPeriod = parseInt(data.filter(item => item.date_year_month === maxPeriod).map(item => item.mau)[0])
        const valueOfMaxPeriodPref = parseInt(data.filter(item => item.date_year_month === maxPeriodPref).map(item => item.mau)[0])
        const element = (
            <div class='col obj h-100'>
                <div class='row h-25 row-kpi'>
                    <div class='col h-100'>
                        <div class="row align-items-end h-100">
                            <p class='kpi-text-f-title'>MAU for {maxPeriod}</p>
                        </div>
                    </div>
                </div>
                <div class='row h-75 row-kpi'>
                    <div class='col col-7 h-100 '>
                        <div class="row align-items-center h-100">
                            <p class='kpi-text-f'>{valueOfMaxPeriod}</p>
                        </div>
                        </div>
                    <div class='col col-5'>
                        <div class='row mh-60'>
                            <div class="row align-items-end h-100">
                                <p class='kpi-text-s'>{valueOfMaxPeriodPref}</p>
                            </div>
                        </div>
                        <div class='row mh-40'>
                            <div class="row align-items-start h-100">
                                <p class='kpi-text-s-title'>{maxPeriodPref}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
        setKpi1(element)
    }

    function generateChart1(data) {
        const element = (
            <ResponsiveContainer width={'100%'} height={'100%'}>
                <PieChart>
                    <Pie
                    data={data}
                    color="#000000"
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="100%"
                    outerRadius={'200%'}
                    fill="#8884d8"
                    labelLine={false}
                    label={renderCustomizedLabel}
                    startAngle={180}
                    endAngle={0}
                    >
                        {data.map((item, index) => (
                            <Cell
                                key={`cell-${index}`}
                                fill={item.color}
                            />
                        ))}
                    </Pie>
                    <Legend verticalAlign="top"/>
                    <Tooltip />
                    </PieChart>
            </ResponsiveContainer>
        ); 
        setChart1(element);
    }

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
        const dMin = Math.round((Math.min(...data.filter(item => item.crr != null).map(o => o.crr)) - Math.min(...data.filter(item => item.crr != null).map(o => o.crr))*0.02)/10)*10
        const dMax = Math.round((Math.max(...data.filter(item => item.crr != null).map(o => o.crr)) + Math.min(...data.filter(item => item.crr != null).map(o => o.crr))*0.02)/10)*10
        const off = 100 / (dMax + dMin);
        const element = (
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
                    <Line dot={<CustomizedDot />} type="monotone" dataKey="crr" stroke="url(#colorCrr)"  strokeDasharray="10 5" strokeWidth={2.5} label={<CustomizedLabelChart4 />} />
                    <defs>
                        <linearGradient id="colorCrr" x1="0%" y1="0" x2="0" y2="1">
                            <stop offset={off} stopColor="green" stopOpacity={1} />
                            <stop offset={off} stopColor="red" stopOpacity={1} />
                        </linearGradient>
                    </defs>
                </LineChart>
            </ResponsiveContainer>
        ); 
        setChart4(element);
    }
    
    return (
        <div className="container-fluid h-100">
            <div class="row mh-40">
                <div class='col col-8 h-100'>
                    <div class="row h-25">
                        <div class='col col-6'>Filters</div>
                        <div class='col col-6'>RadioButtons</div>
                    </div>
                    <div class="row h-75">
                        <div class='col h-100 cobj' >
                            { kpi1 ? kpi1 : 'Smth wrong' }
                        </div>
                        <div class='col col-6'>KPI2</div>
                    </div>
                </div>
                <div class='col col-4 h-100 cobj' >
                    <div class='col obj h-100'>
                        { chart1 ? chart1 : 'Smth wrong' }
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