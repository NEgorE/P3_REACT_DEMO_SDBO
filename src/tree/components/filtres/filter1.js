import React, { useEffect, useState } from "react";
import { subscriberFilter1 } from '../../../MessageService.js';
import { FilterLine } from "./filterLine.js";

export const Filter1 = (props) => {

    const { renderCharts } = props

    const log_prefix = 'Filter1: '

    const currFilter1 = subscriberFilter1._value

    const [filter1data, setFilter1data] = useState(false)
    const [filter1, setFilter1] = useState(false)

    useEffect(() => {
        console.log(log_prefix + 'load data during first render');
        getFilter1Data();
    }, [])

    useEffect(() => {
        if(filter1data){
            generateFilter1(filter1data);
        }
    }, [filter1data])

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
        const curr_subs_value = subscriberFilter1._value
        if (checked) {
            const curr_subs_value_new = [...curr_subs_value]
            curr_subs_value_new.push(value)
            subscriberFilter1.next(curr_subs_value_new)
        }
        if (!checked) {
            const curr_subs_value_new = curr_subs_value.filter(item => item != value)
            subscriberFilter1.next(curr_subs_value_new)
        }
        renderCharts();
    }

    function generateFilter1(data) {
        const element =(
            <div class="row align-items-center h-100 row-rb">
                <div class="btn-group obj rb" role="groupf1" aria-label="Basic radio toggle button group">
                    {data.map((el, key) =>(
                        [
                            currFilter1.indexOf(el.date_yq) >= 0 ? 
                            <input type="checkbox" class="btn-check" name="btnf1radio" id={`btnf1check ${key}`} autoComplete="off" 
                                value={`${el.date_yq}`} onChange={onChangeFilter1} defaultChecked={true}
                            />
                            :
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

    return (
        filter1 ? filter1 : 'Smth wrong'
    )
}