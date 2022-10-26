import React, { useEffect, useState } from "react";
import { subscriberMetric1 } from '../../../MessageService.js';
import { METRICS } from '../../components/constants';

import { Maudaucrr } from "./mau_dau_crr.js";

import "bootstrap/dist/css/bootstrap.min.css";
import "./mau_dau_crr.css";


export const RB1 = (props) => {

    const { renderCharts } = props

    const log_prefix = 'RB1: '

    const f_render_metric = subscriberMetric1._value ? subscriberMetric1._value : 'metric1'

    const [rb1, setRB1] = useState(false)
    const [currMetric, setCurrMetric] = useState(f_render_metric)

    useEffect(() => {
        console.log(log_prefix + 'load data during first render');
        genetareRB1(METRICS, f_render_metric);
    }, [])

    useEffect(() => {
        subscriberMetric1.next(currMetric)
        console.log(log_prefix + ' sub value ' + subscriberMetric1._value);
        renderCharts();
    }, [currMetric])

    const onChangeMetric = e => {
        setCurrMetric(e.target.value);
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

    return (
        rb1 ? rb1 : 'Smth wrong'
    )
}