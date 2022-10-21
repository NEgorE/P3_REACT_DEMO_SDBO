import React, { PureComponent, useEffect, useState } from "react";
import { subscriberMetric1 , subscriberFilter1 } from '../../../MessageService.js';
import { Chart4 } from './chart4.js';
import { Chart3 } from './chart3.js';
import { Chart2 } from './chart2.js';
import { Chart1 } from './chart1.js';
import { METRICS } from '../../components/constants';

import { LineChart, BarChart, Line, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Brush, ResponsiveContainer, LabelList, PieChart, Pie, Cell, Label  } from 'recharts';


import "bootstrap/dist/css/bootstrap.min.css";
import "./mau_dau_crr.css";

export const Maudaucrr = (props) => {

    const f_render_metric = subscriberMetric1._value ? subscriberMetric1._value : 'metric1'

    const [rb1, setRB1] = useState(false)
    const [currMetric, setCurrMetric] = useState(f_render_metric)
    const [currFilter1, setCurrFilter1] = useState(false)
    const [filter1data, setFilter1data] = useState(false)
    const [filter1, setFilter1] = useState(false)
    const [kpi1, setKpi1] = useState(false)
    const [kpi2, setKpi2] = useState(false)
    const [chart2data, setchart2data] = useState(false)

    useEffect(() => {
        console.log('load data during first render');
        getFilter1Data();
        getChart2Data();
        genetareRB1(METRICS, f_render_metric);
        console.log(subscriberMetric1._value)
    }, [])

    useEffect(() => {
        if(filter1data){
            generateFilter1(filter1data);
        }
    }, [filter1data])

    useEffect(() => {
        if(chart2data){
            generateKpi1(chart2data, METRICS, currMetric);
            generateKpi2(chart2data, METRICS, currMetric);
        }
    }, [chart2data, currMetric])

    useEffect(() => {
        subscriberMetric1.next(currMetric)
        console.log(subscriberMetric1._value)
    }, [currMetric])

    useEffect(() => {
        subscriberFilter1.next(currFilter1)
        console.log(subscriberFilter1._value)
    }, [currFilter1])

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

    const onChangeMetric = e => {
        setCurrMetric(e.target.value);
    }

    const onChangeFilter1 = e => {
        const { value, checked } = e.target;
        setCurrFilter1(value);
    }

    function generateFilter1(data) {
        const element =(
            <div class="row align-items-center h-100 row-rb">
                <div class="btn-group obj rb" role="groupf1" aria-label="Basic radio toggle button group">
                    {data.map((el, key) =>(
                        [
                            <input type="checkbox" class="btn-check" name="btnf1radio" id={`btnf1check ${key}`} autoComplete="off" 
                                value={`${el.date_yq}`} onChange={onChangeFilter1}
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
                        <Chart1 />  
                    </div>
                </div>
            </div>
            <div class="row mh-60">
                <div class='col col-4 h-100 cobj' >
                    <div class='col obj h-100'>
                        <Chart2 />
                    </div>
                </div>
                <div class='col col-4 h-100 cobj'>
                    <div class='col obj h-100'>
                        <Chart3 />
                    </div>
                </div>
                <div class='col col-4 h-100 cobj' >
                    <div class='col obj h-100'>
                        <Chart4 />
                    </div>
                </div>
            </div>
        </div>  
    )
}