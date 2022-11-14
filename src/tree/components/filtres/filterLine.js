import React, {useEffect, useState} from "react";
import { subscriberFilter1 } from '../../../MessageService.js';

import "bootstrap/dist/css/bootstrap.min.css";
import "./filterLine.css";


export const FilterLine = () => {

    const log_prefix = 'FILTER_LINE: ';

    const [isClear, setIsClear] = useState(0)
    const [currFilter1, setCurrFilter1] = useState([])

    const [buttonClear, setButtonClear] = useState(0)
    const [buttonFilter1, setButtonFilter1] = useState([])

    useEffect(() => {
        subscriberFilter1.subscribe((vl) => {
            const currFilterCount = currFilter1.length;
            const newFilterCount = subscriberFilter1._value.length; 
            if (currFilterCount === newFilterCount) {
                console.log(log_prefix + ' currFilterCount =  newFilterCount, vl =' + vl)
            }
            if (currFilterCount < newFilterCount) {
                console.log(log_prefix + ' currFilterCount <  newFilterCount vl =' + vl)
                setCurrFilter1(vl)
            }
            if (currFilterCount > newFilterCount) {
                console.log(log_prefix + ' currFilterCount >  newFilterCount vl =' + vl)
                setCurrFilter1(vl)
            }
        })

        renderCrear(isClear);
    }, [])

    useEffect(() => {
        renderCrear(isClear);
    }, [isClear])

    useEffect(() => {
        renderButtonFilter1(currFilter1);
    }, [currFilter1])

    function renderButtonFilter1(data) {
        
    }

    function renderCrear(isClearNumber) {
        if (isClearNumber != 0){
            setButtonClear(
                <li className="nav-item nav-item-filter">
                    <button className="nav-link nav-link-filter-clear" onClick={() => {}} >Clear</button >
                </li>
            )
        }
        else {
            setButtonClear(
                <li className="nav-item nav-item-filter">
                    <div className="nav-link nav-link-no-filters"> No one filter selected </div >
                </li>
            )
        }
        console.log(currFilter1);
        console.log(currFilter1.length);
    }

    return (
        <ul className="nav nav-filters">
            {buttonClear ? buttonClear : false}
            {buttonClear ? buttonClear : false}
        </ul>
    )
}