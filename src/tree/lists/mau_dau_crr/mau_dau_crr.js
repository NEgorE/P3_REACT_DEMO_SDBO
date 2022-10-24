import React, { useEffect, useState } from "react";
import { subscriberMetric1 , subscriberFilter1 } from '../../../MessageService.js';
import { Chart4 } from './chart4.js';
import { Chart3 } from './chart3.js';
import { Chart2 } from './chart2.js';
import { Chart1 } from './chart1.js';
import { Kpi2 } from './kpi2.js';
import { Kpi1 } from './kpi1.js';
import { RB1 } from './rb1.js';

import "bootstrap/dist/css/bootstrap.min.css";
import "./mau_dau_crr.css"

export const Maudaucrr = (props) => {

    const [currFilter1, setCurrFilter1] = useState(false)
    const [filter1data, setFilter1data] = useState(false)
    const [filter1, setFilter1] = useState(false)
    const [container, setContainer] = useState(false)

    useEffect(() => {
        console.log('load data during first render');
        getFilter1Data();
        console.log(subscriberMetric1._value);
        renderCharts();
    }, [])

    useEffect(() => {
        if(filter1data){
            generateFilter1(filter1data);
        }
    }, [filter1data])

    useEffect(() => {
        if(container){
            renderCharts();
        }
    }, [container])

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

    function renderCharts() {
        const element = (
            <div className="container-fluid h-100">
                <div class="row mh-40">
                    <div class='col col-8 h-100'>
                        <div class="row mh-20">
                            <div class='col col-6'>
                                {filter1 ? filter1 : 'Smth wrong'}
                            </div>
                            <div class='col col-6 cobj'>
                                <RB1 />
                            </div>
                        </div>
                        <div class="row mh-80">
                            <div class='col h-100 cobj' >
                                <Kpi1 />
                            </div>
                            <div class='col h-100 cobj' >
                                <Kpi2 />
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
        setContainer(element)
    }

    return (
        container ? container : 'Smth wrong'
    )
}