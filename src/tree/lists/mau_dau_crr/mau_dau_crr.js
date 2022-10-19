import React, { PureComponent, useEffect, useState } from "react";
import { subscriber, messageService } from '../../../MessageService.js';

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
    const CustomizedLabelChart1 = (props) => {
        const { cx, cy, midAngle, innerRadius, outerRadius, percent, index, value } = props
        const radius = innerRadius + (outerRadius - innerRadius) * 0.7;
        const x = cx + radius * Math.cos(-midAngle * RADIAN) + 7;
        const y = cy + radius * Math.sin(-midAngle * RADIAN);

        return (
            <text x={x} y={y} fill="white" textAnchor={'middle'} dominantBaseline="central">
                {`${value} (${(percent * 100).toFixed(1)}%)`}
            </text>
        );
    };

    //console.log(subscriber);

    const f_render_metric = subscriber._value ? subscriber._value : 'metric1'

    const [rb1, setRB1] = useState(false)
    const [currMetric, setCurrMetric] = useState(f_render_metric)
    const [currFilter, setCurrFilter] = useState(false)
    const [filter1data, setFilter1data] = useState(false)
    const [filter1, setFilter1] = useState(false)
    const [kpi1, setKpi1] = useState(false)
    const [kpi2, setKpi2] = useState(false)
    const [chart1, setChart1] = useState(false)
    const [chart1data, setchart1data] = useState(false)
    const [chart2, setChart2] = useState(false)
    const [chart4, setChart4] = useState(false)
    const [chart2data, setchart2data] = useState(false)
    const [chart3, setChart3] = useState(false)
    const [chart3data, setchart3data] = useState(false)

    const METRICS = [
        { npp: 'metric1', title: 'MAU', value: 'mau'},
        { npp: 'metric2', title: 'DAU', value: 'dau'},
    ]

    useEffect(() => {
        console.log('load data during first render');
        getFilter1Data();
        getChart2Data();
        getChart3Data();
        getChart1Data();
        genetareRB1(METRICS, f_render_metric);
    }, [])

    useEffect(() => {
        if(filter1data){
            //console.log(filter1data);
            generateFilter1(filter1data);
        }
    }, [filter1data])

    useEffect(() => {
        if(chart1data){
            //console.log('render chart 1');
            generateChart1(chart1data, METRICS, currMetric);
        }
    }, [chart1data, currMetric])

    useEffect(() => {
        if(chart2data){
            //console.log('render chart 2, 4 ,kpi 1,2');
            generateChart2(chart2data, METRICS, currMetric);
            generateChart4(chart2data);
            generateKpi1(chart2data, METRICS, currMetric);
            generateKpi2(chart2data, METRICS, currMetric);
        }
    }, [chart2data, currMetric])

    useEffect(() => {
        if(chart3data){
            //console.log('render chart 3');
            generateChart3(chart3data, METRICS, currMetric);
        }
    }, [chart3data, currMetric])

    useEffect(() => {
        console.log(subscriber);
        console.log(subscriber._value);
        subscriber.next(currMetric)
    }, [currMetric])

    function getFilter1Data() {
        let result = false;
        fetch(`http://localhost:3001/select_filter_cal`)
          .then(response => {
            return response.text();
          })
          .then(data => {
            result = JSON.parse(data);
            setFilter1data(result);
          });
    };
    
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
                result2.sys_type = currentResult.sys_type
                result2.mau = parseInt(currentResult.mau)
                result2.dau = parseInt(currentResult.dau)
                result2.color = currentResult.color
                result2.date_year_month = currentResult.date_year_month
                resultArr.push(result2)
            }
            setchart1data(resultArr);
          });
    }

    const onChangeMetric = e => {
        setCurrMetric(e.target.value);
    }

    function generateFilter1(data) {
        const element =(
            <div class="row align-items-center h-100 row-rb">
                <div class="btn-group obj rb" role="group" aria-label="Basic radio toggle button group">
                    {data.map((el, key) =>(
                        [
                            <input type="radio" class="btn-check" name="btnf1radio" id={`btnf1check ${key}`} autoComplete="off" 
                                //value={`${el.npp}`} //onChange={onChangeMetric}
                            />,
                            <label className="btn btn-outline-primary" htmlFor={`btnf1check ${key}`} >{el.date_yq}</label>,
                        ]
                    ))}
                </div>
            </div>
        )
        setFilter1(element);
    }

    function genetareRB1(data, f_render_metric) {
        const element = (
            <div class="row align-items-center h-100 row-rb">
                <div class="btn-group obj rb" role="group" aria-label="Basic radio toggle button group">
                    {data.map((el, key) =>(
                        [
                            el.npp === f_render_metric ? 
                                <input 
                                    type="radio" class="btn-check" name="btnradio" id={`btncheck ${key}`} autoComplete="off" defaultChecked={true}
                                    value={`${el.npp}`} onChange={onChangeMetric}
                                /> 
                                : 
                                <input type="radio" class="btn-check" name="btnradio" id={`btncheck ${key}`} autoComplete="off" 
                                    value={`${el.npp}`} onChange={onChangeMetric}
                                />,
                            <label className="btn btn-outline-primary" htmlFor={`btncheck ${key}`} >{el.title}</label>,
                        ]
                    ))}
                </div>
            </div>
        )
        setRB1(element)
    }

    function generateKpi1(data, METRICS, currMetric) {
        const use_metric = METRICS.filter(item => item.npp === currMetric).map(item => item.value)[0].toUpperCase()
        const maxPeriod = data.map(item => item.date_year_month).sort((a, b) => a > b ? -1 : 1)[0]
        const maxPeriodPref = data.map(item => item.date_year_month).sort((a, b) => a > b ? -1 : 1)[1]
        if(use_metric === 'MAU') {
            var valueOfMaxPeriod = parseInt(data.filter(item => item.date_year_month === maxPeriod).map(item => item.mau)[0])
            var valueOfMaxPeriodPref = parseInt(data.filter(item => item.date_year_month === maxPeriodPref).map(item => item.mau)[0])
        }
        else {
            var valueOfMaxPeriod = data.filter(item => item.date_year_month === maxPeriod).map(item => item.dau)[0]
            var valueOfMaxPeriodPref = data.filter(item => item.date_year_month === maxPeriodPref).map(item => item.dau)[0]
        }
        const element = (
            <div class='col obj h-100'>
                <div class='row h-25 row-kpi'>
                    <div class='col h-100'>
                        <div class="row h-100">
                            <p class='kpi-text-f-title'>{use_metric} for {maxPeriod}</p>
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

    function generateKpi2(data, METRICS, currMetric) {
        const use_metric = METRICS.filter(item => item.npp === currMetric).map(item => item.value)[0].toUpperCase()
        const maxPeriod = data.map(item => item.date_year_month).sort((a, b) => a > b ? -1 : 1)[0]
        const maxPeriodPref = data.map(item => item.date_year_month).sort((a, b) => a > b ? -1 : 1)[1]
        const maxPeriodPref2 = data.map(item => item.date_year_month).sort((a, b) => a > b ? -1 : 1)[2]
        if(use_metric === 'MAU') {
            var valueOfMaxPeriod = parseInt(data.filter(item => item.date_year_month === maxPeriod).map(item => item.mau_comp)[0])
            var valueOfMaxPeriodPref = parseInt(data.filter(item => item.date_year_month === maxPeriodPref).map(item => item.mau_comp)[0])
        }
        else {
            var valueOfMaxPeriod = data.filter(item => item.date_year_month === maxPeriod).map(item => item.dau_comp)[0]
            var valueOfMaxPeriodPref = data.filter(item => item.date_year_month === maxPeriodPref).map(item => item.dau_comp)[0]
        }
        const element = (
            <div class='col obj h-100'>
                <div class='row h-25 row-kpi'>
                    <div class='col h-100'>
                        <div class="row align-items-end h-100">
                            <p class='kpi-text-f-title'>{use_metric} % - {maxPeriod}/{maxPeriodPref}</p>
                        </div>
                    </div>
                </div>
                <div class='row h-75 row-kpi'>
                    <div class='col col-7 h-100 '>
                        <div class="row align-items-center h-100">
                            <p class='kpi-text-f'>{valueOfMaxPeriod} %</p>
                        </div>
                        </div>
                    <div class='col col-5'>
                        <div class='row mh-60'>
                            <div class="row align-items-end h-100">
                                <p class='kpi-text-s'>{valueOfMaxPeriodPref} %</p>
                            </div>
                        </div>
                        <div class='row mh-40'>
                            <div class="row align-items-start h-100">
                                <p class='kpi-text-s-title'>{maxPeriodPref}/{maxPeriodPref2}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
        setKpi2(element)
    }

    function generateChart1(data, METRICS, currMetric) {
        const use_metric = METRICS.filter(item => item.npp === currMetric).map(item => item.value)[0]
        const title_metric = use_metric.toUpperCase();
        const title_period = data.map(item => item.date_year_month)[0];
        console.log(data)
        const element = [
            <div class='row mh-10'>
                <p class='chart-title '>{title_metric} for {title_period}</p>
            </div>, 
            <div class='row mh-90'>
                <ResponsiveContainer width={'100%'} height={'100%'}>
                    <PieChart>
                        <Pie
                        data={data}
                        color="#000000"
                        dataKey={`${use_metric}`}
                        nameKey="sys_type"
                        cx="50%"
                        cy="100%"
                        outerRadius={'200%'}
                        fill="#8884d8"
                        labelLine={false}
                        label={CustomizedLabelChart1}
                        startAngle={180}
                        endAngle={0}
                        //isAnimationActive={false}
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
            </div> 
        ]; 
        setChart1(element);
    }

    function generateChart2(data , METRICS, currMetric) {
        const use_metric = METRICS.filter(item => item.npp === currMetric).map(item => item.value)[0]
        if(use_metric === 'mau') {
            var dMin = Math.round((Math.min(...data.map(o => o.mau)) - Math.min(...data.map(o => o.mau))*0.02)/100)*100;
            var dMax = Math.round((Math.max(...data.map(o => o.mau)) + Math.min(...data.map(o => o.mau))*0.02)/100)*100;
        }
        else {
            var dMin = Math.round((Math.min(...data.map(o => o.dau)) - Math.min(...data.map(o => o.dau))*0.02)/100)*100;
            var dMax = Math.round((Math.max(...data.map(o => o.dau)) + Math.min(...data.map(o => o.dau))*0.02)/100)*100;
        }
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
                    <Line type="monotone" dataKey={`${use_metric}`} stroke="#4477aa" fill="#4477aa" strokeDasharray="10 5" strokeWidth={2} dot={{ r: 5 }} label={<CustomizedLabelChart2 />} />
                </LineChart>
            </ResponsiveContainer>
        ); 
        setChart2(element);
    }

    function generateChart3(data, METRICS, currMetric) {
        const use_metric = METRICS.filter(item => item.npp === currMetric).map(item => item.value)[0]
        const new_data = [...data.filter(item => item.type === use_metric)]
        const dMin = 0;
        const element = (
            <ResponsiveContainer width={'100%'} height={'100%'}>
                <BarChart
                    data={new_data}
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
    
    const metric_for_title = METRICS.filter(item => item.npp === currMetric).map(item => item.value)[0].toUpperCase()

    return (
        <div className="container-fluid h-100">
            <div class="row mh-40">
                <div class='col col-8 h-100'>
                    <div class="row mh-20">
                        <div class='col col-6'>
                            {filter1 ? filter1 : 'Smth wrong'}
                        </div>
                        <div class='col col-6 cobj'>
                            {rb1 ? rb1 : 'Smth wrong'}
                        </div>
                    </div>
                    <div class="row mh-80">
                        <div class='col h-100 cobj' >
                            { kpi1 ? kpi1 : 'Smth wrong' }
                        </div>
                        <div class='col h-100 cobj' >
                            { kpi2 ? kpi2 : 'Smth wrong' }
                        </div>
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